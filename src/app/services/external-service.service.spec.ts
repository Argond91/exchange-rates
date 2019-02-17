import { TestBed, inject } from '@angular/core/testing';
import { ExternalService } from './external-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http'

describe('ExternalServiceService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExternalService] });
  });

  it('should be created', inject([ExternalService], (externalService: ExternalService) => {
    expect(externalService).toBeTruthy();
   }));

  it('should get exchangeRates', inject([HttpTestingController, ExternalService], (httpMock: HttpTestingController, externalService: ExternalService) => {
        const mockExchangeRate = {
          base: "EUR",
          date: "2019-02-15",
          rates: new Map([
            ["AUD", 1.5836],
            ["USD", 1.126]
          ])
        }
        externalService.getExchangeRates("EUR").subscribe(response => {
          expect(response).toEqual(mockExchangeRate);
        })
        const mockReq = httpMock.expectOne('https://api.exchangeratesapi.io/latest?base=EUR');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.method).toEqual("GET");
        mockReq.flush(mockExchangeRate);
      }
    )
  );

  it('should get 404 error', inject([HttpTestingController, ExternalService], (httpMock: HttpTestingController, externalService: ExternalService) => {

    externalService.getExchangeRates("EUR").subscribe(response => 
      fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.statusText).toEqual("Not found");
    })
    const mockReq = httpMock.expectOne('https://api.exchangeratesapi.io/latest?base=EUR');

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.method).toEqual("GET");
    mockReq.flush("error", {status: 404, statusText: "Not found"});
  }
)
);

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

});
