import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    rates: []
  };
  availableBaseCurrencies: string[] = ["EUR", "USD", "GBP", "AUD", "CAD", "JPY"];
  baseCurrency: string = this.availableBaseCurrencies[0];
  exchangeDate: string = "2019-02-16";
  yesterdayTimeStamp: number = new Date().setDate(new Date().getDate()-1);
  yesterdayString: string = new Date(this.yesterdayTimeStamp).toISOString().split('T')[0];
  sortAscending: boolean = true;

  constructor(private externalService: ExternalService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getExchangeRates();
  }

  getExchangeRates(): void {
    this.externalService.getExchangeRates(this.baseCurrency)
    .subscribe(exchangeRatesResponse => {
      delete exchangeRatesResponse.rates[this.baseCurrency];
      let exchangeRate: ExchangeRates = {
        base: exchangeRatesResponse.base,
        date: exchangeRatesResponse.date,
        rates: Object.entries(exchangeRatesResponse.rates)
      }
      this.exchangeRates = exchangeRate;
      this.sortTable(true);
    });
  }

  sortTable(newExchangeRates: boolean) {
    if(newExchangeRates || this.sortAscending){
      this.exchangeRates.rates.sort();
    }
    else {
      this.exchangeRates.rates.sort().reverse();
    }
    if(newExchangeRates){
      this.sortAscending = false;
    }
    else{
      this.sortAscending = !this.sortAscending;
    }
  }

}
