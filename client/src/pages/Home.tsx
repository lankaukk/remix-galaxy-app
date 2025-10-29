import { useState, useEffect } from "react";
import { DraggableSticker } from "@/components/DraggableSticker";
import butternutSquash from "../assets/stickers/butternut-squash.png";
import footEmoji from "../assets/stickers/foot-emoji.png";
import heheEmoji from "../assets/stickers/hehe-emoji.png";
import hourGlass from "../assets/stickers/hour-glass.png";
import liveLaughLove from "../assets/stickers/live-laugh-love-emoji.png";
import magician from "../assets/stickers/magician.png";
import pillowsGrey from "../assets/stickers/pillows-grey.png";
import pillowsPink from "../assets/stickers/pillows-pink.png";
import saraFem from "../assets/stickers/sara-fem.png";
import selfie2024 from "../assets/stickers/selfie-sticker-2024.png";
import selfie2025 from "../assets/stickers/selfie-sticker-2025.png";
import string from "../assets/stickers/string.png";

const stickerConfig = [
  { src: butternutSquash, alt: "butternut-squash", xPercent: 0.08, yPercent: 0.2, rotation: -12, size: 100 },
  { src: footEmoji, alt: "foot-emoji", xPercent: 0.35, yPercent: 0.15, rotation: -5, size: 90 },
  { src: heheEmoji, alt: "hehe-emoji", xPercent: 0.55, yPercent: 0.35, rotation: 15, size: 95 },
  { src: hourGlass, alt: "hour-glass", xPercent: 0.12, yPercent: 0.5, rotation: -8, size: 85 },
  { src: liveLaughLove, alt: "live-laugh-love", xPercent: 0.75, yPercent: 0.2, rotation: 10, size: 105 },
  { src: magician, alt: "magician", xPercent: 0.3, yPercent: 0.58, rotation: -15, size: 100 },
  { src: pillowsGrey, alt: "pillows-grey", xPercent: 0.48, yPercent: 0.45, rotation: 5, size: 90 },
  { src: pillowsPink, alt: "pillows-pink", xPercent: 0.65, yPercent: 0.52, rotation: -10, size: 95 },
  { src: saraFem, alt: "sara-fem", xPercent: 0.15, yPercent: 0.7, rotation: 12, size: 110 },
  { src: selfie2024, alt: "selfie-2024", xPercent: 0.82, yPercent: 0.4, rotation: -7, size: 100 },
  { src: selfie2025, alt: "selfie-2025", xPercent: 0.38, yPercent: 0.75, rotation: 8, size: 105 },
  { src: string, alt: "string", xPercent: 0.62, yPercent: 0.68, rotation: -12, size: 85 },
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
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
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
