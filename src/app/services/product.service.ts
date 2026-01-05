import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = `${environment.apiUrl}/api/admin/products`; // backend route

  constructor(private http: HttpClient) {}

  /** ✅ GET products with pagination */
getProducts(params: any) {
  return this.http.get(`${this.baseUrl}`, { params });
}


  /** ✅ CREATE product with multiple images */
  createProduct(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }

  /** ✅ UPDATE product by ID with multiple images */
  updateProduct(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, formData);
  }

  /** ✅ DELETE product by ID */
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteProductImage(productId: number, imageId: number): Observable<any> {
  return this.http.delete(
    `${this.baseUrl}/${productId}/images/${imageId}`
  );
}
}
