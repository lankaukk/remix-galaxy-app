import AvatarImage from "@assets/Avatar_1761782734555.png";

export default function MultimodalAnimation() {
  return (
    <div className="relative w-full aspect-video bg-white rounded-lg shadow-xl flex items-center justify-center overflow-hidden">
      <div className="sidekick-circle circle-1"></div>
      <div className="sidekick-circle circle-2"></div>
      <div className="sidekick-circle circle-3"></div>
      <img 
        src={AvatarImage} 
        alt="Sidekick Avatar" 
        className="relative z-10 w-24 h-24 md:w-32 md:h-32"
      />
      <style>{`
        @keyframes sidekickGrowingCircle {
          0% { 
            opacity: 0%; 
            width: 50px;
            height: 50px;
            filter: blur(3px);
          }
          33% { 
            opacity: 100%; 
            width: 105px;
            height: 105px;
            filter: blur(6px);
          }
          66% { 
            opacity: 40%; 
            width: 180px;
            height: 180px;
            filter: blur(8px);
          }
          100% { 
            opacity: 0%; 
            width: 270px;
            height: 270px;
            filter: blur(15px);
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
          background: linear-gradient(to right, #FFB890, #E890FF, #A8A0FF, #80C0FF);
          border-radius: 50%;
          animation: sidekickGrowingCircle 3s linear infinite, sidekickGrowingBorder 3s linear infinite;
          position: absolute;
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
