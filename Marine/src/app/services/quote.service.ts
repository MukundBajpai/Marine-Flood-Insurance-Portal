import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = 'https://your-backend-url/api/quotes'; // Adjust with your actual backend URL

  constructor(private http: HttpClient) {}

  calculatePremium(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/calculate-premium`, data);
  }

  submitQuote(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit-quote`, data);
  }

  bindQuote(quoteId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/bind-quote`, { quoteId });
  }
}
