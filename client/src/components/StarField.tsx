import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/use-theme";

interface Star {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: "sparkle" | "orb";
}

const THEME_COLORS = {
  light: {
    blue: "#005DFF",
    purple: "#A900BC",
    cyan: "#00E2E6",
  },
  dark: {
    blue: "#D1BCFF",
    purple: "#A6D2FF",
    cyan: "#82F7FF",
  },
  sunset: {
    blue: "#E20070",
    purple: "#FD3870",
    cyan: "#EAC300",
  },
};

export function StarField() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create stars
    const colors = ["blue", "purple", "cyan"] as const;
    const stars: Star[] = [];

    // Large sparkle stars
    const sparklePositions = [
      { x: 35, y: 40, size: 120, color: "blue" },
      { x: 75, y: 25, size: 110, color: "cyan" },
      { x: 50, y: 50, size: 85, color: "blue" },
      { x: 20, y: 30, size: 75, color: "cyan" },
      { x: 80, y: 70, size: 70, color: "purple" },
      { x: 15, y: 45, size: 45, color: "blue" },
      { x: 25, y: 75, size: 35, color: "blue" },
      { x: 70, y: 85, size: 30, color: "cyan" },
      { x: 85, y: 60, size: 28, color: "blue" },
      { x: 30, y: 20, size: 30, color: "purple" },
      { x: 75, y: 25, size: 38, color: "cyan" },
      { x: 8, y: 80, size: 32, color: "purple" },
      { x: 92, y: 15, size: 28, color: "blue" },
      { x: 60, y: 10, size: 25, color: "cyan" },
      { x: 40, y: 35, size: 22, color: "purple" },
      { x: 18, y: 60, size: 26, color: "blue" },
    ];

    sparklePositions.forEach((s) => {
      stars.push({
        baseX: (s.x / 100) * canvas.width,
        baseY: (s.y / 100) * canvas.height,
        x: (s.x / 100) * canvas.width,
        y: (s.y / 100) * canvas.height,
        vx: 0,
        vy: 0,
        size: s.size,
        color: s.color,
        type: "sparkle",
      });
    });

    // Medium orbs
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      stars.push({
        baseX: x,
        baseY: y,
        x,
        y,
        vx: 0,
        vy: 0,
        size: 8 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * 3)],
        type: "orb",
      });
    }

    // Tiny background stars
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      stars.push({
        baseX: x,
        baseY: y,
        x,
        y,
        vx: 0,
        vy: 0,
        size: 1 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * 3)],
        type: "orb",
      });
    }

    starsRef.current = stars;

    // Mouse handlers
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = () => {
      mouseRef.current = { x: null, y: null };
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    // Animation loop
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const star of stars) {
        // Calculate target position (with repel effect)
        let targetX = star.baseX;
        let targetY = star.baseY;

        if (mx !== null && my !== null) {
          const dx = star.baseX - mx;
          const dy = star.baseY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 150 + star.size * 4;

          if (dist < radius && dist > 0) {
            const force =
              Math.pow(1 - dist / radius, 1.5) * (60 + star.size * 3);
            targetX = star.baseX + (dx / dist) * force;
            targetY = star.baseY + (dy / dist) * force;
          }
        }

        // Spring physics
        const springStrength = 6;
        const damping = 0.6;

        const ax = (targetX - star.x) * springStrength;
        const ay = (targetY - star.y) * springStrength;

        star.vx = (star.vx + ax * deltaTime) * damping;
        star.vy = (star.vy + ay * deltaTime) * damping;

        star.x += star.vx;
        star.y += star.vy;

        // Draw star
        const colors = THEME_COLORS[theme];
        const colorHex = colors[star.color as keyof typeof colors];

        if (star.type === "sparkle") {
          // Draw sparkle (cross shape with glow)
          ctx.save();
          ctx.translate(star.x, star.y);

          // Glow
          ctx.shadowColor = colorHex;
          ctx.shadowBlur = star.size * 0.5;

          const lineLength = star.size * 0.7;

          // Vertical line - two halves, each fading outward from center
          const vertGradientTop = ctx.createLinearGradient(0, 0, 0, -lineLength);
          vertGradientTop.addColorStop(0, colorHex);
          vertGradientTop.addColorStop(0.3, colorHex);
          vertGradientTop.addColorStop(0.6, colorHex + "80");
          vertGradientTop.addColorStop(0.85, colorHex + "20");
          vertGradientTop.addColorStop(1, colorHex + "00");

          const vertGradientBottom = ctx.createLinearGradient(0, 0, 0, lineLength);
          vertGradientBottom.addColorStop(0, colorHex);
          vertGradientBottom.addColorStop(0.3, colorHex);
          vertGradientBottom.addColorStop(0.6, colorHex + "80");
          vertGradientBottom.addColorStop(0.85, colorHex + "20");
          vertGradientBottom.addColorStop(1, colorHex + "00");

          ctx.lineWidth = 2;

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -lineLength);
          ctx.strokeStyle = vertGradientTop;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, lineLength);
          ctx.strokeStyle = vertGradientBottom;
          ctx.stroke();

          // Horizontal line - two halves, each fading outward from center
          const horizGradientLeft = ctx.createLinearGradient(0, 0, -lineLength, 0);
          horizGradientLeft.addColorStop(0, colorHex);
          horizGradientLeft.addColorStop(0.3, colorHex);
          horizGradientLeft.addColorStop(0.6, colorHex + "80");
          horizGradientLeft.addColorStop(0.85, colorHex + "20");
          horizGradientLeft.addColorStop(1, colorHex + "00");

          const horizGradientRight = ctx.createLinearGradient(0, 0, lineLength, 0);
          horizGradientRight.addColorStop(0, colorHex);
          horizGradientRight.addColorStop(0.3, colorHex);
          horizGradientRight.addColorStop(0.6, colorHex + "80");
          horizGradientRight.addColorStop(0.85, colorHex + "20");
          horizGradientRight.addColorStop(1, colorHex + "00");

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-lineLength, 0);
          ctx.strokeStyle = horizGradientLeft;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(lineLength, 0);
          ctx.strokeStyle = horizGradientRight;
          ctx.stroke();

          // Center dot with faded edge - disable shadow so it blends with lines
          ctx.shadowBlur = 0;
          const dotRadius = star.size * 0.12;
          const dotGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, dotRadius);
          dotGradient.addColorStop(0, colorHex);
          dotGradient.addColorStop(0.25, colorHex);
          dotGradient.addColorStop(1, colorHex + "00");

          ctx.beginPath();
          ctx.arc(0, 0, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = dotGradient;
          ctx.fill();

          ctx.restore();
        } else {
          // Draw orb - skip glow on tiny stars for performance
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
          ctx.fillStyle = colorHex;
          if (star.size > 4) {
            ctx.shadowColor = colorHex;
            ctx.shadowBlur = star.size * 2;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
