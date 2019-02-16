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
    rates: new Map<String,Number>()
  };

  constructor(private externalService: ExternalService) { }

  ngOnInit() {
    this.subscribe();
  }

  subscribe(){
    this.externalService.getExchangeRates()
    .subscribe(exchangeRates => this.exchangeRates = exchangeRates);
  }

}
