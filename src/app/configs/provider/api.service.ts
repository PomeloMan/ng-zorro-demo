import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base: any = environment.url;
  retry = environment.retry;

  defaultOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true // SessionID 保持一致
  }

  constructor(
    private http: HttpClient
    // private native: NativeService
  ) { }

  get(url: string, options?: any): Observable<any> {
    if (isNullOrUndefined(options)) {
      options = this.defaultOptions;
    } else {
      options.withCredentials = true;
    }
    return this.http.get(this.base + url, options)
      .pipe(
        retry(this.retry), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
        // {@link noop-interceptor.ts}
        // mergeMap(res => {
        //   _this.native.openSnackBar(res.body.msg, 'ok');
        //   return Observable.create(observer => observer.next(event));
        // })
      );
  }

  post(url: string, body: any, options?: any): Observable<any> {
    if (isNullOrUndefined(options)) {
      options = this.defaultOptions;
    } else {
      options.withCredentials = true;
    }
    return this.http.post(this.base + url, body, options)
      .pipe(
        retry(this.retry), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
        // {@link noop-interceptor.ts}
        // mergeMap(res => {
        //   _this.native.openSnackBar(res.body.msg, 'ok');
        //   return Observable.create(observer => observer.next(event));
        // })
      );
  }

  put(url: string, body: any, options?: any): Observable<any> {
    if (isNullOrUndefined(options)) {
      options = this.defaultOptions;
    } else {
      options.withCredentials = true;
    }
    return this.http.put(this.base + url, body, options)
      .pipe(
        retry(this.retry), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  delete(url: string, body: any, options?: any): Observable<any> {
    if (isNullOrUndefined(options)) {
      options = this.defaultOptions;
      options.body = body;
    } else {
      options.withCredentials = true;
    }
    return this.http.delete(this.base + url, options)
      .pipe(
        retry(this.retry), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (error instanceof HttpResponse) {
        console.error(
          `Backend returned code ${error.body.code}, ` +
          `body was: ${JSON.stringify(error.body)}`);
        return throwError(`${error.body.code}: ${error.body.msg}`);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`);
      }
    }

    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
