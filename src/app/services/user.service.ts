import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(`${this.baseUrl}/profile`);
  }
}
