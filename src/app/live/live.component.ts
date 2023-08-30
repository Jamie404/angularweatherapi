import { Component, OnInit } from '@angular/core';
import { Live, WeatherFeatures } from '../models/live';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css'],
})
export class LiveComponent implements OnInit {
  liveStations: Live[] = [];
  searchTerm: string = '';

  constructor(private httpClient: HttpClient) {}

  getLiveData() {
    this.httpClient
      .get<WeatherFeatures>(
        'https://tiitrafficdata.azurewebsites.net/api/Weather'
      )
      .subscribe((res) => {
        this.liveStations = res.features;

        this.liveStations = this.liveStations.sort((a, b) =>
          a.properties.site_name.localeCompare(b.properties.site_name)
        );
      });
  }

  filterStations() {
    return this.liveStations.filter((liveStations) =>
      liveStations.properties.site_name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

  windBearing(degrees: number) {
    if (degrees >= 337.5 || degrees < 22.5) {
      return '↑'; // North
    } else if (degrees >= 22.5 && degrees < 67.5) {
      return '↗'; // North East
    } else if (degrees >= 67.5 && degrees < 112.5) {
      return '→'; // East
    } else if (degrees >= 112.5 && degrees < 157.5) {
      return '↘'; // South East
    } else if (degrees >= 157.5 && degrees < 202.5) {
      return '↓'; // South
    } else if (degrees >= 202.5 && degrees < 247.5) {
      return '↙'; // South West
    } else if (degrees >= 247.5 && degrees < 292.5) {
      return '←'; // West
    } else {
      return '↖'; // North West
    }
  }

  ngOnInit() {
    this.getLiveData();
  }
}
