import { axisLeft, format, select } from 'd3';
import { useEffect, useRef } from 'react';
import type { AxisLeftProps } from './types';

function AxisLeft({ scale, tickCount }: AxisLeftProps) {
  const ref = useRef<SVGGElement>(null);

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
