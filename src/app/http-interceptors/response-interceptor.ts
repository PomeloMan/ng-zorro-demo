import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IGNORE_RULE } from './_ignore';

/**
 * Pass untouched request through to the next request handler.
 */
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

	constructor() { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {// Observable<HttpEvent<any>>
		let result = IGNORE_RULE.all.filter(ignore => req.url.endsWith(ignore));
		if (result.length > 0) {
			return next.handle(req);
		}

		let _this = this;
		return next.handle(req).pipe(
			mergeMap((event: any) => {
				if (event instanceof HttpResponse) {
					if (event.status == 200) {
						// http & backend success handler
						return Observable.create(observer => observer.next(event));
					} else {
						// http & backend error handler
						return throwError(event);// {@link src/app/config/api.service.ts handleError()}
					}
				}
				return Observable.create(observer => observer.next(event));
			})
		);
	}
}