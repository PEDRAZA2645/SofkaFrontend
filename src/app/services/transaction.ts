import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseUrl = `${environment.apiUrl}/transactions`;

  constructor(private http: HttpClient) {}

  getAll(page = 1, size = 10) {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<any>(`${this.baseUrl}/getAll`, { params });
  }

  create(amount: number) {
    return this.http.post(`${this.baseUrl}/addNew`, { amount });
  }

  update(id: number, amount: number) {
    return this.http.put(`${this.baseUrl}/updateData/${id}`, { amount });
  }
}
