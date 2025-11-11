import AvatarImage from "@/assets/images/sidekick-avatar.png";

type MultimodalAnimationProps = {
  scale?: number;
};

export default function MultimodalAnimation({ scale = 1 }: MultimodalAnimationProps) {
  return (
    <div
      className="relative w-full aspect-video rounded-lg shadow-xl flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundColor: "#E3E4E5",
        // @ts-ignore
        "--scale": scale,
      }}
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
        @keyframes sidekickGrowingCircle {
          0% { 
            opacity: 0; 
            width: calc(125px * var(--scale));
            height: calc(125px * var(--scale));
            filter: blur(calc(5px * var(--scale))) saturate(3);
          }
          33% { 
            opacity: 1; 
            width: calc(262.5px * var(--scale));
            height: calc(262.5px * var(--scale));
            filter: blur(calc(10px * var(--scale))) saturate(3);
          }
          66% { 
            opacity: 0.2; 
            width: calc(450px * var(--scale));
            height: calc(450px * var(--scale));
            filter: blur(calc(65px * var(--scale))) saturate(3);
          }
          100% { 
            opacity: 0; 
            width: calc(800px * var(--scale));
            height: calc(800px * var(--scale));
            filter: blur(calc(120px * var(--scale))) saturate(3);
          }
        }

        @keyframes sidekickGrowingBorder {
          0% { 
            padding: calc(5px * var(--scale));
          }
          33% { 
            padding: calc(7.5px * var(--scale));
          }
          66% { 
            padding: calc(15px * var(--scale));
          }
          100% { 
            padding: calc(37.5px * var(--scale));
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
          animation: sidekickGrowingCircle 3s linear infinite, sidekickGrowingBorder 3s linear infinite;
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
