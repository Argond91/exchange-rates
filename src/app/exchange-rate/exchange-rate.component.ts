import { Component, OnInit } from '@angular/core';
import { ExternalService } from '../services/external-service.service';
import { ExchangeRates } from '../exchangeRates';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {
  exchangeRates: ExchangeRates = {
    base: '',
    date: '',
    rates: new Map<string,number>()
  };
  availableBaseCurrencies: string[] = ["EUR", "USD", "GBP", "AUD", "CAD", "JPY"];
  baseCurrency: string = this.availableBaseCurrencies[0];
  exchangeDate: string = "2019-02-16";
  yesterdayTimeStamp: number = new Date().setDate(new Date().getDate()-1);
  yesterdayString: string = new Date(this.yesterdayTimeStamp).toISOString().split('T')[0];

  constructor(private externalService: ExternalService) { }

  ngOnInit() {
    this.getExchangeRates();
  }

  getExchangeRates(): void {
    this.externalService.getExchangeRates(this.baseCurrency)
    .subscribe(exchangeRates => {
      delete exchangeRates.rates[this.baseCurrency];
      return this.exchangeRates = exchangeRates
    });
  }

}
