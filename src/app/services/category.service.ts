// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:5000/api/admin/categories';

  constructor(private http: HttpClient) {}

  getCategories(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}&limit=${limit}`);
  }

    createCategory(formData: FormData) {
    return this.http.post(this.baseUrl, formData);
  }

  updateCategory(id: number, formData: FormData) {
    return this.http.put(`${this.baseUrl}/${id}`, formData);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
