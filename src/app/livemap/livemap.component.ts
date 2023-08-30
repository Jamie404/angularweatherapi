import { Component } from '@angular/core';
import * as L from 'leaflet';
import { Live, WeatherFeatures } from '../models/live';
import { HttpClient } from '@angular/common/http';
import { Site } from '../models/site';

@Component({
  selector: 'livemap',
  templateUrl: './livemap.component.html',
  styleUrls: ['./livemap.component.css'],
})
export class LivemapComponent {
  private map: any;
  liveStations: Live[] = [];
  local: Site[] = [];
  marker: any;
  combinedData: any;

  initMap(): void {
    this.map = L.map('map', {
      center: [53.49592253769749, -8.204975925034635],
      zoom: 7,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 6,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(this.map);
  }

  constructor(private httpClient: HttpClient) {}

  getLiveData() {
    this.httpClient
      .get<WeatherFeatures>(
        'https://tiitrafficdata.azurewebsites.net/api/Weather'
      )
      .subscribe((res) => {
        this.liveStations = res.features;
        this.filterStations();
      });
  }

  getSiteData() {
    this.httpClient
      .get<Site[]>('http://localhost:3000/sites')
      .subscribe((res) => {
        this.local = res;
      });
  }

  filterStations() {
    this.combinedData = this.local.map((site) => {
      const liveStation = this.liveStations.find(
        (station) => station.properties.site_name === site.site_name
      );
      if (liveStation) {
        return { ...site, ...liveStation.properties };
      }
      return site;
    });
    this.makeMarkers(this.map);
  }

  makeMarkers(map: L.Map): void {
    for (let i = 0; i < this.local.length - 1; i++) {
      let blueIcon = new L.Icon({
        iconUrl: 'assets/' + this.combinedData[i].weather_definition + '.png',
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
      });

      L.Marker.prototype.options.icon = blueIcon;

      let lat = this.local[i].lat;
      let lon = this.local[i].lng;
      this.marker = L.marker([lat, lon]);
      this.marker.addTo(this.map);
      this.marker.bindPopup(
        `<b>${this.local[i].site_name}</b><br>${
          this.combinedData[i].weather_definition
        } <br> ${Math.round(this.combinedData[i].air_temperature * 100) / 100}°C
        <br> ${Math.round(this.combinedData[i].wind_speed * 100) / 100}km/h<br>
        <a href="${this.combinedData[i].camera_image}"
        ><img
          src="assets/cam.png"
          style="width: 25px"
      /></a>`
      );
    }
  }

  ngOnInit(): void {
    this.getLiveData();
    this.getSiteData();
    this.initMap();
  }
  ngOnDestroy(): void {
    const mapContainer = this.map.getContainer();
    mapContainer.parentNode?.removeChild(mapContainer);
    this.map.off();
    this.map.remove();
  }
}
