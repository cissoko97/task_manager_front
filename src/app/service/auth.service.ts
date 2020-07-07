import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { HttpResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webRequest: WebRequestService, private router: Router, private http: HttpClient) {
  }

  signup(payload: object) {
    return this.webRequest
      .signUp(payload).pipe(
        tap((res: HttpResponse<any>) => {
          // the auth tokens will be in the header of this response
          this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
          console.log('Sign UP');
          this.router.navigate(['/task', 'lists']);
        }, (err) => {
          console.log(err);
        })
      );
  }

  login(payload: object) {
    return this.webRequest
      .login(payload).pipe(shareReplay(),
        tap((res: HttpResponse<any>) => {
          // the auth tokens will be in the header of this response
          this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
          console.log('Login In');
          this.router.navigate(['/task', 'lists']);
        }, (err) => {
          console.log(err);
        }));
  }

  getNewAccessToken() {
    return this.http.get(`${this.webRequest.ROOT_URL}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        _id: this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token'));
      })
    );
  }

  logout() {
    this.removeSession();
    this.router.navigate(['/auth/login']);
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  setRefreshToken(refreshToken: string) {
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  setuserId(userId: string) {
    localStorage.setItem('user-id', userId);
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }


  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }
}
