export default function MotionDAnimation() {
  return (
    <div className="relative w-full h-full bg-white rounded-lg overflow-hidden">
      <div className="motion-d-circle circle-1"></div>
      <div className="motion-d-circle circle-2"></div>
      <div className="motion-d-circle circle-3"></div>
      <div className="motion-d-circle circle-4"></div>
      <style>{`
        @keyframes motionDFadeGrow {
          0% { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          25% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          75% { 
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
          width: 20%;
          height: 20%;
          border-radius: 50%;
          background: linear-gradient(270deg, 
            rgba(255, 200, 0, 0.5) 0%, 
            rgba(255, 0, 174, 0.5) 33%, 
            rgba(78, 0, 255, 0.5) 66%, 
            rgba(0, 166, 255, 0.5) 100%
          );
          filter: blur(25.55px);
          animation: motionDFadeGrow 4s ease-in-out infinite;
        }

        .motion-d-circle.circle-1 {
          top: 30%;
          left: 25%;
          animation-delay: 0s;
        }

        .motion-d-circle.circle-2 {
          top: 60%;
          left: 70%;
          animation-delay: 1s;
        }

        .motion-d-circle.circle-3 {
          top: 45%;
          left: 50%;
          animation-delay: 2s;
        }

        .motion-d-circle.circle-4 {
          top: 75%;
          left: 35%;
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
}
