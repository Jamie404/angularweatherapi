import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stat } from '../models/stats';
import { StatsAvg } from '../models/statsaverage';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  url = 'http://localhost:3000/weatherdata';
  url2 = 'http://localhost:3000/weatherdataaverage';

  constructor(private httpClient: HttpClient) {}

  getWeatherData() {
    return this.httpClient.get<Stat[]>(this.url);
  }
  getAverageData() {
    return this.httpClient.get<StatsAvg[]>(this.url2);
  }
}
