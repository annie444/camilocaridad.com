import {
  type ReactNode,
  type RefObject,
  useRef,
  useEffect,
  useState,
} from 'react';
import { cn, isArrayString, round } from '@lib/utils.ts';
import { animate, svg, utils, createScope, Scope } from 'animejs';

export interface BlobProps {
  numPoints?: number;
  color: string;
  centerX: number;
  centerY: number;
  classes?: string[];
  wobble?: number;
  radius?: number;
  randomness?: number;
  smoothing?: number;
}

interface Point {
  x: number;
  y: number;
}

function generateBlobPath(
  centerX: number,
  centerY: number,
  numPoints: number,
  wobble: number,
  radius: number,
  randomness: number,
  smoothing: number
) {
  const points: Point[] = [];
  const angleStep: number = (2 * Math.PI) / numPoints;

  const center: Point = {
    x: centerX + (Math.random() - 0.5) * wobble,
    y: centerY + (Math.random() - 0.5) * wobble,
  };

  // Generate random points around the circle
  for (let i = 0; i < numPoints; i++) {
    const angle = i * angleStep;
    const randomRadius = radius + (Math.random() - 0.5) * randomness;
    const x = center.x + Math.cos(angle) * randomRadius;
    const y = center.y + Math.sin(angle) * randomRadius;
    points.push({ x, y });
  }

  // Start the path at the first point
  let path = `M ${points[0].x} ${points[0].y} `;

  for (let i = 0; i < points.length; i++) {
    const p0 = points[(i - 1 + numPoints) % numPoints]; // previous anchor
    const p1 = points[i]; // current anchor
    const p2 = points[(i + 1) % numPoints]; // next anchor
    const p3 = points[(i + 2) % numPoints]; // point after next

    // Vectors: incoming and outgoing directions
    const inVec = { x: p1.x - p0.x, y: p1.y - p0.y };
    const outVec = { x: p2.x - p1.x, y: p2.y - p1.y };

    // Normalize inVec and outVec
    const inLen = Math.hypot(inVec.x, inVec.y);
    const outLen = Math.hypot(outVec.x, outVec.y);
    const inNorm = { x: inVec.x / inLen, y: inVec.y / inLen };
    const outNorm = { x: outVec.x / outLen, y: outVec.y / outLen };

    // Handle direction = average of in and out directions (smoothed bisector)
    const handleDir = {
      x: (inNorm.x + outNorm.x) / 2,
      y: (inNorm.y + outNorm.y) / 2,
    };

    // Normalize handle direction
    const handleLen = Math.hypot(handleDir.x, handleDir.y);
    handleDir.x /= handleLen;
    handleDir.y /= handleLen;

    // Control point 1: from p1 going out
    const c1 = {
      x: p1.x + handleDir.x * outLen * smoothing,
      y: p1.y + handleDir.y * outLen * smoothing,
    };

    // Recalculate for p2’s incoming handle
    const inVecNext = { x: p3.x - p2.x, y: p3.y - p2.y };
    const outVecNext = { x: p2.x - p1.x, y: p2.y - p1.y };

    const inNormNext = {
      x: inVecNext.x / Math.hypot(inVecNext.x, inVecNext.y),
      y: inVecNext.y / Math.hypot(inVecNext.x, inVecNext.y),
    };
    const outNormNext = {
      x: outVecNext.x / Math.hypot(outVecNext.x, outVecNext.y),
      y: outVecNext.y / Math.hypot(outVecNext.x, outVecNext.y),
    };

    const handleDirNext = {
      x: (inNormNext.x + outNormNext.x) / 2,
      y: (inNormNext.y + outNormNext.y) / 2,
    };
    const handleLenNext = Math.hypot(handleDirNext.x, handleDirNext.y);
    handleDirNext.x /= handleLenNext;
    handleDirNext.y /= handleLenNext;

    const c2 = {
      x: p2.x - handleDirNext.x * outLen * smoothing,
      y: p2.y - handleDirNext.y * outLen * smoothing,
    };

    // Final curve segment: p1 -> p2
    path += `C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y} `;
  }

  path += 'Z'; // Close the path
  return path;
}

export function Blob({
  numPoints = 6,
  centerX,
  centerY,
  color,
  classes,
  wobble = 10,
  radius = 40,
  randomness = 25,
  smoothing = 0.35,
}: BlobProps): ReactNode {
  let root: RefObject<SVGSVGElement | null> = useRef(null);
  let scope: RefObject<Scope | null> = useRef(null);
  let path1: RefObject<SVGPathElement | null> = useRef(null);
  let path2: RefObject<SVGPathElement | null> = useRef(null);

  const [blob1, setBlob1] = useState(
    generateBlobPath(
      centerX,
      centerY,
      numPoints,
      wobble,
      radius,
      randomness,
      smoothing
    )
  );
  const [blob2, setBlob2] = useState(
    generateBlobPath(
      centerX,
      centerY,
      numPoints,
      wobble,
      radius,
      randomness,
      smoothing
    )
  );

  let classNames: string = '';
  try {
    isArrayString(classes);
    classNames = cn('fixed', 'top-0', 'left-0', 'z-0', ...classes);
  } catch {
    classNames = cn('fixed', 'top-0', 'left-0', 'z-0');
  }

  useEffect(() => {
    if (window) {
      scope.current = createScope({ root }).add((scope) => {
        function animateRandomPoints() {
          if (path2.current !== null) {
            // Update the points attribute on #path-2
            utils.set(path2.current, {
              d: generateBlobPath(
                centerX,
                centerY,
                numPoints,
                wobble,
                radius,
                randomness,
                smoothing
              ),
            });
            if (path1.current !== null) {
              // Morph the points of #path-1 into #path-2
              animate(path1.current, {
                d: svg.morphTo(path2.current),
                ease: 'inOut',
                duration: 1500,
                opacity: 0.5,
                onComplete: animateRandomPoints,
              });
            }
          }
        }

        animateRandomPoints();
      });

      return () => scope.current?.revert();
    }
  }, []);

  return (
    <svg
      ref={root}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames}
    >
      <path
        ref={path1}
        fill={color}
        d={blob1}
        transform="translate(100 100)"
        style={{ opacity: 0.5 }}
      ></path>
      <path
        ref={path2}
        fill={color}
        d={blob2}
        transform="translate(100 100)"
        style={{ opacity: 0 }}
      ></path>
    </svg>
  );
}
