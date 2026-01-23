import { useEffect, useRef } from "react";

interface StarState {
  el: HTMLElement;
  baseX: number;
  baseY: number;
  size: number;
  offsetX: number;
  offsetY: number;
}

const colorMap: Record<string, { main: string; glow: string; shadow: string }> = {
  blue: { main: "#4a90d9", glow: "rgba(74, 144, 217, 0.8)", shadow: "0 0 20px rgba(74, 144, 217, 0.6), 0 0 40px rgba(74, 144, 217, 0.4)" },
  purple: { main: "#9b6dff", glow: "rgba(155, 109, 255, 0.8)", shadow: "0 0 20px rgba(155, 109, 255, 0.6), 0 0 40px rgba(155, 109, 255, 0.4)" },
  cyan: { main: "#66d9ef", glow: "rgba(102, 217, 239, 0.8)", shadow: "0 0 20px rgba(102, 217, 239, 0.6), 0 0 40px rgba(102, 217, 239, 0.4)" },
};

let mouseX: number | null = null;
let mouseY: number | null = null;
let containerRect: DOMRect | null = null;
let activeStars: StarState[] = [];
let loopRunning = false;

function startGlobalLoop() {
  if (loopRunning) return;
  loopRunning = true;

  function tick() {
    if (!loopRunning) return;
    
    for (let i = 0; i < activeStars.length; i++) {
      const star = activeStars[i];
      if (!star.el.isConnected) continue;

      let targetX = 0;
      let targetY = 0;

      if (mouseX !== null && mouseY !== null && containerRect) {
        const baseScreenX = containerRect.left + (star.baseX / 100) * containerRect.width;
        const baseScreenY = containerRect.top + (star.baseY / 100) * containerRect.height;

        const dx = baseScreenX - mouseX;
        const dy = baseScreenY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 120 + star.size * 2;

        if (dist < radius && dist > 0) {
          const force = Math.pow(1 - dist / radius, 1.2) * (100 + star.size * 2);
          targetX = (dx / dist) * force;
          targetY = (dy / dist) * force;
        }
      }

      const ease = (targetX !== 0 || targetY !== 0) ? 0.1 : 0.03;
      star.offsetX += (targetX - star.offsetX) * ease;
      star.offsetY += (targetY - star.offsetY) * ease;

      star.el.style.transform = `translate(${star.offsetX}px, ${star.offsetY}px)`;
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });
  window.addEventListener("touchmove", (e) => { if (e.touches[0]) { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; } }, { passive: true });
  window.addEventListener("touchstart", (e) => { if (e.touches[0]) { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; } }, { passive: true });
  window.addEventListener("touchend", () => { mouseX = null; mouseY = null; }, { passive: true });
  document.addEventListener("mouseleave", () => { mouseX = null; mouseY = null; });
  startGlobalLoop();
}

function createSparkleHTML(size: number, color: string): string {
  const c = colorMap[color];
  return `<div style="position:relative;width:${size}px;height:${size}px">
    <div style="position:absolute;inset:0;background:radial-gradient(circle,${c.main} 0%,transparent 70%);filter:blur(${size * 0.15}px);opacity:0.6"></div>
    <div style="position:absolute;left:50%;top:0;width:2px;height:100%;background:linear-gradient(to bottom,transparent,${c.main},white,${c.main},transparent);transform:translateX(-50%);box-shadow:${c.shadow}"></div>
    <div style="position:absolute;top:50%;left:0;height:2px;width:100%;background:linear-gradient(to right,transparent,${c.main},white,${c.main},transparent);transform:translateY(-50%);box-shadow:${c.shadow}"></div>
    <div style="position:absolute;left:50%;top:50%;width:${size * 0.2}px;height:${size * 0.2}px;background:white;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 10px white,${c.shadow}"></div>
  </div>`;
}

function createOrbHTML(size: number, color: string): string {
  const c = colorMap[color];
  const bg = size > 5 ? `radial-gradient(circle at 30% 30%, white, ${c.main} 50%, ${c.glow} 100%)` : c.main;
  const shadow = size > 5 ? c.shadow : `0 0 ${size * 2}px ${c.glow}`;
  return `<div style="width:${size}px;height:${size}px;background:${bg};border-radius:50%;box-shadow:${shadow}"></div>`;
}

interface StarConfig { baseX: number; baseY: number; size: number; color: string; type: "sparkle" | "orb"; floatDuration: number; floatDelay: number; }

const STAR_CONFIGS: StarConfig[] = (() => {
  const stars: StarConfig[] = [];
  const colors = ["blue", "purple", "cyan"];

  [
    { x: 15, y: 45, size: 45, color: "blue" }, { x: 25, y: 75, size: 35, color: "blue" },
    { x: 70, y: 85, size: 30, color: "cyan" }, { x: 85, y: 60, size: 28, color: "blue" },
    { x: 50, y: 50, size: 55, color: "blue" }, { x: 30, y: 20, size: 30, color: "purple" },
    { x: 75, y: 25, size: 38, color: "cyan" }, { x: 8, y: 80, size: 32, color: "purple" },
    { x: 92, y: 15, size: 28, color: "blue" }, { x: 60, y: 10, size: 25, color: "cyan" },
    { x: 40, y: 35, size: 22, color: "purple" }, { x: 18, y: 60, size: 26, color: "blue" },
  ].forEach(s => stars.push({ baseX: s.x, baseY: s.y, size: s.size, color: s.color, type: "sparkle", floatDuration: 15 + Math.random() * 10, floatDelay: Math.random() * 3 }));

  [
    { x: 10, y: 15, size: 12 }, { x: 20, y: 55, size: 10 }, { x: 35, y: 10, size: 14 },
    { x: 45, y: 30, size: 9 }, { x: 55, y: 15, size: 11 }, { x: 65, y: 40, size: 13 },
    { x: 80, y: 12, size: 10 }, { x: 90, y: 35, size: 9 }, { x: 5, y: 70, size: 11 },
    { x: 40, y: 65, size: 8 }, { x: 60, y: 70, size: 10 }, { x: 78, y: 80, size: 9 },
    { x: 92, y: 75, size: 12 }, { x: 12, y: 88, size: 8 }, { x: 55, y: 88, size: 10 },
    { x: 88, y: 50, size: 9 }, { x: 8, y: 40, size: 11 }, { x: 48, y: 8, size: 8 },
  ].forEach(s => stars.push({ baseX: s.x, baseY: s.y, size: s.size, color: colors[Math.floor(Math.random() * 3)], type: "orb", floatDuration: 18 + Math.random() * 12, floatDelay: Math.random() * 4 }));

  for (let i = 0; i < 400; i++) {
    stars.push({ baseX: Math.random() * 100, baseY: Math.random() * 100, size: 1 + Math.random() * 3, color: colors[Math.floor(Math.random() * 3)], type: "orb", floatDuration: 20 + Math.random() * 15, floatDelay: Math.random() * 6 });
  }
  return stars;
})();

export function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const myStarsRef = useRef<StarState[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    myStarsRef.current = [];

    const updateRect = () => {
      if (container) containerRect = container.getBoundingClientRect();
    };
    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect);

    STAR_CONFIGS.forEach((config) => {
      const el = document.createElement("div");
      el.style.cssText = `position:absolute;left:${config.baseX}%;top:${config.baseY}%;z-index:${config.type === "sparkle" ? 2 : 1};pointer-events:none;will-change:transform;animation:star-float ${config.floatDuration}s ease-in-out infinite;animation-delay:${config.floatDelay}s;`;
      el.innerHTML = config.type === "sparkle" ? createSparkleHTML(config.size, config.color) : createOrbHTML(config.size, config.color);
      container.appendChild(el);
      
      const starState: StarState = { el, baseX: config.baseX, baseY: config.baseY, size: config.size, offsetX: 0, offsetY: 0 };
      myStarsRef.current.push(starState);
      activeStars.push(starState);
    });

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
      activeStars = activeStars.filter(s => !myStarsRef.current.includes(s));
      containerRect = null;
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden" />;
}
