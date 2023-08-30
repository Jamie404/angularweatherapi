import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Today } from '../models/today';

@Injectable({
  providedIn: 'root',
})
export class TodayService {
  url = `http://localhost:3000/today/`;

  constructor(private httpClient: HttpClient) {}

  getToday(date: any) {
    return this.httpClient.get<Today[]>(this.url + date);
  }
}
