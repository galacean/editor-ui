import { styled } from '@galacean/design-system';
import React, { useEffect, useState, useRef } from 'react';
import { IPoint } from './types';
import { calculateBezierPoint, calculateHorizontalBezierPoint } from './helper';

const Dot = styled('div', {
  height: '$3',
  width: '$3',
  borderRadius: '$round',
  backgroundColor: '$orange10',
})

const Cube = styled('div', {
  position: 'relative',
  left: 0,
  height: '$4',
  width: '$4',
  borderRadius: '$round',
  backgroundColor: '$orange10',
  transitionDuration: `1500ms`,
  transitionProperty: 'all',
  transitionDelay: `0ms`,
  
  variants: {
    move: {
      true: {
        left: '100%',
        transform: 'translateX(-100%)',
      }
    }
  }
})

const StyledBezierAnimation = styled('div', {
  position: 'relative',
  width: '100%',
  height: '$6',
  marginTop: '$2',
});

interface BezierAnimationProps {
  points?: IPoint[];
  totalWidth?: number;
}


export function BezierAnimation(props: BezierAnimationProps) {
  const { points = [] } = props;
  const containerRef = useRef(null);

  return (
    <StyledBezierAnimation ref={containerRef}>
      <CanvasVersion points={points} size={{
        width: 400,
        height: 24,
      }} />
    </StyledBezierAnimation>
  );
}

interface CanvasVersionProps {
  points: IPoint[];
  size: { width: number; height: number };
}

function CanvasVersion(props: CanvasVersionProps) {
  const { points, size = { width: 400, height: 24 } } = props;


  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>();
  const trailPositions = useRef<IPoint[]>([]);
  const lastSampleTimeRef = useRef<number>(0);

  const scaledPoints = points.map(p => ({ x: p.x * (size.width - 10), y: p.y * (size.height) }));
  const duration = 800;
  const sampleInterval = 30;

  const draw = (now: number) => {
    const ctx = canvasRef?.current.getContext('2d');
    if (!startTimeRef.current) startTimeRef.current = now;
    const elapsedTime = now - startTimeRef.current;
    ctx.clearRect(0, 0, size.width, size.height);
    const t = Math.min(1, elapsedTime / duration);
    const position = calculateHorizontalBezierPoint(t, scaledPoints, size.height * 0.5);

    if (elapsedTime - lastSampleTimeRef.current >= sampleInterval) {
      trailPositions.current.push(position);
      lastSampleTimeRef.current = elapsedTime;
    }

    trailPositions.current.forEach((pos, index) => {
      const alpha = index / (duration / sampleInterval);
      ctx.fillStyle = `rgba(255, 128, 31, ${alpha})`;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw the moving circle
    ctx.fillStyle = '#ff801f';
    ctx.beginPath();
    ctx.arc(position.x, position.y, 4, 0, 2 * Math.PI);
    ctx.fill();

    if (elapsedTime < duration) {
      requestAnimationFrame(draw);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      trailPositions.current = []; // Reset on component unmount
      cancelAnimationFrame(rafRef.current!);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, size.width, size.height); // Clear the canvas
    trailPositions.current = []; // Reset on points change
    startTimeRef.current = null;
    lastSampleTimeRef.current = 0;
    rafRef.current && cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);

  }, [points])


  return (
    <canvas ref={canvasRef} width={size.width} height={size.height} style={{ pointerEvents: 'none' }} />
  )
}