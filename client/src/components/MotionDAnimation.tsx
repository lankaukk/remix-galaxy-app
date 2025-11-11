export default function MotionDAnimation() {
  return (
    <div className="relative w-full h-full bg-white rounded-lg overflow-hidden">
      <div className="motion-d-circle circle-1"></div>
      <div className="motion-d-circle circle-2"></div>
      <div className="motion-d-circle circle-3"></div>
      <div className="motion-d-circle circle-4"></div>
      <style>{`
        @keyframes motionDFadeGrowSmall {
          0% { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          30% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          70% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
        }

        @keyframes motionDFadeGrowMedium {
          0% { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          35% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          65% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
        }

        @keyframes motionDFadeGrowLarge {
          0% { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          40% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          60% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
        }

        .motion-d-circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(270deg, 
            rgba(255, 200, 0, 0.5) 0%, 
            rgba(255, 0, 174, 0.5) 33%, 
            rgba(78, 0, 255, 0.5) 66%, 
            rgba(0, 166, 255, 0.5) 100%
          );
          filter: blur(25.55px);
        }

        .motion-d-circle.circle-1 {
          top: 30%;
          left: 25%;
          width: 28%;
          height: 28%;
          animation: motionDFadeGrowLarge 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 0s;
        }

        .motion-d-circle.circle-2 {
          top: 60%;
          left: 70%;
          width: 15%;
          height: 15%;
          animation: motionDFadeGrowSmall 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 1.2s;
        }

        .motion-d-circle.circle-3 {
          top: 45%;
          left: 50%;
          width: 22%;
          height: 22%;
          animation: motionDFadeGrowMedium 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 2.4s;
        }

        .motion-d-circle.circle-4 {
          top: 75%;
          left: 35%;
          width: 18%;
          height: 18%;
          animation: motionDFadeGrowMedium 3.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 3.6s;
        }
      `}</style>
    </div>
  );
}
