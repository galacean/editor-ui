import React, { useEffect, useMemo, useImperativeHandle, forwardRef } from 'react'
import { IBezierPoint, IPoint } from './types';
import { convertBezierPointToPoint, getPointOnCurve } from './helper';
import { styled } from '@galacean/design-system';

const AnmiatedCircle = styled('circle', {
  fill: 'transparent',
  transition: 'fill 0.3s ease',
  pointerEvents: 'none',
  variants: {
    display: {
      false: {
        fill: 'transparent',
      },
      true: {
        fill: '$orange10',
        display: 'block'
      }
    }
  }
});

interface CurveAnimationProps {
  points: IBezierPoint[];
}

export interface CurveAnimationRef {
  play: () => void;
  getIsPlaying: () => boolean;
  stop: () => void;
}

export const CurveAnimation = forwardRef<CurveAnimationRef, CurveAnimationProps>(function CurveAnimation(props, forwardedRef) {
  const { points: propPoints } = props;
  const progressRef = React.useRef<number>(0);
  const circleRef = React.useRef<SVGCircleElement>(null);
  const rafRef = React.useRef<number>(0);
  const [playing, setPlaying] = React.useState(false);

  const points = useMemo(() => {
    return convertBezierPointToPoint(propPoints);
  }, [propPoints]);

  useImperativeHandle(forwardedRef, () => ({
    play: () => {
      startTransition();
    },
    getIsPlaying: () => playing,
    stop: () => {
      stopTransition();
    }
  }), [playing, points]);

  function startTransition(duration = 1000) {
    setPlaying(true);
    circleRef.current?.setAttribute('cx', points[0].x.toString());
    circleRef.current?.setAttribute('cy', points[0].y.toString());
    const startTime = Date.now();
    const frame = () => {
      const now = Date.now();
      const progress = (now - startTime) / duration;
      progressRef.current = progress;
      const point = getPointOnCurve(points, progress);
      circleRef.current?.setAttribute('cx', point.x.toString());
      circleRef.current?.setAttribute('cy', point.y.toString());
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      }
      if(progress >= 1) {
        stopTransition();
      }
    };
    rafRef.current = requestAnimationFrame(frame);
  }

  function stopTransition() {
    setPlaying(false);
    cancelAnimationFrame(rafRef.current);
  }

  return (
    <AnmiatedCircle ref={circleRef} r="6" cx={points[0].x} cy={points[0].y} display={playing} />
  )
}) 