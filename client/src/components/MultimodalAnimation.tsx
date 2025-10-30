import AvatarImage from "@/assets/images/sidekick-avatar.png";

export default function MultimodalAnimation() {
  return (
    <div className="relative w-full aspect-video bg-white rounded-lg shadow-xl flex items-center justify-center overflow-hidden">
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
            width: 50px;
            height: 50px;
            filter: blur(2px) saturate(3);
          }
          33% { 
            opacity: 1; 
            width: 105px;
            height: 105px;
            filter: blur(4px) saturate(3);
          }
          66% { 
            opacity: 0.2; 
            width: 180px;
            height: 180px;
            filter: blur(26px) saturate(3);
          }
          100% { 
            opacity: 0; 
            width: 320px;
            height: 320px;
            filter: blur(48px) saturate(3);
          }
        }

        @keyframes sidekickGrowingBorder {
          0% { 
            padding: 2px;
          }
          33% { 
            padding: 3px;
          }
          66% { 
            padding: 6px;
          }
          100% { 
            padding: 15px;
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
          background: #ffffff;
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }

        .circle-1 {
          animation-delay: 0s;
        }

        .circle-2 {
          animation-delay: 1s;
        }

        .circle-3 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
