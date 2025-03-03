import { useEffect, useRef } from 'react';
import { Noise } from '@/lib/noise';

export const Waves = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({
    x: -10,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
  });
  const linesRef = useRef<Array<Array<any>>>([]);
  const pathsRef = useRef<SVGPathElement[]>([]);
  const noiseRef = useRef(new Noise(Math.random()));
  const boundingRef = useRef<DOMRect | null>(null);

  const setSize = () => {
    if (!containerRef.current || !svgRef.current) return;
    boundingRef.current = containerRef.current.getBoundingClientRect();
    svgRef.current.style.width = `${boundingRef.current.width}px`;
    svgRef.current.style.height = `${boundingRef.current.height}px`;
  };

  const setLines = () => {
    if (!boundingRef.current || !svgRef.current) return;

    const { width, height } = boundingRef.current;
    linesRef.current = [];

    // Clear existing paths
    pathsRef.current.forEach((path) => path.remove());
    pathsRef.current = [];

    const xGap = 10;
    const yGap = 32;
    const oWidth = width + 200;
    const oHeight = height + 30;
    const totalLines = Math.ceil(oWidth / xGap);
    const totalPoints = Math.ceil(oHeight / yGap);
    const xStart = (width - xGap * totalLines) / 2;
    const yStart = (height - yGap * totalPoints) / 2;

    for (let i = 0; i <= totalLines; i++) {
      const points = [];

      for (let j = 0; j <= totalPoints; j++) {
        points.push({
          x: xStart + xGap * i,
          y: yStart + yGap * j,
          wave: { x: 0, y: 0 },
          cursor: { x: 0, y: 0, vx: 0, vy: 0 },
        });
      }

      // Create path
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.classList.add('a-line');
      svgRef.current.appendChild(path);
      pathsRef.current.push(path);
      linesRef.current.push(points);
    }
  };

  const updateMousePosition = (x: number, y: number) => {
    const mouse = mouseRef.current;
    if (!boundingRef.current) return;

    mouse.x = x - boundingRef.current.left;
    mouse.y = y - boundingRef.current.top + window.scrollY;

    if (!mouse.set) {
      mouse.sx = mouse.x;
      mouse.sy = mouse.y;
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      mouse.set = true;
    }
  };

  const movePoints = (time: number) => {
    const mouse = mouseRef.current;
    const noise = noiseRef.current;

    linesRef.current.forEach((points) => {
      points.forEach((p) => {
        const move = noise.perlin2(
          (p.x + time * 0.0125) * 0.002,
          (p.y + time * 0.005) * 0.0015
        ) * 12;
        
        p.wave.x = Math.cos(move) * 32;
        p.wave.y = Math.sin(move) * 16;

        const dx = p.x - mouse.sx;
        const dy = p.y - mouse.sy;
        const d = Math.hypot(dx, dy);
        const l = Math.max(175, mouse.vs);

        if (d < l) {
          const s = 1 - d / l;
          const f = Math.cos(d * 0.001) * s;

          p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00065;
          p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00065;
        }

        p.cursor.vx += (0 - p.cursor.x) * 0.005;
        p.cursor.vy += (0 - p.cursor.y) * 0.005;
        p.cursor.vx *= 0.925;
        p.cursor.vy *= 0.925;
        p.cursor.x += p.cursor.vx * 2;
        p.cursor.y += p.cursor.vy * 2;
        p.cursor.x = Math.min(100, Math.max(-100, p.cursor.x));
        p.cursor.y = Math.min(100, Math.max(-100, p.cursor.y));
      });
    });
  };

  const moved = (point: any, withCursorForce = true) => {
    const coords = {
      x: point.x + point.wave.x + (withCursorForce ? point.cursor.x : 0),
      y: point.y + point.wave.y + (withCursorForce ? point.cursor.y : 0),
    };

    coords.x = Math.round(coords.x * 10) / 10;
    coords.y = Math.round(coords.y * 10) / 10;

    return coords;
  };

  const drawLines = () => {
    linesRef.current.forEach((points, lIndex) => {
      let p1 = moved(points[0], false);
      let d = `M ${p1.x} ${p1.y}`;

      points.forEach((p1, pIndex) => {
        const isLast = pIndex === points.length - 1;
        p1 = moved(p1, !isLast);
        const p2 = moved(points[pIndex + 1] || points[points.length - 1], !isLast);
        d += `L ${p1.x} ${p1.y}`;
      });

      pathsRef.current[lIndex].setAttribute('d', d);
    });
  };

  const tick = (time: number) => {
    const mouse = mouseRef.current;
    if (!containerRef.current) return;

    mouse.sx += (mouse.x - mouse.sx) * 0.1;
    mouse.sy += (mouse.y - mouse.sy) * 0.1;

    const dx = mouse.x - mouse.lx;
    const dy = mouse.y - mouse.ly;
    const d = Math.hypot(dx, dy);

    mouse.v = d;
    mouse.vs += (d - mouse.vs) * 0.1;
    mouse.vs = Math.min(100, mouse.vs);

    mouse.lx = mouse.x;
    mouse.ly = mouse.y;
    mouse.a = Math.atan2(dy, dx);

    containerRef.current.style.setProperty('--x', `${mouse.sx}px`);
    containerRef.current.style.setProperty('--y', `${mouse.sy}px`);

    movePoints(time);
    drawLines();
    
    animationRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const handleResize = () => {
      setSize();
      setLines();
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition(e.pageX, e.pageY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      updateMousePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('touchmove', handleTouchMove);

    setSize();
    setLines();
    animationRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="waves absolute top-0 left-0 w-full h-full overflow-hidden before:absolute before:top-0 before:left-0 before:w-2 before:h-2 before:bg-[#160000] before:rounded-full before:transform before:translate-x-[calc(var(--x)-50%)] before:translate-y-[calc(var(--y)-50%)] before:will-change-transform">
      <svg ref={svgRef} className="block w-full h-full">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#FF00FF', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#FF00FF', stopOpacity: 0.3 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
