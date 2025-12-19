// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:5000/api/categories';

  constructor(private http: HttpClient) {}

  getCategories(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}&limit=${limit}`);
  }
}
