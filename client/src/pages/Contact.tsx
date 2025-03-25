import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Instagram } from "lucide-react";

export default function Contact() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-8"
      >
        <div className="space-y-4">
          <a
            href="mailto:contact@example.com"
            className="flex items-center gap-2 hover:text-[#00C2FF]"
          >
            <Mail className="h-5 w-5" />
            mckaylalankau@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/mckayla-lankau/"
            className="flex items-center gap-2  hover:text-[#00C2FF]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5" />
            LinkedIn
          </a>
          <a
            href="https://github.com/lankaukk"
            className="flex items-center gap-2  hover:text-[#00C2FF]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
            Github
          </a>
          <a
            href="https://www.instagram.com/forwardchaos/?hl=en"
            className="flex items-center gap-2  hover:text-[#00C2FF]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-5 w-5" />
            Instagram
          </a>
        </div>
      </motion.div>
    </div>
  );
}
