import { Component } from '@angular/core';
import { TodayService } from '../services/today.service';
import { Today } from '../models/today';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent {
  todays: Today[] = [];
  newToday: any;
  url = `http://localhost:3000/today/`;
  day: number = 1;
  month: number = 3;
  year: number = 2023;
  actualDate: any = `${this.year}-${this.month}-${this.day}`;

  constructor(
    service: TodayService,
    private http: HttpClient,
    private router: Router
  ) {
    service.getToday(this.actualDate).subscribe((response) => {
      this.todays = response;
    });
  }

  sortByAirAsc() {
    return this.todays.sort((a, b) => a.air_temperature - b.air_temperature);
  }

  sortByAirDesc() {
    return this.todays.sort((a, b) => b.air_temperature - a.air_temperature);
  }

  sortByRoadAsc() {
    return this.todays.sort(
      (a, b) => a.road_surface_temperature - b.road_surface_temperature
    );
  }

  sortByRoadDesc() {
    return this.todays.sort(
      (a, b) => b.road_surface_temperature - a.road_surface_temperature
    );
  }

  sortByWindAsc() {
    return this.todays.sort((a, b) => a.wind_speed - b.wind_speed);
  }

  sortByWindDesc() {
    return this.todays.sort((a, b) => b.wind_speed - a.wind_speed);
  }

  forwardDay() {
    if (this.day === 28 && this.month == 2) {
      this.day = 0;
      this.month++;
    }
    this.day++;
    this.actualDate = `${this.year}-${this.month}-${this.day}`;
    this.getData();
  }
  backDay() {
    if (this.day == 1 && this.month === 3) {
      this.day = 29;
      this.month--;
    }
    this.day--;
    this.actualDate = `${this.year}-${this.month}-${this.day}`;
    this.getData();
  }

  getData() {
    this.http
      .get('http://localhost:3000/today/' + this.actualDate)
      .subscribe((data) => {
        this.newToday = data;
        this.todays = this.newToday;
      });
  }

  onButtonClick(param1: string, param2: string) {
    this.router.navigate(['/next-route'], {
      queryParams: { param1: param1, param2: param2 },
    });
  }
}
