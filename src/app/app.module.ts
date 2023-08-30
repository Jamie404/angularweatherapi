import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RoutesComponent } from './routes/routes.component';
import { SitesComponent } from './sites/sites.component';
import { SitesService } from './services/sites.service';
import { MapComponent } from './map/map.component';
import { MarkerService } from './services/marker.service';
import { LiveComponent } from './live/live.component';
import { StatsComponent } from './stats/stats.component';
import { StatsService } from './services/stats.service';
import { TodayComponent } from './today/today.component';
import { LivemapComponent } from './livemap/livemap.component';
import { SitedataComponent } from './sitedata/sitedata.component';
import { TodayService } from './services/today.service';
import { LivemapService } from './services/livemap.service';
import { SitedataService } from './services/sitedata.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DailystatsComponent } from './dailystats/dailystats.component';
import { ChosendayComponent } from './chosenday/chosenday.component';
import { ChosenService } from './services/chosen.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoutesComponent,
    SitesComponent,
    MapComponent,
    LiveComponent,
    StatsComponent,
    TodayComponent,
    LivemapComponent,
    SitedataComponent,
    DailystatsComponent,
    ChosendayComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: RoutesComponent },
      { path: 'sites', component: SitesComponent },
      { path: 'map', component: MapComponent },
      { path: 'live', component: LiveComponent },
      { path: 'livemap', component: LivemapComponent },
      { path: 'stats', component: StatsComponent },
      { path: 'today', component: TodayComponent },
      { path: 'today/:site_name?/:datenow?', component: ChosendayComponent },
      { path: 'sitedata', component: SitedataComponent },
      { path: 'dailystats', component: DailystatsComponent },
      { path: '**', component: RoutesComponent },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [
    SitesService,
    MarkerService,
    StatsService,
    TodayService,
    LivemapService,
    SitedataService,
    ChosenService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
