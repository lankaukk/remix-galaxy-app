import { useState, useRef, useEffect } from "react";

interface DraggableStickerProps {
  src: string;
  alt: string;
  initialX: number;
  initialY: number;
  initialRotation: number;
  size?: number;
}

export function DraggableSticker({
  src,
  alt,
  initialX,
  initialY,
  initialRotation,
  size = 120,
}: DraggableStickerProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const stickerRef = useRef<HTMLDivElement>(null);

  const handleStart = (clientX: number, clientY: number) => {
    if (stickerRef.current) {
      const rect = stickerRef.current.getBoundingClientRect();
      setDragOffset({
        x: clientX - rect.left,
        y: clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (isDragging) {
        setPosition({
          x: clientX - dragOffset.x,
          y: clientY - dragOffset.y,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleEnd);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleEnd);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleEnd);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={stickerRef}
      data-testid={`sticker-${alt}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size}px`,
        height: `${size}px`,
        cursor: isDragging ? "grabbing" : "grab",
        transform: `rotate(${initialRotation}deg)`,
        zIndex: isDragging ? 1000 : 100,
        userSelect: "none",
        touchAction: "none",
      }}
      className="transition-transform hover:scale-110"
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="w-full h-full object-contain pointer-events-none"
        style={{
          filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
        }}
      />
    </div>
  );
}
