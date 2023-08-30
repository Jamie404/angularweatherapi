import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chosen } from '../models/chosen';
import { StatsAvg } from '../models/statsaverage';

@Injectable({
  providedIn: 'root',
})
export class ChosenService {
  url = 'http://localhost:3000/chosen';
  url2 = 'http://localhost:3000/weatherdataaverage';

  constructor(private httpClient: HttpClient) {}

  getWeatherData(path: string) {
    return this.httpClient.get<Chosen[]>(this.url + path);
  }

  getChosenAverage(path: string) {
    return this.httpClient.get<StatsAvg[]>(this.url2 + path);
  }
}
