import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExchangeRatesResponse } from '../exchangeRates';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  private baseUrl = 'https://api.exchangeratesapi.io/';

  constructor(private http: HttpClient ) { }

  getExchangeRates(baseCurrency: string, date: string): Observable<ExchangeRatesResponse> {
    let url: string = `${this.baseUrl}${date}?base=${baseCurrency}`;
    return this.http.get<ExchangeRatesResponse>(url);
  }
}
