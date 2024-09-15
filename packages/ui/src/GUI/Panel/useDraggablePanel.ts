import { useCallback, useEffect, useRef, useState } from "react";
import { clamp } from "../../../utils";

// You could use different cache key for different panels if you have multiple GUI instances in your app
export function useDraggablePanel(panelRef: React.RefObject<HTMLDivElement>, cacheKey = 'galacean-gui-panel-position') {
  const panelSize = useRef({ width: 0, height: 0 });
  const windowSize = useRef({ width: 0, height: 0 });
  const transformOffset = useRef<{x:number, y: number}>({  x: 0, y: 0 });
  const offsetRange = useRef({ minX: 0, minY: 0, maxX: 0, maxY: 0 });
  const [mouseStartPosition, setMouseStartPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  function handleMouseDown(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    const { x, y, right, bottom } = panelRef.current?.getBoundingClientRect();
    const { innerWidth, innerHeight } = window;

    windowSize.current = { width: innerWidth, height: innerHeight };
    setMouseStartPosition({ x: e.clientX, y: e.clientY });

    offsetRange.current = {
      minX: -x + transformOffset.current.x,
      minY: -y + transformOffset.current.y,
      maxX: windowSize.current.width - right + transformOffset.current.x,
      maxY: windowSize.current.height - bottom + transformOffset.current.y,
    };
    setDragging(true);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!panelRef.current) return;

    const xShift = clamp(
      e.clientX - mouseStartPosition.x + transformOffset.current.x,
      offsetRange.current.minX,
      offsetRange.current.maxX
    );
    const yShift = clamp(
      e.clientY - mouseStartPosition.y + transformOffset.current.y,
      offsetRange.current.minY,
      offsetRange.current.maxY
    );

    applyTransform(xShift, yShift);
  }, [mouseStartPosition]);

  function applyTransform(x: number, y: number) {
    if (panelRef.current) {
      panelRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const handleMouseUp = useCallback((e: MouseEvent) => {
    setDragging(false);
    transformOffset.current = {
      x: clamp(e.clientX - mouseStartPosition.x + transformOffset.current.x, offsetRange.current.minX, offsetRange.current.maxX),
      y: clamp(e.clientY - mouseStartPosition.y + transformOffset.current.y, offsetRange.current.minY, offsetRange.current.maxY),
    };
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    localStorage.setItem(cacheKey, `${transformOffset.current.x},${transformOffset.current.y}`);
  }, [setDragging, mouseStartPosition]);

  function checkIfOutside() {
    if(!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const { x, y } = rect;
    if (x < 0 || y < 0) {
      transformOffset.current = { x: 0, y: 0 };
      applyTransform(0, 0);
      localStorage.setItem(cacheKey, '0,0');
    }
  }

  useEffect(() => {
    if (panelRef.current) {
      panelSize.current = { width: panelRef.current.offsetWidth, height: panelRef.current.offsetHeight };
    }
    const cachedOffset = localStorage.getItem(cacheKey);
    if (cachedOffset) {
      const [x, y] = cachedOffset.split(',').map(Number);
      transformOffset.current = { x, y };
      applyTransform(x, y);
      checkIfOutside();
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    }

  }, [dragging]);

  return {
    dragging,
    handleMouseDown,
  }
}
