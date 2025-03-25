import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const ContactBubble = ({ 
  icon, 
  color, 
  onClick, 
  href, 
  animationProps 
}: { 
  icon: React.ReactNode, 
  color: string, 
  onClick?: () => void, 
  href?: string, 
  animationProps: any 
}) => {
  const content = (
    <motion.div
      className={`flex items-center justify-center rounded-full p-3 shadow-lg cursor-pointer
      transition-transform hover:scale-110 absolute z-10`}
      style={{ backgroundColor: color }}
      whileHover={{ scale: 1.2 }}
      onClick={onClick}
      {...animationProps}
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

  // Define animation paths for each bubble
  const bubbleAnimations = [
    {
      initial: { x: -40, y: -100 },
      animate: {
        x: [-40, 10, -40],
        y: [-100, -120, -100],
        transition: {
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    {
      initial: { x: 100, y: -40 },
      animate: {
        x: [100, 120, 100],
        y: [-40, 10, -40],
        transition: {
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    {
      initial: { x: -90, y: 60 },
      animate: {
        x: [-90, -120, -90],
        y: [60, 20, 60],
        transition: {
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    {
      initial: { x: 60, y: 90 },
      animate: {
        x: [60, 90, 60],
        y: [90, 110, 90],
        transition: {
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
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
              color="#EA4335"
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
