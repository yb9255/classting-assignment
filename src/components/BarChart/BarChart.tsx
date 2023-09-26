import AxisBottom from './AxisBottom';
import AxisLeft from './AxisLeft';
import Bars from './Bars';
import type { BarChartProps } from './types';
import { useD3 } from '../../hooks';

function BarChart({ data }: BarChartProps) {
  const margin = { top: 10, right: 0, bottom: 20, left: 30 };

  const { svgRef, width, height, totalQuizCount, scaleX, scaleY } = useD3(
    data,
    margin
  );

  return (
    <svg
      ref={svgRef}
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
        <AxisLeft scale={scaleY} tickCount={totalQuizCount} />
        <Bars data={data} scaleX={scaleX} scaleY={scaleY} />
      </g>
    </svg>
  );
}

export default BarChart;
