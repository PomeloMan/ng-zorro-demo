import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { IGNORE_RULE } from './_ignore';
import { MainService } from '../pages/main/main.service';

/**
 * Pass untouched request through to the next request handler.
 */
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(
    private service: MainService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {// Observable<HttpEvent<any>>
    const result = IGNORE_RULE.all.filter(ignore => req.url.endsWith(ignore));
    if (result.length > 0) {
      return next.handle(req);
    }

    const _this = this;
    return next.handle(req).pipe(
      // same as config/provider/api.service.ts - handleError()
      // tap((event: any) => {
      //   // do nothing
      // }, error => {
      //   // handle error here or see config/provider/api.service.ts - handleError()
      // }),
      mergeMap((event: any) => {
        if (event instanceof HttpResponse) {
          if (event.status === 200) {
            // http & backend success handler
            return Observable.create(observer => observer.next(event));
          } else {
            // http & backend error handler
            _this.service.createNotification('error', event.statusText, event.body);
            return throwError(event); // {@link src/app/config/api.service.ts handleError()}
          }
        }
        return Observable.create(observer => observer.next(event));
      })
    );
  }
}
