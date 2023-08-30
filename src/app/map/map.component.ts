import { Component } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../services/marker.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  private map: any;

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

  constructor(private markerService: MarkerService) {}

  ngOnInit(): void {
    this.initMap();
    this.markerService.makeMarkers(this.map);
  }

  ngOnDestroy(): void {
    const mapContainer = this.map.getContainer();
    mapContainer.parentNode?.removeChild(mapContainer);
    this.map.off();
    this.map.remove();
  }
}
