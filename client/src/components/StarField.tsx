import { useEffect, useRef } from "react";

interface StarData {
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  type: "sparkle" | "orb";
  duration: number;
  delay: number;
  offsetX: number;
  offsetY: number;
  el: HTMLDivElement | null;
}

const colorMap: Record<string, { main: string; glow: string; shadow: string }> = {
  blue: {
    main: "#4a90d9",
    glow: "rgba(74, 144, 217, 0.8)",
    shadow: "0 0 20px rgba(74, 144, 217, 0.6), 0 0 40px rgba(74, 144, 217, 0.4)",
  },
  purple: {
    main: "#9b6dff",
    glow: "rgba(155, 109, 255, 0.8)",
    shadow: "0 0 20px rgba(155, 109, 255, 0.6), 0 0 40px rgba(155, 109, 255, 0.4)",
  },
  cyan: {
    main: "#66d9ef",
    glow: "rgba(102, 217, 239, 0.8)",
    shadow: "0 0 20px rgba(102, 217, 239, 0.6), 0 0 40px rgba(102, 217, 239, 0.4)",
  },
};

const globalState = {
  mouseX: null as number | null,
  mouseY: null as number | null,
  initialized: false,
};

function initGlobalListeners() {
  if (globalState.initialized) return;
  globalState.initialized = true;

  window.addEventListener("mousemove", (e) => {
    globalState.mouseX = e.clientX;
    globalState.mouseY = e.clientY;
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      globalState.mouseX = e.touches[0].clientX;
      globalState.mouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) {
      globalState.mouseX = e.touches[0].clientX;
      globalState.mouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener("touchend", () => {
    globalState.mouseX = null;
    globalState.mouseY = null;
  }, { passive: true });

  document.addEventListener("mouseleave", () => {
    globalState.mouseX = null;
    globalState.mouseY = null;
  });
}

function createSparkle(size: number, color: string): string {
  const c = colorMap[color];
  return `<div style="position:relative;width:${size}px;height:${size}px">
    <div style="position:absolute;inset:0;background:radial-gradient(circle,${c.main} 0%,transparent 70%);filter:blur(${size * 0.15}px);opacity:0.6"></div>
    <div style="position:absolute;left:50%;top:0;width:2px;height:100%;background:linear-gradient(to bottom,transparent,${c.main},white,${c.main},transparent);transform:translateX(-50%);box-shadow:${c.shadow}"></div>
    <div style="position:absolute;top:50%;left:0;height:2px;width:100%;background:linear-gradient(to right,transparent,${c.main},white,${c.main},transparent);transform:translateY(-50%);box-shadow:${c.shadow}"></div>
    <div style="position:absolute;left:50%;top:50%;width:${size * 0.2}px;height:${size * 0.2}px;background:white;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 10px white,${c.shadow}"></div>
  </div>`;
}

function createOrb(size: number, color: string): string {
  const c = colorMap[color];
  const bg = size > 5 ? `radial-gradient(circle at 30% 30%, white, ${c.main} 50%, ${c.glow} 100%)` : c.main;
  const shadow = size > 5 ? c.shadow : `0 0 ${size * 2}px ${c.glow}`;
  return `<div style="width:${size}px;height:${size}px;background:${bg};border-radius:50%;box-shadow:${shadow}"></div>`;
}

function generateStarsData(): StarData[] {
  const stars: StarData[] = [];
  const colors = ["blue", "purple", "cyan"];

  const sparkles = [
    { x: 15, y: 45, size: 45, color: "blue" },
    { x: 25, y: 75, size: 35, color: "blue" },
    { x: 70, y: 85, size: 30, color: "cyan" },
    { x: 85, y: 60, size: 28, color: "blue" },
    { x: 50, y: 50, size: 55, color: "blue" },
    { x: 30, y: 20, size: 30, color: "purple" },
    { x: 75, y: 25, size: 38, color: "cyan" },
    { x: 8, y: 80, size: 32, color: "purple" },
    { x: 92, y: 15, size: 28, color: "blue" },
    { x: 60, y: 10, size: 25, color: "cyan" },
    { x: 40, y: 35, size: 22, color: "purple" },
    { x: 18, y: 60, size: 26, color: "blue" },
  ];

  sparkles.forEach((s) => {
    stars.push({
      baseX: s.x, baseY: s.y, size: s.size, color: s.color, type: "sparkle",
      duration: 15 + Math.random() * 10, delay: Math.random() * 3,
      offsetX: 0, offsetY: 0, el: null,
    });
  });

  const orbs = [
    { x: 10, y: 15, size: 12 }, { x: 20, y: 55, size: 10 }, { x: 35, y: 10, size: 14 },
    { x: 45, y: 30, size: 9 }, { x: 55, y: 15, size: 11 }, { x: 65, y: 40, size: 13 },
    { x: 80, y: 12, size: 10 }, { x: 90, y: 35, size: 9 }, { x: 5, y: 70, size: 11 },
    { x: 40, y: 65, size: 8 }, { x: 60, y: 70, size: 10 }, { x: 78, y: 80, size: 9 },
    { x: 92, y: 75, size: 12 }, { x: 12, y: 88, size: 8 }, { x: 55, y: 88, size: 10 },
    { x: 88, y: 50, size: 9 }, { x: 8, y: 40, size: 11 }, { x: 48, y: 8, size: 8 },
  ];

  orbs.forEach((s) => {
    stars.push({
      baseX: s.x, baseY: s.y, size: s.size, color: colors[Math.floor(Math.random() * 3)], type: "orb",
      duration: 18 + Math.random() * 12, delay: Math.random() * 4,
      offsetX: 0, offsetY: 0, el: null,
    });
  });

  for (let i = 0; i < 400; i++) {
    stars.push({
      baseX: Math.random() * 100, baseY: Math.random() * 100,
      size: 1 + Math.random() * 3, color: colors[Math.floor(Math.random() * 3)], type: "orb",
      duration: 20 + Math.random() * 15, delay: Math.random() * 6,
      offsetX: 0, offsetY: 0, el: null,
    });
  }

  return stars;
}

export function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<StarData[]>([]);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    initGlobalListeners();

    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    const stars = generateStarsData();
    starsRef.current = stars;

    stars.forEach((star) => {
      const div = document.createElement("div");
      div.style.cssText = `position:absolute;left:${star.baseX}%;top:${star.baseY}%;z-index:${star.type === "sparkle" ? 2 : 1};will-change:transform;animation:star-float ${star.duration}s ease-in-out infinite;animation-delay:${star.delay}s;pointer-events:none;`;
      div.innerHTML = star.type === "sparkle" ? createSparkle(star.size, star.color) : createOrb(star.size, star.color);
      container.appendChild(div);
      star.el = div;
    });

    const tick = () => {
      const rect = container.getBoundingClientRect();
      const mx = globalState.mouseX;
      const my = globalState.mouseY;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (!star.el) continue;

        const sx = rect.left + (star.baseX / 100) * rect.width + star.offsetX;
        const sy = rect.top + (star.baseY / 100) * rect.height + star.offsetY;

        let tx = 0, ty = 0;

        if (mx !== null && my !== null) {
          const dx = sx - mx;
          const dy = sy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 80 + star.size * 1.5;

          if (dist < radius && dist > 0) {
            const force = Math.pow(1 - dist / radius, 1.5) * (60 + star.size);
            tx = (dx / dist) * force;
            ty = (dy / dist) * force;
          }
        }

        const ease = (tx !== 0 || ty !== 0) ? 0.12 : 0.03;
        star.offsetX += (tx - star.offsetX) * ease;
        star.offsetY += (ty - star.offsetY) * ease;

        star.el.style.transform = `translate(${star.offsetX}px, ${star.offsetY}px)`;
      }
    };

    intervalRef.current = window.setInterval(tick, 16);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden" />;
}
