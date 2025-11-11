import { useState, useEffect } from "react";
import { DraggableSticker } from "@/components/DraggableSticker";
import butternutSquash from "../assets/stickers/butternut-squash.png";
import footEmoji from "../assets/stickers/foot-emoji.png";
import heheEmoji from "../assets/stickers/hehe-emoji.png";
import hourGlass from "../assets/stickers/hour-glass.png";
import liveLaughLove from "../assets/stickers/live-laugh-love-emoji.png";
import magician from "../assets/stickers/magician.png";
import pillowsPink from "../assets/stickers/pillows-pink.png";
import selfie2024 from "../assets/stickers/selfie-sticker-2024.png";
import selfie2025 from "../assets/stickers/selfie-sticker-2025.png";
import string from "../assets/stickers/string.png";

const stickerConfig = [
  {
    src: footEmoji,
    alt: "foot-emoji",
    xPercent: 0.05,
    yPercent: 0.3,
    rotation: -5,
    size: 80,
  },
  {
    src: heheEmoji,
    alt: "hehe-emoji",
    xPercent: 0.1,
    yPercent: 0.15,
    rotation: 15,
    size: 95,
  },
  {
    src: hourGlass,
    alt: "hour-glass",
    xPercent: 0.39,
    yPercent: 0.14,
    rotation: -8,
    size: 235,
  },
  {
    src: liveLaughLove,
    alt: "live-laugh-love",
    xPercent: 0.8,
    yPercent: 0.17,
    rotation: 10,
    size: 105,
  },
  {
    src: magician,
    alt: "magician",
    xPercent: 0.6,
    yPercent: 0.28,
    rotation: -30,
    size: 220,
  },

  {
    src: pillowsPink,
    alt: "pillows-pink",
    xPercent: 0.05,
    yPercent: 0.6,
    rotation: -26,
    size: 275,
  },
  {
    src: butternutSquash,
    alt: "butternut-squash",
    xPercent: 0.15,
    yPercent: 0.8,
    rotation: -12,
    size: 100,
  },
  {
    src: selfie2024,
    alt: "selfie-2024",
    xPercent: 0.7,
    yPercent: 0.7,
    rotation: -15,
    size: 180,
  },
  {
    src: selfie2025,
    alt: "selfie-2025",
    xPercent: 0.14,
    yPercent: 0.25,
    rotation: 8,
    size: 300,
  },
  {
    src: string,
    alt: "string",
    xPercent: 0.43,
    yPercent: 0.57,
    rotation: -45,
    size: 285,
  },
];

export default function Home() {
  const [stickers, setStickers] = useState(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return stickerConfig.map((config) => ({
      ...config,
      x: vw * config.xPercent,
      y: vh * config.yPercent,
    }));
  });

  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setStickers(
        stickerConfig.map((config) => ({
          ...config,
          x: vw * config.xPercent,
          y: vh * config.yPercent,
        })),
      );
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-background text-foreground pb-16 md:pb-0">
      {stickers.map((sticker, index) => (
        <DraggableSticker
          key={index}
          src={sticker.src}
          alt={sticker.alt}
          initialX={sticker.x}
          initialY={sticker.y}
          initialRotation={sticker.rotation}
          size={sticker.size}
        />
      ))}
    </div>
  );
}
