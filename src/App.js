import React, { useState, useEffect, useRef } from 'react';
//import { select } from 'd3'
import * as d3 from "d3";
//import moment from 'moment'
import './App.css';

function App() {
  const [data, setData] = useState([])
  const svgRef = useRef();

  useEffect (() => {
    fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
      .then(response => response.json())
      .then(
        (result) => {
          setData(result.data)
        }
      )
  }, []);

  
  //const date = moment(data[12]).format('MM-DD-YYYY')
  if (data.length > 1){
    // Set the main SVG area values
    let margin = { top: 20, right: 20, bottom: 50, left: 60 };
    let height = 500 - margin.top - margin.bottom;
    let width = 700;

    // Create X Axis
    let minDate = d3.min(data, d => new Date(d[0]))
    let maxDate = d3.max(data, d => new Date(d[0]))

    let xScale = d3.scaleTime()
              .domain([minDate, maxDate])
              .range([0, width]);

    let xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat('%Y'))

    // Create Y Axis
    let minGDP = d3.min(data, d => d[1]);
    let maxGDP = d3.max(data, d => d[1]);

    let yScale = d3.scaleLinear()
              .domain([minGDP, maxGDP])
              .range([height, 0]);

    let yAxis = d3.axisLeft(yScale)

    // Yo yo yoooooo ITS TIME TO USE D3 BOIIIIIIII..... I'm not excited either.
    console.log("LOADED")
    // This is the ENTIRE CHART
    let chart = d3.select(svgRef.current)
                    .attr('width', width + margin.right + margin.left)
                    .attr('height', height + margin.top + margin.bottom);


    /* This is the CONTAINED AREA that will hold the CHART DATA, 
       everything outside this is just margins. */
    let main = chart.append('g')
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .attr("width", width)
                    .attr("height", height)
                    .attr("class", "main");

    // Append the X Axis
    main.append('g')
        .attr('class', 'main axis date')
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    // Append the Y Axis
    main.append('g')
        .attr('class', 'main axis date')
        .call(yAxis);
        
    // DAMN! LOOK AT THOSE BARS!
    main
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("width", 1)
      .attr("height", value => height - yScale(value[1]))
      .attr('x', value => xScale(new Date(value[0])))
      .attr('y', value => yScale(value[1]))
      .attr("fill", "blue")
  }

      


  return (
    <div>
      <svg ref={svgRef}>
      </svg>
    </div>
  );
}

export default App;
