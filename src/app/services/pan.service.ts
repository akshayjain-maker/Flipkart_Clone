import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanService {
  private url = 'http://localhost:5000/api/pan';

  constructor(private http: HttpClient) {}

  getPan(): Observable<any> {
    return this.http.get(`${this.url}/me`);
  }

  savePan(payload: any): Observable<any> {
    return this.http.post(`${this.url}/save`, payload);
  }
}
