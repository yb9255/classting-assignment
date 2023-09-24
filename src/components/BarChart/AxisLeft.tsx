import { axisLeft, format, select } from 'd3';
import { useEffect, useRef } from 'react';
import type { AxisLeftProps } from './types';

function AxisLeft({ scale, tickCount }: AxisLeftProps) {
  const ref = useRef<SVGGElement>(null);

  /** ref가 가지고 있는 DOM에 차트 Y축에 들어갈 값과 형식을 지정 */
  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(
        axisLeft(scale).ticks(tickCount).tickFormat(format('d'))
      );
    }
  }, [scale, tickCount]);

  return <g ref={ref} />;
}

export default AxisLeft;
