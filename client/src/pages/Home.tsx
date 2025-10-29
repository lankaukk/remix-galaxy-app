import { DraggableSticker } from "@/components/DraggableSticker";
import butternutSquash from "@assets/stickers/butternut-squash.png";
import footEmoji from "@assets/stickers/foot-emoji.png";
import heheEmoji from "@assets/stickers/hehe-emoji.png";
import hourGlass from "@assets/stickers/hour-glass.png";
import liveLaughLove from "@assets/stickers/live-laugh-love-emoji.png";
import magician from "@assets/stickers/magician.png";
import pillowsGrey from "@assets/stickers/pillows-grey.png";
import pillowsPink from "@assets/stickers/pillows-pink.png";
import saraFem from "@assets/stickers/sara-fem.png";
import selfie2024 from "@assets/stickers/selfie-sticker-2024.png";
import selfie2025 from "@assets/stickers/selfie-sticker-2025.png";
import string from "@assets/stickers/string.png";

const stickers = [
  {
    src: butternutSquash,
    alt: "butternut-squash",
    x: 100,
    y: 150,
    rotation: -12,
    size: 100,
  },
  { src: footEmoji, alt: "foot-emoji", x: 500, y: 100, rotation: -5, size: 90 },
  { src: heheEmoji, alt: "hehe-emoji", x: 700, y: 250, rotation: 15, size: 95 },
  { src: hourGlass, alt: "hour-glass", x: 150, y: 400, rotation: -8, size: 85 },
  {
    src: liveLaughLove,
    alt: "live-laugh-love",
    x: 900,
    y: 150,
    rotation: 10,
    size: 105,
  },
  { src: magician, alt: "magician", x: 400, y: 450, rotation: -15, size: 100 },
  {
    src: pillowsGrey,
    alt: "pillows-grey",
    x: 600,
    y: 350,
    rotation: 5,
    size: 90,
  },
  {
    src: pillowsPink,
    alt: "pillows-pink",
    x: 800,
    y: 400,
    rotation: -10,
    size: 95,
  },
  { src: saraFem, alt: "sara-fem", x: 200, y: 550, rotation: 12, size: 110 },
  {
    src: selfie2024,
    alt: "selfie-2024",
    x: 1000,
    y: 300,
    rotation: -7,
    size: 100,
  },
  {
    src: selfie2025,
    alt: "selfie-2025",
    x: 450,
    y: 600,
    rotation: 8,
    size: 105,
  },
  { src: string, alt: "string", x: 750, y: 550, rotation: -12, size: 85 },
];

export default function Home() {
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
