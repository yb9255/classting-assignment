import { useEffect, useRef } from 'react';
import { select, scaleBand, scaleLinear } from 'd3';
import { Data } from '../components/BarChart/types';

type Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

function useD3Data(data: Data[], margin: Margin) {
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;
  const totalQuizCount = Math.max(...data.map(({ value }) => value));

  const scaleX = scaleBand()
    .domain(data.map(({ label }) => label))
    .range([0, width])
    .padding(0.5);

  const scaleY = scaleLinear().domain([0, totalQuizCount]).range([height, 0]);

  useEffect(() => {
    if (svgRef.current) {
      select(svgRef.current)
        .selectAll('rect')
        .data(data)
        .attr('y', height)
        .attr('height', 0)
        .transition()
        .duration(1000)
        .attr('y', (data) => scaleY(data.value))
        .attr('height', (data) => height - scaleY(data.value));
    }
  }, [data, height, scaleY]);

  return {
    svgRef,
    width,
    height,
    totalQuizCount,
    scaleX,
    scaleY,
  };
}

export default useD3Data;
