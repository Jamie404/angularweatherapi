import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  markers = 'http://localhost:3000/sites';

  constructor(private httpClient: HttpClient) {}

  makeMarkers(map: L.Map): void {
    this.httpClient.get(this.markers).subscribe((res: any) => {
      for (const c of res) {
        const lon = c.lng;
        const lat = c.lat;
        const marker = L.marker([lat, lon]);
        marker.addTo(map);
        marker.bindPopup(`<b>${c.site_name}</b> <br> [${c.lat},${c.lng}]`);
      }
    });
  }
}
