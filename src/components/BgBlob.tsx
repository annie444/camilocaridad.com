import { type ReactNode, type RefObject, useRef } from 'react';
import { cn, isArrayString, round } from '@lib/utils.ts';

export interface BlobProps {
  points?: number;
  color: string;
  classes?: string[];
}

function generatePoints(i: number): Array<number> {
  const max = 100;
  const min = -100;
  const points = new Array(i).map(
    () => round(Math.random() * (max - min + 1), 2) + min
  );
  return points;
}

function generatePath(i: number): string {
  const numPoints = 2 + (i - 1) * 6;
}

export function Blob({ points, color, classes }: BlobProps): ReactNode {
  const pathRef: RefObject<SVGPathElement> = useRef();

  let classNames: string = '';
  try {
    isArrayString(classes);
    classNames = cn('fixed', 'top-0', 'left-0', 'z-0', ...classes);
  } catch {
    classNames = cn('fixed', 'top-0', 'left-0', 'z-0');
  }

  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames}
    >
      <path
        ref={pathRef}
        fill={color}
        d="M 53.7 -36.9 \
        C  57.9 -23.7,  41.6  -4.6,  29.2  14.1 \
        C  16.9  32.8,   8.4  51  ,  -2.5  52.4 \
        C -13.3  53.8, -26.7  38.5, -35.7  21.7 \
        C -44.7   5  , -49.4 -13.1, -42.7 -27.8 \
        C -36.1 -42.4, -18   -53.6,   3.4 -55.5 \
        C 24.7  -57.4,  49.5 -50.1,  53.7 -36.9 \
        Z"
        transform="translate(100 100)"
      ></path>
    </svg>
  );
}
