import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { nextTick } from 'process';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor {

  /**
   *
   */
  refreshingAccessToken: boolean;

  accessTokenRefresh: Subject<any> = new Subject();
  constructor(private authService: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // handle all request

    req = this.addAuthHeader(req);

    return next.handle(req)
      .pipe(catchError((error: HttpErrorResponse) => {
        console.error(error);
        if (error.status === 401) {
          // 401 error so we are unauthorized
          // refresh the access token
          return this.refreshAccessToken().pipe(
            switchMap(() => {
              req = this.addAuthHeader(req);
              return next.handle(req);
            }), catchError((err) => {
              console.log(err);
              this.authService.logout();
              // tslint:disable-next-line: deprecation
              return empty();
            })
          );
        }
        return throwError(error);
      }));
  }

  private addAuthHeader(req: HttpRequest<any>) {
    // get the access token
    const token = this.authService.getAccessToken();
    // append the access token to the request header

    if (token) {
      return req.clone({
        setHeaders: {
          'x-access-token': token
        }
      });
    }
    return req;
  }

  private refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable(observer => {
        this.accessTokenRefresh.subscribe(() => {
          // this code will run when the access token has been refresh
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshingAccessToken = true;
      // we call methos to auth to refresh the access token
      return this.authService.getNewAccessToken().pipe(
        tap(() => {
          console.log('Access Token regresh');
          this.refreshingAccessToken = false;
          this.accessTokenRefresh.next();
        })
      );
    }
  }
}
