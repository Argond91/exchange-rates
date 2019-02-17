import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeRateComponent } from './exchange-rate.component';
import { ExternalService } from '../services/external-service.service';
import { of } from 'rxjs';
import { ExchangeRates } from '../exchangeRates';
import { FormsModule } from '@angular/forms';

describe('ExchangeRateComponent', () => {
  let component: ExchangeRateComponent;
  let fixture: ComponentFixture<ExchangeRateComponent>;
  let getExchangeRatesSpy;

  beforeEach(async(() => {
    const externalService = jasmine.createSpyObj('ExternalService', ['getExchangeRates']);
    getExchangeRatesSpy = externalService.getExchangeRates.and.callFake((baseCurrency) => {
      const returnValue = {
        base: baseCurrency,
        date: '2019-02-15',
        rates: {
          AUD: 1.5836,
          USD: 1.126
        }
      };
      return of(returnValue);
    });

    TestBed.configureTestingModule({
      declarations: [ExchangeRateComponent],
      imports: [FormsModule],
      providers: [{ provide: ExternalService, useValue: externalService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(component.availableBaseCurrencies).toEqual(['EUR', 'USD', 'GBP', 'AUD', 'CAD', 'JPY']);
    expect(component.baseCurrency).toEqual('EUR');
    expect(getExchangeRatesSpy.calls.count()).toEqual(1);
  });

  it('should get changed base exchange rate', () => {
    expect(component.exchangeRates.base).toEqual('EUR');
    expect(getExchangeRatesSpy.calls.count()).toEqual(1);

    component.baseCurrency = 'USD';
    component.getExchangeRates();
    expect(component.exchangeRates.base).toEqual('USD');
    expect(getExchangeRatesSpy.calls.count()).toEqual(2);
  });
});
