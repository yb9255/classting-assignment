import { scaleBand, scaleLinear } from 'd3';
import AxisBottom from './AxisBottom';
import AxisLeft from './AxisLeft';
import Bars from './Bars';
import type { BarChartProps } from './types';

function BarChart({ data }: BarChartProps) {
  const margin = { top: 10, right: 0, bottom: 20, left: 30 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;
  const totalQuizCount = Math.max(...data.map(({ value }) => value));

  const scaleX = scaleBand()
    .domain(data.map(({ label }) => label))
    .range([0, width])
    .padding(0.5);

  const scaleY = scaleLinear().domain([0, totalQuizCount]).range([height, 0]);

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
        <AxisLeft scale={scaleY} tickCount={totalQuizCount} />
        <Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} />
      </g>
    </svg>
  );
}

export default BarChart;
