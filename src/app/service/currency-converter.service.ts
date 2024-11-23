import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {
  private baseUrl = 'https://mindicador.cl/api/dolar';
  constructor(
    private httpClient: HttpClient
  ) {}

  getData(): Observable<Object> {
    return this.httpClient.get(`${this.baseUrl}`,);
  }
}
