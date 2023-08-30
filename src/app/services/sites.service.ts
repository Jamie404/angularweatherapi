import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Site } from '../models/site';

@Injectable({
  providedIn: 'root',
})
export class SitesService {
  url = 'http://localhost:3000/sites';

  constructor(private httpClient: HttpClient) {}

  getSites() {
    return this.httpClient.get<Site[]>(this.url);
  }
}
