import { axisLeft, select } from 'd3';
import { useEffect, useRef } from 'react';
import type { AxisLeftProps } from './types';

function AxisLeft({ scale }: AxisLeftProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scale));
    }
  }, [scale]);

  return <g ref={ref} />;
}

export default AxisLeft;
