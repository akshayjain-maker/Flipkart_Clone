import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';

  private authStatus$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}


  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data).pipe(
      tap((res) => {
        if (res?.token) {
          this.saveToken(res.token);
          this.authStatus$.next(true);   
        }
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.authStatus$.next(false); 
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatus$.asObservable();
  }
}
