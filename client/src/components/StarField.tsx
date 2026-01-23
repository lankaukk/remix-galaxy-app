import { useState, useEffect, useRef, useCallback } from "react";

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
      id: id++,
      type: "sparkle",
      ...s,
      delay: Math.random() * 3,
      duration: 15 + Math.random() * 10,
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
    stars.push({
      id: id++,
      type: "orb",
      ...s,
      delay: Math.random() * 4,
      duration: 18 + Math.random() * 12,
    });
  });

  for (let i = 0; i < 400; i++) {
    stars.push({
      id: id++,
      type: "orb",
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      color: ["blue", "purple", "cyan"][Math.floor(Math.random() * 3)] as "blue" | "purple" | "cyan",
      delay: Math.random() * 6,
      duration: 20 + Math.random() * 15,
    });
  }

  return stars;
};

const starsData = generateStars();

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
        background: size > 5 
          ? `radial-gradient(circle at 30% 30%, white, ${colors.main} 50%, ${colors.glow} 100%)`
          : colors.main,
        boxShadow: size > 5 ? colors.shadow : `0 0 ${size * 2}px ${colors.glow}`,
      }}
    />
  );
}

interface StarOffset {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

export function StarField() {
  const [offsets, setOffsets] = useState<Map<number, StarOffset>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);

  const updateStarPositions = useCallback(() => {
    if (!containerRef.current) {
      animationRef.current = requestAnimationFrame(updateStarPositions);
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const mousePos = mousePosRef.current;

    setOffsets((prev) => {
      const newOffsets = new Map<number, StarOffset>();
      
      starsData.forEach((star) => {
        const starX = rect.left + (star.x / 100) * rect.width;
        const starY = rect.top + (star.y / 100) * rect.height;
        
        const currentOffset = prev.get(star.id) || { x: 0, y: 0, targetX: 0, targetY: 0 };
        
        let targetX = 0;
        let targetY = 0;
        
        if (mousePos) {
          const dx = starX - mousePos.x;
          const dy = starY - mousePos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const repelRadius = 100 + star.size * 2;
          
          if (distance < repelRadius && distance > 0) {
            const force = (1 - distance / repelRadius) * (50 + star.size * 0.8);
            targetX = (dx / distance) * force;
            targetY = (dy / distance) * force;
          }
        }
        
        const easingToTarget = 0.15;
        const easingBack = 0.04;
        
        const isMovingToTarget = Math.abs(targetX) > 0.1 || Math.abs(targetY) > 0.1;
        const easing = isMovingToTarget ? easingToTarget : easingBack;
        
        const newX = currentOffset.x + (targetX - currentOffset.x) * easing;
        const newY = currentOffset.y + (targetY - currentOffset.y) * easing;
        
        if (Math.abs(newX) > 0.05 || Math.abs(newY) > 0.05) {
          newOffsets.set(star.id, { x: newX, y: newY, targetX, targetY });
        }
      });
      
      return newOffsets;
    });

    animationRef.current = requestAnimationFrame(updateStarPositions);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      mousePosRef.current = null;
    };

    const handleMouseLeave = () => {
      mousePosRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("mouseleave", handleMouseLeave);

    animationRef.current = requestAnimationFrame(updateStarPositions);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateStarPositions]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {starsData.map((star) => {
        const offset = offsets.get(star.id);
        const translateX = offset ? offset.x : 0;
        const translateY = offset ? offset.y : 0;
        
        return (
          <div
            key={star.id}
            className="absolute star-wrapper"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              transform: `translate(${translateX}px, ${translateY}px)`,
              animation: `star-float ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
              zIndex: star.type === "sparkle" ? 2 : 1,
            }}
          >
            {star.type === "sparkle" ? (
              <SparkleIcon size={star.size} color={star.color} />
            ) : (
              <OrbIcon size={star.size} color={star.color} />
            )}
          </div>
        );
      })}
    </div>
  );
}
