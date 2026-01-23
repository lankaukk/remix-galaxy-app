import { useEffect, useRef } from "react";

interface StarData {
  id: number;
  type: "sparkle" | "orb";
  baseX: number;
  baseY: number;
  size: number;
  color: "blue" | "purple" | "cyan";
  delay: number;
  duration: number;
  offsetX: number;
  offsetY: number;
  element: HTMLDivElement | null;
}

const colorMap = {
  blue: {
    main: "#4a90d9",
    glow: "rgba(74, 144, 217, 0.8)",
    shadow: "0 0 20px rgba(74, 144, 217, 0.6), 0 0 40px rgba(74, 144, 217, 0.4), 0 0 60px rgba(74, 144, 217, 0.2)",
  },
  purple: {
    main: "#9b6dff",
    glow: "rgba(155, 109, 255, 0.8)",
    shadow: "0 0 20px rgba(155, 109, 255, 0.6), 0 0 40px rgba(155, 109, 255, 0.4), 0 0 60px rgba(155, 109, 255, 0.2)",
  },
  cyan: {
    main: "#66d9ef",
    glow: "rgba(102, 217, 239, 0.8)",
    shadow: "0 0 20px rgba(102, 217, 239, 0.6), 0 0 40px rgba(102, 217, 239, 0.4), 0 0 60px rgba(102, 217, 239, 0.2)",
  },
};

class StarFieldEngine {
  private stars: StarData[] = [];
  private container: HTMLDivElement | null = null;
  private mouseX: number | null = null;
  private mouseY: number | null = null;
  private animationId: number | null = null;
  private running = false;

  constructor() {
    this.generateStars();
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.animate = this.animate.bind(this);
  }

  private generateStars() {
    let id = 1;

    const sparkles = [
      { x: 15, y: 45, size: 45, color: "blue" as const },
      { x: 25, y: 75, size: 35, color: "blue" as const },
      { x: 70, y: 85, size: 30, color: "cyan" as const },
      { x: 85, y: 60, size: 28, color: "blue" as const },
      { x: 50, y: 50, size: 55, color: "blue" as const },
      { x: 30, y: 20, size: 30, color: "purple" as const },
      { x: 75, y: 25, size: 38, color: "cyan" as const },
      { x: 8, y: 80, size: 32, color: "purple" as const },
      { x: 92, y: 15, size: 28, color: "blue" as const },
      { x: 60, y: 10, size: 25, color: "cyan" as const },
      { x: 40, y: 35, size: 22, color: "purple" as const },
      { x: 18, y: 60, size: 26, color: "blue" as const },
    ];

    sparkles.forEach((s) => {
      this.stars.push({
        id: id++,
        type: "sparkle",
        baseX: s.x,
        baseY: s.y,
        size: s.size,
        color: s.color,
        delay: Math.random() * 3,
        duration: 15 + Math.random() * 10,
        offsetX: 0,
        offsetY: 0,
        element: null,
      });
    });

    const mediumOrbs = [
      { x: 10, y: 15, size: 12, color: "purple" as const },
      { x: 20, y: 55, size: 10, color: "purple" as const },
      { x: 35, y: 10, size: 14, color: "purple" as const },
      { x: 45, y: 30, size: 9, color: "blue" as const },
      { x: 55, y: 15, size: 11, color: "purple" as const },
      { x: 65, y: 40, size: 13, color: "cyan" as const },
      { x: 80, y: 12, size: 10, color: "purple" as const },
      { x: 90, y: 35, size: 9, color: "purple" as const },
      { x: 5, y: 70, size: 11, color: "cyan" as const },
      { x: 40, y: 65, size: 8, color: "purple" as const },
      { x: 60, y: 70, size: 10, color: "blue" as const },
      { x: 78, y: 80, size: 9, color: "purple" as const },
      { x: 92, y: 75, size: 12, color: "purple" as const },
      { x: 12, y: 88, size: 8, color: "cyan" as const },
      { x: 55, y: 88, size: 10, color: "purple" as const },
      { x: 88, y: 50, size: 9, color: "blue" as const },
      { x: 8, y: 40, size: 11, color: "purple" as const },
      { x: 48, y: 8, size: 8, color: "cyan" as const },
      { x: 72, y: 55, size: 10, color: "blue" as const },
      { x: 33, y: 92, size: 11, color: "purple" as const },
    ];

    mediumOrbs.forEach((s) => {
      this.stars.push({
        id: id++,
        type: "orb",
        baseX: s.x,
        baseY: s.y,
        size: s.size,
        color: s.color,
        delay: Math.random() * 4,
        duration: 18 + Math.random() * 12,
        offsetX: 0,
        offsetY: 0,
        element: null,
      });
    });

    for (let i = 0; i < 400; i++) {
      this.stars.push({
        id: id++,
        type: "orb",
        baseX: Math.random() * 100,
        baseY: Math.random() * 100,
        size: 1 + Math.random() * 3,
        color: ["blue", "purple", "cyan"][Math.floor(Math.random() * 3)] as "blue" | "purple" | "cyan",
        delay: Math.random() * 6,
        duration: 20 + Math.random() * 15,
        offsetX: 0,
        offsetY: 0,
        element: null,
      });
    }
  }

  private createSparkleHTML(size: number, color: "blue" | "purple" | "cyan"): string {
    const colors = colorMap[color];
    return `
      <div style="position:relative;width:${size}px;height:${size}px">
        <div style="position:absolute;inset:0;background:radial-gradient(circle,${colors.main} 0%,transparent 70%);filter:blur(${size * 0.15}px);opacity:0.6"></div>
        <div style="position:absolute;left:50%;top:0;width:2px;height:100%;background:linear-gradient(to bottom,transparent,${colors.main},white,${colors.main},transparent);transform:translateX(-50%);box-shadow:${colors.shadow}"></div>
        <div style="position:absolute;top:50%;left:0;height:2px;width:100%;background:linear-gradient(to right,transparent,${colors.main},white,${colors.main},transparent);transform:translateY(-50%);box-shadow:${colors.shadow}"></div>
        <div style="position:absolute;left:50%;top:50%;width:${size * 0.2}px;height:${size * 0.2}px;background:white;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 10px white,${colors.shadow}"></div>
      </div>
    `;
  }

  private createOrbHTML(size: number, color: "blue" | "purple" | "cyan"): string {
    const colors = colorMap[color];
    const bg = size > 5 
      ? `radial-gradient(circle at 30% 30%, white, ${colors.main} 50%, ${colors.glow} 100%)`
      : colors.main;
    const shadow = size > 5 ? colors.shadow : `0 0 ${size * 2}px ${colors.glow}`;
    return `<div style="width:${size}px;height:${size}px;background:${bg};border-radius:50%;box-shadow:${shadow}"></div>`;
  }

  mount(container: HTMLDivElement) {
    this.container = container;
    container.innerHTML = "";

    this.stars.forEach((star) => {
      const el = document.createElement("div");
      el.style.cssText = `
        position: absolute;
        left: ${star.baseX}%;
        top: ${star.baseY}%;
        z-index: ${star.type === "sparkle" ? 2 : 1};
        will-change: transform;
        animation: star-float ${star.duration}s ease-in-out infinite;
        animation-delay: ${star.delay}s;
        pointer-events: none;
      `;
      el.innerHTML = star.type === "sparkle" 
        ? this.createSparkleHTML(star.size, star.color)
        : this.createOrbHTML(star.size, star.color);
      
      container.appendChild(el);
      star.element = el;
    });

    window.addEventListener("mousemove", this.handleMouseMove, { passive: true });
    window.addEventListener("touchmove", this.handleTouchMove, { passive: true });
    window.addEventListener("touchstart", this.handleTouchStart, { passive: true });
    window.addEventListener("touchend", this.handleTouchEnd, { passive: true });
    document.addEventListener("mouseleave", this.handleMouseLeave);

    this.running = true;
    this.animate();
  }

  unmount() {
    this.running = false;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("touchmove", this.handleTouchMove);
    window.removeEventListener("touchstart", this.handleTouchStart);
    window.removeEventListener("touchend", this.handleTouchEnd);
    document.removeEventListener("mouseleave", this.handleMouseLeave);

    this.stars.forEach((star) => {
      star.element = null;
      star.offsetX = 0;
      star.offsetY = 0;
    });

    if (this.container) {
      this.container.innerHTML = "";
      this.container = null;
    }
  }

  private handleMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  private handleTouchMove(e: TouchEvent) {
    if (e.touches.length > 0) {
      this.mouseX = e.touches[0].clientX;
      this.mouseY = e.touches[0].clientY;
    }
  }

  private handleTouchStart(e: TouchEvent) {
    if (e.touches.length > 0) {
      this.mouseX = e.touches[0].clientX;
      this.mouseY = e.touches[0].clientY;
    }
  }

  private handleTouchEnd() {
    this.mouseX = null;
    this.mouseY = null;
  }

  private handleMouseLeave() {
    this.mouseX = null;
    this.mouseY = null;
  }

  private animate() {
    if (!this.running || !this.container) return;

    const rect = this.container.getBoundingClientRect();

    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      if (!star.element) continue;

      const starScreenX = rect.left + (star.baseX / 100) * rect.width + star.offsetX;
      const starScreenY = rect.top + (star.baseY / 100) * rect.height + star.offsetY;

      let targetX = 0;
      let targetY = 0;

      if (this.mouseX !== null && this.mouseY !== null) {
        const dx = starScreenX - this.mouseX;
        const dy = starScreenY - this.mouseY;
        const distSq = dx * dx + dy * dy;
        const repelRadius = 80 + star.size * 1.5;
        const repelRadiusSq = repelRadius * repelRadius;

        if (distSq < repelRadiusSq && distSq > 0) {
          const distance = Math.sqrt(distSq);
          const force = Math.pow(1 - distance / repelRadius, 1.5) * (60 + star.size);
          targetX = (dx / distance) * force;
          targetY = (dy / distance) * force;
        }
      }

      const hasTarget = targetX !== 0 || targetY !== 0;
      const easing = hasTarget ? 0.12 : 0.03;

      star.offsetX += (targetX - star.offsetX) * easing;
      star.offsetY += (targetY - star.offsetY) * easing;

      star.element.style.transform = `translate(${star.offsetX}px, ${star.offsetY}px)`;
    }

    this.animationId = requestAnimationFrame(this.animate);
  }
}

export function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<StarFieldEngine | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    engineRef.current = new StarFieldEngine();
    engineRef.current.mount(containerRef.current);

    return () => {
      if (engineRef.current) {
        engineRef.current.unmount();
        engineRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden" />;
}
