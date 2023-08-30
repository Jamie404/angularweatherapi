import { Component } from '@angular/core';
import { SitesService } from '../services/sites.service';
import { Site } from '../models/site';

@Component({
  selector: 'sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css'],
})
export class SitesComponent {
  sites: Site[] = [];

  constructor(service: SitesService) {
    service.getSites().subscribe((response) => {
      this.sites = response;
    });
  }
}
