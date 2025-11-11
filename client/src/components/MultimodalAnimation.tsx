import AvatarImage from "@/assets/images/sidekick-avatar.png";

type MultimodalAnimationProps = {
  size?: "standard" | "hero";
};

const sizeConfig = {
  standard: {
    width1: "125px",
    width2: "262.5px",
    width3: "450px",
    width4: "800px",
    blur1: "5px",
    blur2: "10px",
    blur3: "65px",
    blur4: "120px",
  },
  hero: {
    width1: "250px",
    width2: "525px",
    width3: "900px",
    width4: "1600px",
    blur1: "10px",
    blur2: "20px",
    blur3: "130px",
    blur4: "240px",
  },
};

export default function MultimodalAnimation({ size = "standard" }: MultimodalAnimationProps) {
  const config = sizeConfig[size];
  
  return (
    <div
      className="relative w-full aspect-video rounded-lg shadow-xl flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundColor: "#E3E4E5",
        // @ts-ignore
        "--circle-width-1": config.width1,
        "--circle-width-2": config.width2,
        "--circle-width-3": config.width3,
        "--circle-width-4": config.width4,
        "--circle-blur-1": config.blur1,
        "--circle-blur-2": config.blur2,
        "--circle-blur-3": config.blur3,
        "--circle-blur-4": config.blur4,
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
            width: var(--circle-width-1);
            height: var(--circle-width-1);
            filter: blur(var(--circle-blur-1)) saturate(3);
          }
          33% { 
            opacity: 1; 
            width: var(--circle-width-2);
            height: var(--circle-width-2);
            filter: blur(var(--circle-blur-2)) saturate(3);
          }
          66% { 
            opacity: 0.2; 
            width: var(--circle-width-3);
            height: var(--circle-width-3);
            filter: blur(var(--circle-blur-3)) saturate(3);
          }
          100% { 
            opacity: 0; 
            width: var(--circle-width-4);
            height: var(--circle-width-4);
            filter: blur(var(--circle-blur-4)) saturate(3);
          }
        }

        @keyframes sidekickGrowingBorder {
          0% { 
            padding: 5px;
          }
          33% { 
            padding: 7.5px;
          }
          66% { 
            padding: 15px;
          }
          100% { 
            padding: 37.5px;
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
