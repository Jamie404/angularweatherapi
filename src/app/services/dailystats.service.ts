import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wind } from '../models/windSpeeds';

@Injectable({
  providedIn: 'root',
})
export class DailystatsService {
  constructor(private http: HttpClient) {}

  url = ``;

  getWindSpeed() {
    return this.http.get<Wind[]>(this.url);
  }
}
