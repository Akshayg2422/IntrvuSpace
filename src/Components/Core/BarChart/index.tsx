import React, { Component } from 'react';
import * as d3 from 'd3';

interface Props { }

interface State { }

class BarChart extends Component<Props, State> {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const data = [4, 8, 15, 16, 23, 42];

    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const x = d3.scaleBand()
      .domain(data.map((d, i) => i.toString()))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

    svg.showAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => x(i.toString()) || 0)
      .attr('y', d => y(d) || 0)
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d))
      .attr('fill', 'steelblue');
  }

  render() {
    return <svg width="400" height="400"></svg>;
  }
}

export { BarChart };
