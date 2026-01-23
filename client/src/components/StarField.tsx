import { useState, useCallback, useEffect, useRef } from "react";

interface Star {
  id: number;
  type: "sparkle" | "orb";
  x: number;
  y: number;
  size: number;
  color: "blue" | "purple" | "cyan";
  delay: number;
  duration: number;
}

const generateStars = (): Star[] => {
  const stars: Star[] = [];
  let id = 1;

  const sparkles = [
    { x: 15, y: 45, size: 50, color: "blue" as const },
    { x: 25, y: 75, size: 40, color: "blue" as const },
    { x: 70, y: 85, size: 35, color: "cyan" as const },
    { x: 85, y: 60, size: 30, color: "blue" as const },
    { x: 50, y: 50, size: 65, color: "blue" as const },
    { x: 30, y: 20, size: 35, color: "purple" as const },
    { x: 75, y: 25, size: 45, color: "cyan" as const },
    { x: 8, y: 80, size: 38, color: "purple" as const },
    { x: 92, y: 15, size: 32, color: "blue" as const },
    { x: 60, y: 10, size: 28, color: "cyan" as const },
  ];

  sparkles.forEach((s) => {
    stars.push({
      id: id++,
      type: "sparkle",
      ...s,
      delay: Math.random() * 3,
      duration: 8 + Math.random() * 6,
    });
  });

  const mediumOrbs = [
    { x: 10, y: 15, size: 18, color: "purple" as const },
    { x: 20, y: 55, size: 14, color: "purple" as const },
    { x: 35, y: 10, size: 20, color: "purple" as const },
    { x: 45, y: 30, size: 12, color: "blue" as const },
    { x: 55, y: 15, size: 16, color: "purple" as const },
    { x: 65, y: 40, size: 18, color: "cyan" as const },
    { x: 80, y: 12, size: 14, color: "purple" as const },
    { x: 90, y: 35, size: 12, color: "purple" as const },
    { x: 5, y: 70, size: 16, color: "cyan" as const },
    { x: 40, y: 65, size: 10, color: "purple" as const },
    { x: 60, y: 70, size: 14, color: "blue" as const },
    { x: 78, y: 80, size: 12, color: "purple" as const },
    { x: 92, y: 75, size: 18, color: "purple" as const },
    { x: 12, y: 88, size: 10, color: "cyan" as const },
    { x: 55, y: 88, size: 14, color: "purple" as const },
    { x: 88, y: 50, size: 12, color: "blue" as const },
    { x: 8, y: 40, size: 15, color: "purple" as const },
    { x: 48, y: 8, size: 11, color: "cyan" as const },
  ];

  mediumOrbs.forEach((s) => {
    stars.push({
      id: id++,
      type: "orb",
      ...s,
      delay: Math.random() * 4,
      duration: 10 + Math.random() * 8,
    });
  });

  for (let i = 0; i < 80; i++) {
    stars.push({
      id: id++,
      type: "orb",
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 5,
      color: ["blue", "purple", "cyan"][Math.floor(Math.random() * 3)] as "blue" | "purple" | "cyan",
      delay: Math.random() * 5,
      duration: 12 + Math.random() * 10,
    });
  }

  return stars;
};

const stars = generateStars();

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

function SparkleIcon({ size, color }: { size: number; color: "blue" | "purple" | "cyan" }) {
  const colors = colorMap[color];
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle, ${colors.main} 0%, transparent 70%)`,
          filter: `blur(${size * 0.15}px)`,
          opacity: 0.6,
        }}
      />
      <div
        className="absolute"
        style={{
          left: "50%",
          top: 0,
          width: 2,
          height: "100%",
          background: `linear-gradient(to bottom, transparent, ${colors.main}, white, ${colors.main}, transparent)`,
          transform: "translateX(-50%)",
          boxShadow: colors.shadow,
        }}
      />
      <div
        className="absolute"
        style={{
          top: "50%",
          left: 0,
          height: 2,
          width: "100%",
          background: `linear-gradient(to right, transparent, ${colors.main}, white, ${colors.main}, transparent)`,
          transform: "translateY(-50%)",
          boxShadow: colors.shadow,
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          left: "50%",
          top: "50%",
          width: size * 0.2,
          height: size * 0.2,
          background: "white",
          transform: "translate(-50%, -50%)",
          boxShadow: `0 0 10px white, ${colors.shadow}`,
        }}
      />
    </div>
  );
}

function OrbIcon({ size, color }: { size: number; color: "blue" | "purple" | "cyan" }) {
  const colors = colorMap[color];
  
  return (
    <div
      className="rounded-full"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, white, ${colors.main} 50%, ${colors.glow} 100%)`,
        boxShadow: size > 8 ? colors.shadow : `0 0 ${size}px ${colors.glow}`,
      }}
    />
  );
}

function StarComponent({ star, mousePos }: { star: Star; mousePos: { x: number; y: number } | null }) {
  const [isGooey, setIsGooey] = useState(false);
  const starRef = useRef<HTMLDivElement>(null);
  const lastTriggerTime = useRef(0);

  useEffect(() => {
    if (!mousePos || !starRef.current) return;
    
    const rect = starRef.current.getBoundingClientRect();
    const starCenterX = rect.left + rect.width / 2;
    const starCenterY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(mousePos.x - starCenterX, 2) + 
      Math.pow(mousePos.y - starCenterY, 2)
    );
    
    const proximityThreshold = 80 + star.size;
    const now = Date.now();
    
    if (distance < proximityThreshold && now - lastTriggerTime.current > 800) {
      lastTriggerTime.current = now;
      setIsGooey(true);
      setTimeout(() => setIsGooey(false), 800);
    }
  }, [mousePos, star.size]);

  const handleDirectInteraction = useCallback(() => {
    const now = Date.now();
    if (now - lastTriggerTime.current > 800) {
      lastTriggerTime.current = now;
      setIsGooey(true);
      setTimeout(() => setIsGooey(false), 800);
    }
  }, []);

  return (
    <div
      ref={starRef}
      className="absolute cursor-pointer select-none star-wrapper"
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
        animation: `star-float ${star.duration}s ease-in-out infinite`,
        animationDelay: `${star.delay}s`,
        zIndex: star.type === "sparkle" ? 2 : 1,
      }}
      onPointerDown={handleDirectInteraction}
      onTouchStart={handleDirectInteraction}
    >
      <div className={isGooey ? "star-gooey" : ""}>
        {star.type === "sparkle" ? (
          <SparkleIcon size={star.size} color={star.color} />
        ) : (
          <OrbIcon size={star.size} color={star.color} />
        )}
      </div>
    </div>
  );
}

export function StarField() {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchstart", handleTouchStart);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <StarComponent key={star.id} star={star} mousePos={mousePos} />
      ))}
    </div>
  );
}
