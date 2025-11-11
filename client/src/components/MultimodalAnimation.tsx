import AvatarImage from "@/assets/images/sidekick-avatar.png";

type MultimodalAnimationProps = {
  scale?: number;
};

export default function MultimodalAnimation({ scale = 1 }: MultimodalAnimationProps) {
  const animationName = `sidekickGrowingCircle-${scale}`;
  const borderAnimationName = `sidekickGrowingBorder-${scale}`;
  
  return (
    <div
      className="relative w-full aspect-video rounded-lg shadow-xl flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#E3E4E5" }}
    >
      <div className="sidekick-circle circle-1"></div>
      <div className="sidekick-circle circle-2"></div>
      <div className="sidekick-circle circle-3"></div>
      <img
        src={AvatarImage}
        alt="Sidekick Avatar"
        className="relative z-10 w-24 h-24 md:w-32 md:h-32 object-contain"
      />
      <style>{`
        @keyframes ${animationName} {
          0% { 
            opacity: 0; 
            width: ${125 * scale}px;
            height: ${125 * scale}px;
            filter: blur(${5 * scale}px) saturate(3);
          }
          33% { 
            opacity: 1; 
            width: ${262.5 * scale}px;
            height: ${262.5 * scale}px;
            filter: blur(${10 * scale}px) saturate(3);
          }
          66% { 
            opacity: 0.2; 
            width: ${450 * scale}px;
            height: ${450 * scale}px;
            filter: blur(${65 * scale}px) saturate(3);
          }
          100% { 
            opacity: 0; 
            width: ${800 * scale}px;
            height: ${800 * scale}px;
            filter: blur(${120 * scale}px) saturate(3);
          }
        }

        @keyframes ${borderAnimationName} {
          0% { 
            padding: ${5 * scale}px;
          }
          33% { 
            padding: ${7.5 * scale}px;
          }
          66% { 
            padding: ${15 * scale}px;
          }
          100% { 
            padding: ${37.5 * scale}px;
          }
        }

        .sidekick-circle {
          background: linear-gradient(
            to right,
            rgba(255, 102, 0, 0.35),
            rgba(255, 0, 4, 0.35),
            rgba(88, 16, 255, 0.35),
            rgba(31, 120, 253, 0.35)
          );
          border-radius: 50%;
          animation: ${animationName} 3s linear infinite, ${borderAnimationName} 3s linear infinite;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sidekick-circle::before {
          content: '';
          background: #E3E4E5;
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }

        .circle-1 {
          animation-delay: 0s;
        }

        .circle-2 {
          animation-delay: 0.8s;
        }

        .circle-3 {
          animation-delay: 4.5s;
        }
      `}</style>
    </div>
  );
}
