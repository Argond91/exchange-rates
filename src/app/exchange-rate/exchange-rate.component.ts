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
  selectedBaseCurrency: string = this.availableBaseCurrencies[0];

  constructor(private externalService: ExternalService) { }

  ngOnInit() {
    this.getExchangeRates();
  }

  getExchangeRates(): void {
    this.externalService.getExchangeRates(this.selectedBaseCurrency)
    .subscribe(exchangeRates => this.exchangeRates = exchangeRates);
  }

  selectBaseCurrency(baseCurrency: string){
    this.selectedBaseCurrency = baseCurrency;
  }

}
