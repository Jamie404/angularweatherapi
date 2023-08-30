import { Component } from '@angular/core';
import { ChosenService } from '../services/chosen.service';
import { Chosen } from '../models/chosen';
import * as d3 from 'd3';

@Component({
  selector: 'app-chosenday',
  templateUrl: './chosenday.component.html',
  styleUrls: ['./chosenday.component.css'],
})
export class ChosendayComponent {
  url: any = window.location.href.split('/');
  params: string = ';';
  chosenTable: Chosen[] = [];
  site: any;
  date: any;
  avgAirTemp: any;
  avgRoadTemp: any;
  avgWindSpeed: any;

  private svg: any;
  private margin = 50;
  private width = 750 - this.margin * 3;
  private height = 400 - this.margin * 2;
  private highestTemperature: any;
  private lowestTemperature: any;

  private drawPlot(): void {
    // Add X axis
    const x = d3.scaleLinear().domain([0, 24]).range([0, this.width]);

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([this.highestTemperature, this.lowestTemperature])
      .range([0, this.height]);
    this.svg.append('g').call(d3.axisRight(y));

    // Add Y2 axis on the right side
    const y2 = d3
      .scaleLinear()
      .domain([this.highestTemperature, this.lowestTemperature])
      .range([0, this.height]);
    this.svg
      .append('g')
      .attr('transform', 'translate(' + this.width + ',0)')
      .call(d3.axisLeft(y2));

    this.svg
      .append('path')
      .datum(this.chosenTable)
      .attr('fill', 'none')
      .attr('stroke', '#4682b4')
      .attr('stroke-width', 2);

    // Add dots
    const dots = this.svg.append('g');
    dots
      .selectAll('dot')
      .data(this.chosenTable)
      .enter()
      .append('circle')
      .attr('cx', (d: any) =>
        x(parseInt(d.timenow.toString().replace(':', '.').replace(':', '')))
      )
      .attr('cy', (d: any) => y(d.air_temperature))
      .attr('r', 4)
      .style('opacity', 0.5)
      .style('fill', (d: any) => (d.air_temperature < 0 ? 'blue' : 'red'));

    // Add labels
    dots
      .selectAll('text')
      .data(this.chosenTable)
      .enter()
      .append('text')
      .text((d: any) => d.air_temperature)
      .attr('x', (d: any) =>
        x(parseInt(d.timenow.toString().replace(':', '.').replace(':', '')))
      )
      .attr('y', (d: any) => y(d.air_temperature));

    // Add horizontal line at 0
    this.svg
      .append('path')
      .attr('d', `M 0 ${y(0)} H ${this.width}`)
      .attr('stroke', 'black')
      .style('stroke-dasharray', '2');
  }

  private createSvg(): void {
    this.svg = d3
      .select('div#line')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  constructor(service: ChosenService) {
    this.params = '/' + this.url[4].toString() + '/' + this.url[5].toString();

    service.getWeatherData(this.params).subscribe((response) => {
      this.chosenTable = response;
      this.site = this.chosenTable[0].site_name;
      this.date = this.chosenTable[0].datenow;

      this.highestTemperature = Math.max(
        ...this.chosenTable.map((temp) => temp.air_temperature)
      );

      this.lowestTemperature = Math.min(
        ...this.chosenTable.map((temp) => temp.air_temperature)
      );

      this.createSvg();
      this.drawPlot();
    });
    service.getChosenAverage(this.params).subscribe((response) => {
      this.avgAirTemp = Number(response[0].airAverage).toFixed(1);
      this.avgRoadTemp = Number(response[0].roadAverage).toFixed(1);
      this.avgWindSpeed = Number(response[0].windAverage).toFixed(1);
    });
  }
}
