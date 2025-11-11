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
          50% { 
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
          filter: blur(15.55px);
        }

        .motion-d-circle.circle-1 {
          top: 30%;
          left: 25%;
          width: 28%;
          height: 28%;
          animation: motionDFadeGrow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 0s;
        }

        .motion-d-circle.circle-2 {
          top: 60%;
          left: 70%;
          width: 15%;
          height: 15%;
          animation: motionDFadeGrow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 0.8s;
        }

        .motion-d-circle.circle-3 {
          top: 45%;
          left: 50%;
          width: 22%;
          height: 22%;
          animation: motionDFadeGrow 2.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 1.6s;
        }

        .motion-d-circle.circle-4 {
          top: 75%;
          left: 35%;
          width: 18%;
          height: 18%;
          animation: motionDFadeGrow 2.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 2.4s;
        }
      `}</style>
    </div>
  );
}
