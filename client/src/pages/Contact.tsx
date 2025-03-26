import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

// Create a wrapper component that will handle the circular motion
const OrbitingBubble = ({
  radius,
  duration,
  startAngle,
  children,
  direction = "clockwise", // Default is clockwise
}: {
  radius: number;
  duration: number;
  startAngle: number;
  children: React.ReactNode;
  direction?: "clockwise" | "counterclockwise";
}) => {
  // Determine animation rotation based on direction
  const rotateValues = direction === "clockwise" ? [0, 360] : [0, -360];
  const counterRotateValues = direction === "clockwise" ? [0, -360] : [0, 360];
  
  return (
    <motion.div
      className="absolute"
      style={{
        width: radius * 2,
        height: radius * 2,
        top: "50%",
        left: "50%",
        marginLeft: -radius,
        marginTop: -radius,
        pointerEvents: "none", // Don't block click events
      }}
      animate={{
        rotate: rotateValues,
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Outer container for positioning */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: `rotate(${startAngle}deg)`,
          pointerEvents: "none", // Don't block click events
        }}
      >
        {/* Counter-rotation to keep icons upright */}
        <motion.div
          style={{ 
            transformOrigin: "center",
            pointerEvents: "auto" // Re-enable pointer events just for the icon
          }}
          animate={{
            rotate: counterRotateValues, // Counter-rotate to keep icons straight
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};

// A simple decorative bubble that doesn't link anywhere
const DecorativeBubble = ({ color, size = 14 }: { color: string; size?: number }) => {
  return (
    <motion.div
      className="rounded-full shadow-md"
      style={{ 
        backgroundColor: color,
        width: size,
        height: size,
        zIndex: 5 // Lower z-index than contact bubbles (10)
      }}
      whileHover={{ scale: 1.1 }}
    />
  );
};

const ContactBubble = ({
  icon,
  color,
  onClick,
  href,
}: {
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
  href?: string;
}) => {
  const content = (
    <motion.div
      className="flex items-center justify-center rounded-full p-3 shadow-lg cursor-pointer relative"
      style={{ 
        backgroundColor: color,
        zIndex: 10 // Ensure contact bubbles stay above decorative ones
      }}
      whileHover={{ scale: 1.2 }}
      onClick={onClick}
    >
      <div className="text-white w-8 h-8 flex items-center justify-center">
        {icon}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block" // Added to make sure the link takes full space
        style={{ 
          pointerEvents: 'all',
          zIndex: 10 // Ensure contact bubbles stay above decorative ones
        }}
      >
        {content}
      </a>
    );
  }

  return content;
};

export default function Contact() {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Array of profile photos in the cycle - can add more here later
  const profilePhotos = [
    "/profile_photo.jpg",
    "/pro-pic.jpg"
    // Add more photos here to extend the cycle
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = () => {
    const email = "mckaylalankau@gmail.com";
    navigator.clipboard.writeText(email);
    toast({
      title: "Email Copied!",
      description: "Email address has been copied to clipboard",
    });
  };
  
  // Cycle to the next photo when clicked
  const cycleProfilePhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % profilePhotos.length);
  };

  // Define orbit configurations with smaller distances between orbits
  const orbits = [
    { radius: 180, duration: 15, startAngle: 0 }, // Email - closest orbit
    { radius: 210, duration: 20, startAngle: 90 }, // LinkedIn - medium distance
    { radius: 240, duration: 25, startAngle: 180 }, // GitHub - far
    { radius: 270, duration: 30, startAngle: 270 }, // Instagram - farthest
  ];
  
  // Define decorative bubble configurations that orbit counter-clockwise
  const decorativeBubbles = [
    { radius: 140, duration: 18, startAngle: 30, color: "#FF6B6B", size: 16 },  // Coral
    { radius: 160, duration: 24, startAngle: 120, color: "#4ECDC4", size: 14 }, // Turquoise
    { radius: 195, duration: 30, startAngle: 210, color: "#FFD166", size: 12 }, // Yellow
    { radius: 230, duration: 22, startAngle: 300, color: "#6A0572", size: 16 }, // Purple
    { radius: 260, duration: 26, startAngle: 45, color: "#1A936F", size: 14 },  // Green
    { radius: 185, duration: 28, startAngle: 170, color: "#F77F00", size: 10 }, // Orange
    { radius: 220, duration: 20, startAngle: 240, color: "#7209B7", size: 12 }, // Violet
    { radius: 250, duration: 32, startAngle: 15, color: "#3A86FF", size: 14 },  // Blue
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-background text-foreground min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative flex items-center justify-center"
      >
        {/* Profile image in the center */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="relative z-0"
        >
          <motion.div 
            className="w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden border-1 border-foreground shadow-xl bg-background cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={cycleProfilePhoto}
          >
            <motion.img
              key={currentPhotoIndex} // Add key to trigger animation when image changes
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={profilePhotos[currentPhotoIndex]}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Orbiting contact bubbles */}
        {mounted && (
          <>
            {/* Main contact bubbles (clockwise) */}
            <OrbitingBubble
              radius={orbits[0].radius}
              duration={orbits[0].duration}
              startAngle={orbits[0].startAngle}
            >
              <ContactBubble
                icon={<Mail size={24} />}
                color="#b400a8"
                onClick={copyToClipboard}
              />
            </OrbitingBubble>

            <OrbitingBubble
              radius={orbits[1].radius}
              duration={orbits[1].duration}
              startAngle={orbits[1].startAngle}
            >
              <ContactBubble
                icon={<Linkedin size={24} style={{ transform: "rotate(-90deg)" }} />}
                color="#0077B5"
                href="https://www.linkedin.com/in/mckayla-lankau/"
              />
            </OrbitingBubble>

            <OrbitingBubble
              radius={orbits[2].radius}
              duration={orbits[2].duration}
              startAngle={orbits[2].startAngle}
            >
              <ContactBubble
                icon={<Github size={24} style={{ transform: "rotate(180deg)" }} />}
                color="#333"
                href="https://github.com/lankaukk"
              />
            </OrbitingBubble>

            <OrbitingBubble
              radius={orbits[3].radius}
              duration={orbits[3].duration}
              startAngle={orbits[3].startAngle}
            >
              <ContactBubble
                icon={<Instagram size={24} />}
                color="#E1306C"
                href="https://www.instagram.com/forwardchaos/?hl=en"
              />
            </OrbitingBubble>

            {/* Decorative bubbles (counter-clockwise) */}
            {decorativeBubbles.map((bubble, index) => (
              <OrbitingBubble
                key={`decorative-${index}`}
                radius={bubble.radius}
                duration={bubble.duration}
                startAngle={bubble.startAngle}
                direction="counterclockwise"
              >
                <DecorativeBubble 
                  color={bubble.color} 
                  size={bubble.size} 
                />
              </OrbitingBubble>
            ))}
          </>
        )}
      </motion.div>
    </div>
  );
}
