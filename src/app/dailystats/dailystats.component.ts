import { Component } from '@angular/core';
import { SiteNames } from '../models/sitenames';
import { SitedataService } from '../services/sitedata.service';
import { HttpClient } from '@angular/common/http';
import { Daily } from '../models/dailyMinMax';
import { Wind } from '../models/windSpeeds';
import * as d3 from 'd3';

@Component({
  selector: 'dailystats',
  templateUrl: './dailystats.component.html',
  styleUrls: ['./dailystats.component.css'],
})
export class DailystatsComponent {
  minAir: any = '';
  maxAir: any = '';
  windAvg: any;
  minMax: Daily[] = [];
  siteNames: SiteNames[] = [];
  searchTerm: string = '';
  dateInput: any = '';
  windSpeeds: any[] = [];
  speed: any = '';
  maxWind: any;
  minWind: any;
  widthCheck: any;
  hidden: boolean = true;
  windTemp: any;

  private svgBar: any;
  private svgLine: any;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;
  private highWind: any;
  private highTime: any;

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((d) => d.wind_speed))
      .padding(0.2);

    // Create the Y-axis band scale
    const y = d3
      .scaleLinear()
      .domain([0, this.highWind])
      .range([this.height, 0]);

    // Draw the Y-axis on the chart
    this.svgBar.append('g').call(d3.axisLeft(y));

    // Create and fill the bars
    this.svgBar
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.wind_speed))
      .attr('y', (d: any) => y(d.wind_speed))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.wind_speed))
      .attr('fill', '#4682b4');

    // Draw dotted line at y=0
    this.svgBar
      .append('line')
      .attr('x1', 0)
      .attr('x2', this.width)
      .attr('y1', y(this.windAvg))
      .attr('y2', y(this.windAvg))
      .attr('stroke', 'black')
      .attr('stroke-dasharray', '4')
      .attr('class', 'mean-line')
      .attr('id', 'mean-line');

    // Add 'Mean' above the line
    this.svgBar
      .append('text')
      .attr('class', 'mean-text')
      .attr('text-anchor', 'middle')
      .attr('x', 25)
      .attr('y', y(this.windAvg) - 6)
      .text('Mean');

    // Draw the X-axis on the chart
    this.svgBar
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'middle', 'bold')
      .style('fill', 'white')
      .style('font-weight', 'bold')
      .style('font-size', '14px')
      .attr('dy', '-15');
  }

  private drawPlot(): void {
    // Add X axis
    const x = d3
      .scaleLinear()
      .domain([0, this.highTime])
      .range([0, this.width]);
    this.svgLine
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([0, this.highWind])
      .range([this.height, 0]);
    this.svgLine.append('g').call(d3.axisLeft(y));

    // Add line connecting each point
    const lineGenerator = d3
      .line()
      .x((d: any) =>
        x(parseInt(d.timenow.toString().replace(':', '.').replace(':', '')))
      )
      .y((d: any) => y(d.wind_speed));

    this.svgLine
      .append('path')
      .datum(this.windSpeeds)
      .attr('fill', 'none')
      .attr('stroke', '#4682b4')
      .attr('stroke-width', 2)
      .attr('d', lineGenerator);

    // Add dots
    const dots = this.svgLine.append('g');
    dots
      .selectAll('dot')
      .data(this.windSpeeds)
      .enter()
      .append('circle')
      .attr('cx', (d: any) =>
        x(parseInt(d.timenow.toString().replace(':', '.').replace(':', '')))
      )
      .attr('cy', (d: any) => y(d.wind_speed))
      .attr('r', 7)
      .style('opacity', 0.5)
      .style('fill', '#4682b4');
  }

  private createSvg(): void {
    this.svgBar = d3
      .select('div#bar')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private createsvgLine(): void {
    this.svgLine = d3
      .select('div#line')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  constructor(service: SitedataService, private httpClient: HttpClient) {
    service.getWeatherDataSites().subscribe((response) => {
      this.siteNames = response;
    });
  }

  getSelectedValue(event: any) {
    this.searchTerm = event.target.value;
  }

  getData() {
    return this.httpClient
      .get<Daily[]>(
        `http://localhost:3000/dailystats/` +
          this.searchTerm +
          '/' +
          this.dateInput
      )
      .subscribe((res) => {
        this.minMax = res;
        this.minAir = this.minMax[0].minAir;
        this.maxAir = this.minMax[0].maxAir;
        this.windAvg = this.minMax[0].meanWind;
        this.maxWind = this.minMax[0].maxWind * 20;
        this.minWind = this.minMax[0].minWind;
        this.windTemp = this.maxWind - this.windAvg * 20;
      });
  }

  getWind() {
    return this.httpClient
      .get<Wind[]>(
        `http://localhost:3000/windspeeds/` +
          this.searchTerm +
          '/' +
          this.dateInput
      )
      .subscribe((res) => {
        this.windSpeeds = res;
        this.highWind = Math.max(
          ...this.windSpeeds.map((temp) => temp.wind_speed)
        );
        this.highTime = Math.max(
          ...this.windSpeeds.map((temp) =>
            parseInt(temp.timenow.toString().replace(':', '.').replace(':', ''))
          )
        );
        this.widthCheck = this.windSpeeds.length * 35;
        this.hidden = false;
        this.createSvg();
        this.createsvgLine();
        this.drawPlot();
        this.drawBars(this.windSpeeds);
      });
  }

  clearSvg() {
    d3.select('svg').remove();
    d3.select('svg').remove();
  }
}
