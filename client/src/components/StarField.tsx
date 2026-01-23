import { useState } from "react";

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

const stars: Star[] = [
  { id: 1, type: "sparkle", x: 15, y: 45, size: 60, color: "blue", delay: 0, duration: 4 },
  { id: 2, type: "sparkle", x: 25, y: 75, size: 50, color: "blue", delay: 0.5, duration: 3.5 },
  { id: 3, type: "sparkle", x: 70, y: 85, size: 45, color: "cyan", delay: 1, duration: 4.5 },
  { id: 4, type: "sparkle", x: 85, y: 60, size: 35, color: "blue", delay: 1.5, duration: 3.8 },
  { id: 5, type: "sparkle", x: 50, y: 50, size: 80, color: "blue", delay: 0.3, duration: 5 },
  { id: 6, type: "sparkle", x: 30, y: 20, size: 40, color: "purple", delay: 0.8, duration: 4.2 },
  { id: 7, type: "sparkle", x: 75, y: 25, size: 55, color: "cyan", delay: 1.2, duration: 3.6 },
  
  { id: 8, type: "orb", x: 10, y: 15, size: 20, color: "purple", delay: 0, duration: 3 },
  { id: 9, type: "orb", x: 20, y: 55, size: 15, color: "purple", delay: 0.4, duration: 3.5 },
  { id: 10, type: "orb", x: 35, y: 10, size: 25, color: "purple", delay: 0.8, duration: 4 },
  { id: 11, type: "orb", x: 45, y: 30, size: 12, color: "blue", delay: 1.2, duration: 3.2 },
  { id: 12, type: "orb", x: 55, y: 15, size: 18, color: "purple", delay: 0.2, duration: 3.8 },
  { id: 13, type: "orb", x: 65, y: 40, size: 22, color: "cyan", delay: 0.6, duration: 4.2 },
  { id: 14, type: "orb", x: 80, y: 12, size: 16, color: "purple", delay: 1, duration: 3.4 },
  { id: 15, type: "orb", x: 90, y: 35, size: 14, color: "purple", delay: 1.4, duration: 3.6 },
  { id: 16, type: "orb", x: 5, y: 70, size: 20, color: "cyan", delay: 0.3, duration: 4 },
  { id: 17, type: "orb", x: 40, y: 65, size: 12, color: "purple", delay: 0.7, duration: 3.3 },
  { id: 18, type: "orb", x: 60, y: 70, size: 18, color: "blue", delay: 1.1, duration: 3.7 },
  { id: 19, type: "orb", x: 78, y: 80, size: 15, color: "purple", delay: 0.5, duration: 4.1 },
  { id: 20, type: "orb", x: 92, y: 75, size: 22, color: "purple", delay: 0.9, duration: 3.9 },
  { id: 21, type: "orb", x: 12, y: 88, size: 10, color: "cyan", delay: 1.3, duration: 3.1 },
  { id: 22, type: "orb", x: 55, y: 88, size: 16, color: "purple", delay: 0.1, duration: 4.3 },
  { id: 23, type: "orb", x: 88, y: 50, size: 14, color: "blue", delay: 0.6, duration: 3.5 },
  { id: 24, type: "orb", x: 8, y: 40, size: 18, color: "purple", delay: 1.5, duration: 4.5 },
  { id: 25, type: "orb", x: 48, y: 8, size: 12, color: "cyan", delay: 0.4, duration: 3.8 },
];

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

function SparkleIcon({ size, color, isPressed }: { size: number; color: "blue" | "purple" | "cyan"; isPressed: boolean }) {
  const colors = colorMap[color];
  const scale = isPressed ? 1.3 : 1;
  
  return (
    <div
      className="relative transition-transform duration-300 ease-out"
      style={{
        width: size,
        height: size,
        transform: `scale(${scale})`,
      }}
    >
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

function OrbIcon({ size, color, isPressed }: { size: number; color: "blue" | "purple" | "cyan"; isPressed: boolean }) {
  const colors = colorMap[color];
  const scale = isPressed ? 1.4 : 1;
  
  return (
    <div
      className="rounded-full transition-transform duration-300 ease-out"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, white, ${colors.main} 50%, ${colors.glow} 100%)`,
        boxShadow: colors.shadow,
        transform: `scale(${scale})`,
      }}
    />
  );
}

function StarComponent({ star }: { star: Star }) {
  const [isPressed, setIsPressed] = useState(false);

  const handleInteractionStart = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 300);
  };

  return (
    <div
      className="absolute cursor-pointer select-none"
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
        animation: `float ${star.duration}s ease-in-out infinite`,
        animationDelay: `${star.delay}s`,
        zIndex: star.type === "sparkle" ? 2 : 1,
      }}
      onMouseEnter={handleInteractionStart}
      onTouchStart={handleInteractionStart}
    >
      {star.type === "sparkle" ? (
        <SparkleIcon size={star.size} color={star.color} isPressed={isPressed} />
      ) : (
        <OrbIcon size={star.size} color={star.color} isPressed={isPressed} />
      )}
    </div>
  );
}

export function StarField() {
  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-8px) translateX(4px);
          }
          50% {
            transform: translateY(-4px) translateX(-4px);
          }
          75% {
            transform: translateY(-12px) translateX(2px);
          }
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div key={star.id} className="pointer-events-auto">
            <StarComponent star={star} />
          </div>
        ))}
      </div>
    </>
  );
}
