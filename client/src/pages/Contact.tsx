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
}: {
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
  href?: string;
  orbitRadius: number;
  orbitDuration: number;
  initialRotation: number;
}) => {
  const rotateAnimation = {
    initial: { rotate: initialRotation },
    animate: {
      rotate: initialRotation + 360,
      transition: {
        duration: orbitDuration,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const content = (
    <motion.div
      className="absolute"
      style={{
        width: orbitRadius * 2,
        height: orbitRadius * 2,
        borderRadius: "50%",
      }}
      initial={rotateAnimation.initial}
      animate={rotateAnimation.animate}
    >
      <motion.div
        className="absolute flex items-center justify-center rounded-full p-3 shadow-lg cursor-pointer transition-transform hover:scale-110"
        style={{ 
          backgroundColor: color,
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        whileHover={{ scale: 1.2 }}
        onClick={onClick}
      >
        <div className="text-white w-8 h-8 flex items-center justify-center">
          {icon}
        </div>
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
      orbitRadius: 140,
      orbitDuration: 20,
      initialRotation: 0,
    },
    {
      icon: <Linkedin size={24} />,
      color: "#0077B5",
      href: "https://www.linkedin.com/in/mckayla-lankau/",
      orbitRadius: 140,
      orbitDuration: 25,
      initialRotation: 90,
    },
    {
      icon: <Github size={24} />,
      color: "#333",
      href: "https://github.com/lankaukk",
      orbitRadius: 140,
      orbitDuration: 30,
      initialRotation: 180,
    },
    {
      icon: <Instagram size={24} />,
      color: "#E1306C",
      href: "https://www.instagram.com/forwardchaos/?hl=en",
      orbitRadius: 140,
      orbitDuration: 35,
      initialRotation: 270,
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
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}