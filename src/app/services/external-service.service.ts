import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExchangeRates } from '../exchangeRates';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  private baseUrl = 'https://api.exchangeratesapi.io/latest';

  constructor(private http: HttpClient ) { }

  getExchangeRates(baseCurrency: string): Observable<ExchangeRates> {
    let url: string = this.baseUrl + "?base=" + baseCurrency;
    return this.http.get<ExchangeRates>(url);
  }
}
