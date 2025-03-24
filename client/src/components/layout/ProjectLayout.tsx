import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

interface ProjectLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  backLink?: string;
  backText?: string;
}

export default function ProjectLayout({
  title,
  description,
  children,
  backLink,
  backText,
}: ProjectLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-background text-foreground"
    >
      <div className="mb-8">
        {backLink && (
          <Link href={backLink}>
            <a className="inline-flex items-center hover:text-[#FF5757]">
              <ArrowLeft className="mr-2 h-5 w-5" />
              {backText || "Back"}
            </a>
          </Link>
        )}
      </div>
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mx-auto text-lg">{description}</p>
      </div>
      {children}
    </motion.div>
  );
}
