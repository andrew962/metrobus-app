import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BalanceResponce } from 'src/models/balance.model';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(
    private http: HttpClient
  ) { }

  getBalance(cardID: number) {
    return this.http.get<BalanceResponce>(`https://metrobusapp.herokuapp.com/api/v2/search/${cardID}`);
  }
}
