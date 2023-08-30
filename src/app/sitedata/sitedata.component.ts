import { Component } from '@angular/core';
import { SiteData } from '../models/sitedata';
import { SiteNames } from '../models/sitenames';
import { SitedataService } from '../services/sitedata.service';
import { HttpClient } from '@angular/common/http';
import { MinMax } from '../models/minMax';

@Component({
  selector: 'app-sitedata',
  templateUrl: './sitedata.component.html',
  styleUrls: ['./sitedata.component.css'],
})
export class SitedataComponent {
  sites: SiteData[] = [];
  siteNames: SiteNames[] = [];
  minMax: MinMax[] = [];
  searchTerm: string = '';
  minAir: number = 0;
  maxAir: any = '';
  minWind: any = '';
  maxWind: any = '';
  tMaxAir: number = 0;
  tMaxWind: number = 0;
  radio: any = 1;

  constructor(service: SitedataService, private httpClient: HttpClient) {
    service.getWeatherDataSites().subscribe((response) => {
      this.siteNames = response;
    });

    service.getWeatherData().subscribe((response2) => {
      this.sites = response2;
    });
  }

  getminMax() {
    return this.httpClient
      .get<MinMax[]>(
        `http://localhost:3000/weatherdataminmax/` + this.searchTerm
      )
      .subscribe((res) => {
        this.minMax = res;
        this.minAir = this.minMax[0].minAir;
        this.maxAir = this.minMax[0].maxAir;
        this.minWind = this.minMax[0].minWind;
        this.maxWind = this.minMax[0].maxWind;
      });
  }

  sortByAirAsc() {
    return this.sites.sort((a, b) => a.air_temperature - b.air_temperature);
  }
  sortByAirDesc() {
    return this.sites.sort((a, b) => b.air_temperature - a.air_temperature);
  }
  sortByRoadAsc() {
    return this.sites.sort(
      (a, b) => a.road_surface_temperature - b.road_surface_temperature
    );
  }
  sortByRoadDesc() {
    return this.sites.sort(
      (a, b) => b.road_surface_temperature - a.road_surface_temperature
    );
  }
  sortByWindAsc() {
    return this.sites.sort((a, b) => a.wind_speed - b.wind_speed);
  }
  sortByWindDesc() {
    return this.sites.sort((a, b) => b.wind_speed - a.wind_speed);
  }

  filterStations() {
    return this.sites.filter((sites) =>
      sites.site_name.includes(this.searchTerm)
    );
  }

  filterTable() {
    if (this.radio != 1) {
      return this.filterStations().filter(
        (site) => site.wind_speed <= this.tMaxWind
      );
    } else {
      return this.filterStations().filter(
        (site) => site.air_temperature <= this.tMaxAir
      );
    }
  }

  changeMax(e: any) {
    if (this.radio != 2) {
      this.tMaxAir = e.target.value;
      this.filterTable();
      this.radio = 1;
    } else {
      this.tMaxWind = e.target.value;
      this.filterTable();
    }
  }

  getSelectedValue(event: any) {
    if (this.radio != 2) {
      this.searchTerm = event.target.value;
      this.getminMax();
      this.tMaxAir = this.maxAir;
    } else {
      this.searchTerm = event.target.value;
      this.getminMax();
      this.tMaxWind = this.maxWind;
    }
  }

  radioCheck(event2: any) {
    this.radio = event2.target.value;
  }
}
