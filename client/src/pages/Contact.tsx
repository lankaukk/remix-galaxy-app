import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const ContactBubble = ({
  icon,
  color,
  onClick,
  href,
  animationProps,
}: {
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
  href?: string;
  animationProps: any;
}) => {
  const content = (
    <motion.div
      className={`flex items-center justify-center rounded-full p-3 shadow-lg cursor-pointer
      transition-transform hover:scale-110 absolute z-10`}
      style={{ 
        backgroundColor: color,
        ...animationProps.style 
      }}
      animate={animationProps.animate}
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

  // Create a simpler circular orbit animation that works consistently for all bubbles
  const generateOrbitAnimation = (radius: number, duration: number, startAngle: number) => {
    return {
      animate: {
        // We'll use a simple transform to rotate around the origin
        rotate: [startAngle, startAngle + 360],
        transition: {
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }
      },
      style: {
        // Position each bubble at its respective distance from center
        left: '50%',
        top: '50%',
        transformOrigin: 'center',
        transform: `rotate(${startAngle}deg) translate(${radius}px) rotate(-${startAngle}deg)`,
      }
    };
  };

  // Define different orbits for each bubble - all using same animation approach
  const bubbleAnimations = [
    generateOrbitAnimation(120, 20, 0),     // First orbit - closest
    generateOrbitAnimation(160, 25, 90),    // Second orbit
    generateOrbitAnimation(200, 30, 180),   // Third orbit
    generateOrbitAnimation(240, 35, 270),   // Fourth orbit - farthest
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

        {/* Floating contact bubbles */}
        {mounted && (
          <>
            <ContactBubble
              icon={<Mail size={24} />}
              color="#b400a8"
              onClick={copyToClipboard}
              animationProps={bubbleAnimations[0]}
            />

            <ContactBubble
              icon={<Linkedin size={24} />}
              color="#0077B5"
              href="https://www.linkedin.com/in/mckayla-lankau/"
              animationProps={bubbleAnimations[1]}
            />

            <ContactBubble
              icon={<Github size={24} />}
              color="#333"
              href="https://github.com/lankaukk"
              animationProps={bubbleAnimations[2]}
            />

            <ContactBubble
              icon={<Instagram size={24} />}
              color="#E1306C"
              href="https://www.instagram.com/forwardchaos/?hl=en"
              animationProps={bubbleAnimations[3]}
            />
          </>
        )}
      </motion.div>
    </div>
  );
}
