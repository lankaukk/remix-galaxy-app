import { useEffect, useState, useMemo, memo } from "react";
import { motion, useSpring } from "framer-motion";

interface StarData {
  id: number;
  baseX: number;
  baseY: number;
  size: number;
  color: "blue" | "purple" | "cyan";
  type: "sparkle" | "orb";
  floatDuration: number;
  floatDelay: number;
}

const colorMap = {
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

function generateStarsData(): StarData[] {
  const stars: StarData[] = [];
  const colors: ("blue" | "purple" | "cyan")[] = ["blue", "purple", "cyan"];
  let id = 0;

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
    stars.push({
      id: id++, baseX: s.x, baseY: s.y, size: s.size, color: s.color, type: "sparkle",
      floatDuration: 15 + Math.random() * 10, floatDelay: Math.random() * 3,
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
      id: id++, baseX: s.x, baseY: s.y, size: s.size, color: colors[Math.floor(Math.random() * 3)], type: "orb",
      floatDuration: 18 + Math.random() * 12, floatDelay: Math.random() * 4,
    });
  });

  for (let i = 0; i < 400; i++) {
    stars.push({
      id: id++, baseX: Math.random() * 100, baseY: Math.random() * 100,
      size: 1 + Math.random() * 3, color: colors[Math.floor(Math.random() * 3)], type: "orb",
      floatDuration: 20 + Math.random() * 15, floatDelay: Math.random() * 6,
    });
  }

  return stars;
}

function Sparkle({ size, color }: { size: number; color: "blue" | "purple" | "cyan" }) {
  const c = colorMap[color];
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle, ${c.main} 0%, transparent 70%)`, filter: `blur(${size * 0.15}px)`, opacity: 0.6 }} />
      <div style={{ position: "absolute", left: "50%", top: 0, width: 2, height: "100%", background: `linear-gradient(to bottom, transparent, ${c.main}, white, ${c.main}, transparent)`, transform: "translateX(-50%)", boxShadow: c.shadow }} />
      <div style={{ position: "absolute", top: "50%", left: 0, height: 2, width: "100%", background: `linear-gradient(to right, transparent, ${c.main}, white, ${c.main}, transparent)`, transform: "translateY(-50%)", boxShadow: c.shadow }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: size * 0.2, height: size * 0.2, background: "white", borderRadius: "50%", transform: "translate(-50%, -50%)", boxShadow: `0 0 10px white, ${c.shadow}` }} />
    </div>
  );
}

function Orb({ size, color }: { size: number; color: "blue" | "purple" | "cyan" }) {
  const c = colorMap[color];
  const bg = size > 5 ? `radial-gradient(circle at 30% 30%, white, ${c.main} 50%, ${c.glow} 100%)` : c.main;
  const shadow = size > 5 ? c.shadow : `0 0 ${size * 2}px ${c.glow}`;
  return <div style={{ width: size, height: size, background: bg, borderRadius: "50%", boxShadow: shadow }} />;
}

const Star = memo(function Star({ star, mouseX, mouseY }: { star: StarData; mouseX: number | null; mouseY: number | null }) {
  const springX = useSpring(0, { damping: 20, stiffness: 80 });
  const springY = useSpring(0, { damping: 20, stiffness: 80 });

  useEffect(() => {
    if (mouseX === null || mouseY === null) {
      springX.set(0);
      springY.set(0);
      return;
    }

    const baseScreenX = (star.baseX / 100) * window.innerWidth;
    const baseScreenY = (star.baseY / 100) * window.innerHeight;

    const dx = baseScreenX - mouseX;
    const dy = baseScreenY - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = 120 + star.size * 2;

    if (dist < radius && dist > 0) {
      const force = Math.pow(1 - dist / radius, 1.2) * (100 + star.size * 2);
      springX.set((dx / dist) * force);
      springY.set((dy / dist) * force);
    } else {
      springX.set(0);
      springY.set(0);
    }
  }, [mouseX, mouseY, star.baseX, star.baseY, star.size, springX, springY]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${star.baseX}%`,
        top: `${star.baseY}%`,
        x: springX,
        y: springY,
        zIndex: star.type === "sparkle" ? 2 : 1,
        pointerEvents: "none",
        animation: `star-float ${star.floatDuration}s ease-in-out infinite`,
        animationDelay: `${star.floatDelay}s`,
      }}
    >
      {star.type === "sparkle" ? <Sparkle size={star.size} color={star.color} /> : <Orb size={star.size} color={star.color} />}
    </motion.div>
  );
});

export function StarField() {
  const [mousePos, setMousePos] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const stars = useMemo(() => generateStarsData(), []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const onTouchMove = (e: TouchEvent) => { if (e.touches[0]) setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY }); };
    const onTouchStart = (e: TouchEvent) => { if (e.touches[0]) setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY }); };
    const onEnd = () => setMousePos({ x: null, y: null });

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    document.addEventListener("mouseleave", onEnd);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onEnd);
      document.removeEventListener("mouseleave", onEnd);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <Star key={star.id} star={star} mouseX={mousePos.x} mouseY={mousePos.y} />
      ))}
    </div>
  );
}
