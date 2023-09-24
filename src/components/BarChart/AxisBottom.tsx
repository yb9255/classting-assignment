import { axisBottom, select } from 'd3';
import { useEffect, useRef } from 'react';
import type { AxisBottomProps } from './types';

function AxisBottom({ scale, transform }: AxisBottomProps) {
  const ref = useRef<SVGGElement>(null);

  /** ref가 가지고 있는 DOM에 차트 X축에 들어갈 값과 형식을 지정 */
  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
}

export default AxisBottom;
