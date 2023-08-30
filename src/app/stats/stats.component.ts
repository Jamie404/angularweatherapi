import { Component } from '@angular/core';
import { Stat } from '../models/stats';
import { StatsService } from '../services/stats.service';
import { StatsAvg } from '../models/statsaverage';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent {
  stats: Stat[] = [];
  statsAvg: StatsAvg[] = [];

  avgAirTemp: any;
  avgRoadTemp: any;
  avgWindSpeed: any;

  maxAirTemp: any;
  minAirTemp: any;
  maxRoadTemp: any;
  minRoadTemp: any;
  maxWindSpeed: any;
  minWindSpeed: any;
  minAirSite: any;
  maxAirSite: any;
  maxWindSite: any;

  constructor(service: StatsService) {
    service.getWeatherData().subscribe((response) => {
      this.stats = response;

      this.maxAirTemp = this.stats.reduce((acc, cur) => {
        return cur.air_temperature > acc ? cur.air_temperature : acc;
      }, 0);

      this.minAirTemp = this.stats.reduce((acc, cur) => {
        return cur.air_temperature < acc ? cur.air_temperature : acc;
      }, 0);

      this.maxRoadTemp = this.stats.reduce((acc, cur) => {
        return cur.road_surface_temperature > acc
          ? cur.road_surface_temperature
          : acc;
      }, 0);

      this.minRoadTemp = this.stats.reduce((acc, cur) => {
        return cur.road_surface_temperature < acc
          ? cur.road_surface_temperature
          : acc;
      }, 0);

      this.maxWindSpeed = this.stats.reduce((acc, cur) => {
        return cur.wind_speed > acc ? cur.wind_speed : acc;
      }, 0);

      this.minWindSpeed = this.stats.reduce((acc, cur) => {
        return cur.wind_speed < acc ? cur.wind_speed : acc;
      }, 0);

      this.minAirSite = this.stats
        .filter((site) => site.air_temperature === this.minAirTemp)
        .map((site) => site.site_name);

      const maxAir = this.stats
        .filter((site) => site.air_temperature === this.maxAirTemp)
        .map((site) => site.site_name);
      this.maxAirSite = maxAir[0];

      const maxWind = this.stats
        .filter((site) => site.wind_speed === this.maxWindSpeed)
        .map((site) => site.site_name);
      this.maxWindSite = maxWind[0];
    });

    service.getAverageData().subscribe((response2) => {
      this.statsAvg = response2;
      this.avgAirTemp = Number(response2[0].airAverage).toFixed(1);
      this.avgRoadTemp = Number(response2[0].roadAverage).toFixed(1);
      this.avgWindSpeed = Number(response2[0].windAverage).toFixed(1);
    });
  }
}
