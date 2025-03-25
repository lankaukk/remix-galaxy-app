import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const OrbitingContactIcon = ({
  icon,
  color,
  onClick,
  href,
  orbitRadius,
  orbitDuration,
  initialRotation,
  angleRange = 180, // Only orbit in 180-degree arc by default (never going behind)
}: {
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
  href?: string;
  orbitRadius: number;
  orbitDuration: number;
  initialRotation: number;
  angleRange?: number;
}) => {
  // Calculate starting position on the left side of the circle
  const startAngle = -90 + initialRotation;
  
  // Create a custom path that only traverses part of the circle (arc)
  // This ensures icons stay on one side and don't go behind the image
  const customPathAnimation = {
    rotate: [startAngle, startAngle + angleRange],
    transition: {
      duration: orbitDuration,
      repeat: Infinity,
      repeatType: "reverse" as const, // Go back and forth along the arc
      ease: "easeInOut",
    },
  };

  const content = (
    <motion.div
      className="absolute"
      style={{
        width: 0,
        height: 0,
        top: "50%",
        left: "50%",
      }}
    >
      <motion.div
        className="absolute"
        style={{
          width: 56, // Icon container width
          height: 56, // Icon container height
          x: -28, // Center the icon (half of width)
          y: -28, // Center the icon (half of height)
          transformOrigin: `${orbitRadius + 28}px 28px`, // Position at orbit distance
          left: 0,
          top: 0,
        }}
        animate={customPathAnimation}
      >
        <motion.div
          className="absolute flex items-center justify-center rounded-full p-3 shadow-lg cursor-pointer"
          style={{ 
            backgroundColor: color,
            left: orbitRadius, // Position at orbit distance
            top: 0,
          }}
          whileHover={{ scale: 1.2 }}
          onClick={onClick}
        >
          <div className="text-white w-8 h-8 flex items-center justify-center">
            {icon}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  
  return content;
};

export default function Contact() {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  
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

  // Define orbit configuration
  const orbitConfig = [
    {
      icon: <Mail size={24} />,
      color: "#EA4335",
      onClick: copyToClipboard,
      orbitRadius: 170, // Furthest from the center
      orbitDuration: 8, // Medium speed
      initialRotation: 0, // Starts at the left middle
      angleRange: 120, // Oscillates in a smaller arc
    },
    {
      icon: <Linkedin size={24} />,
      color: "#0077B5",
      href: "https://www.linkedin.com/in/mckayla-lankau/",
      orbitRadius: 140, // Medium distance
      orbitDuration: 12, // Slower
      initialRotation: 45, // Starts slightly above
      angleRange: 90, // Oscillates in a smaller arc
    },
    {
      icon: <Github size={24} />,
      color: "#333",
      href: "https://github.com/lankaukk",
      orbitRadius: 120, // Closer to center
      orbitDuration: 10, // Faster
      initialRotation: -45, // Starts slightly below
      angleRange: 70, // Oscillates in an even smaller arc
    },
    {
      icon: <Instagram size={24} />,
      color: "#E1306C",
      href: "https://www.instagram.com/forwardchaos/?hl=en",
      orbitRadius: 150, // Medium-far distance
      orbitDuration: 14, // Slowest
      initialRotation: -30, // Starts slightly below
      angleRange: 100, // Medium arc movement
    },
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
          className="relative z-10"
        >
          <div className="w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-xl bg-background">
            <img 
              src="/profile_photo.jpg" 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Orbiting contact icons */}
        {mounted && (
          <div className="absolute inset-0 flex items-center justify-center">
            {orbitConfig.map((config, index) => (
              <OrbitingContactIcon
                key={index}
                icon={config.icon}
                color={config.color}
                onClick={config.onClick}
                href={config.href}
                orbitRadius={config.orbitRadius}
                orbitDuration={config.orbitDuration}
                initialRotation={config.initialRotation}
                angleRange={config.angleRange}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}