import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SiteData } from '../models/sitedata';
import { SiteNames } from '../models/sitenames';

@Injectable({
  providedIn: 'root',
})
export class SitedataService {
  url = 'http://localhost:3000/weatherdata';
  url2 = `http://localhost:3000/weatherdatasites`;

  constructor(private httpClient: HttpClient) {}

  getWeatherData() {
    return this.httpClient.get<SiteData[]>(this.url);
  }
  getWeatherDataSites() {
    return this.httpClient.get<SiteNames[]>(this.url2);
  }
}
