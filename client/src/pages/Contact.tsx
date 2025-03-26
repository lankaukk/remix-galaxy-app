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
}: {
  radius: number;
  duration: number;
  startAngle: number;
  children: React.ReactNode;
}) => {
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
      }}
      animate={{
        rotate: [0, 360],
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
        }}
      >
        {/* Counter-rotation to keep icons upright */}
        <motion.div
          style={{ transformOrigin: "center" }}
          animate={{
            rotate: [0, -360], // Counter-rotate to keep icons straight
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
      className="flex items-center justify-center rounded-full p-3 shadow-lg cursor-pointer"
      style={{ backgroundColor: color }}
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

  // Define orbit configurations with increased radius so they don't overlap the photo
  const orbits = [
    { radius: 180, duration: 15, startAngle: 0 },     // Email - closest orbit
    { radius: 230, duration: 20, startAngle: 90 },    // LinkedIn - medium distance
    { radius: 280, duration: 25, startAngle: 180 },   // GitHub - far
    { radius: 330, duration: 30, startAngle: 270 },   // Instagram - farthest
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
          <div className="w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-xl bg-background">
            <img
              src="/profile_photo.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Orbiting contact bubbles */}
        {mounted && (
          <>
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
                icon={<Linkedin size={24} />}
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
                icon={<Github size={24} />}
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
          </>
        )}
      </motion.div>
    </div>
  );
}