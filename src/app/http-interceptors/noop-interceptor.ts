import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * Pass untouched request through to the next request handler.
 */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

	constructor(
		private router: Router
	) { }

	/**
	 * 数据转换
	 * @param param 
	 * @param key 
	 * @param encode 
	 */
	parse(param, key?, encode?) {
		if (param == null) return '';
		var paramStr = '';
		var t = typeof (param);
		if (t == 'string' || t == 'number' || t == 'boolean') {
			paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
		} else {
			for (var i in param) {
				var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
				paramStr += this.parse(param[i], k, encode);
			}
		}
		return paramStr;
	};

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.url.includes('assets')) {
			return next.handle(req);
		}
		let _this = this;
		return next.handle(req)
			.pipe(
				mergeMap((event: any) => {
					if (event instanceof HttpResponse) {
						if (event.body.code == 2333) {
							window.location.href = event.body.data.redirectToUrl;
							return;
						}
						if (event.status == 200 && event.body.code == 401) {
							return this.router.navigate(['/login']);
						} else if (event.status == 200 && event.body.msg && event.body.msg != 'success') {
							return throwError(event);
						} else if (event.status == 200 || event.body.msg == 'success') {
							// http & backend success handler
							return Observable.create(observer => observer.next(event));
						} else {
							// http & backend error handler
							return throwError(event);
						}
					}
					return Observable.create(observer => observer.next(event));
				})
			)
	}
}