export default function MotionEAnimation() {
  return (
    <div className="relative w-full h-full rounded-lg flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="sidekick-circle circle-1"></div>
      <div className="sidekick-circle circle-2"></div>
      <div className="sidekick-circle circle-3"></div>
      <style>{`
        @keyframes sidekickGrowingCircle {
          0% { 
            opacity: 0; 
            width: 60px;
            height: 60px;
            filter: blur(3px) saturate(3);
          }
          33% { 
            opacity: 1; 
            width: 120px;
            height: 120px;
            filter: blur(6px) saturate(3);
          }
          66% { 
            opacity: 0.2; 
            width: 200px;
            height: 200px;
            filter: blur(30px) saturate(3);
          }
          100% { 
            opacity: 0; 
            width: 350px;
            height: 350px;
            filter: blur(55px) saturate(3);
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
          background: #FFFFFF;
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
