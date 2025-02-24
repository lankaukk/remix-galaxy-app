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
      {backLink && (
        <Link href={backLink}>
          <a className="mb-4 inline-flex items-center hover:text-[#FF5757]">
            <ArrowLeft className="mr-2 h-5 w-5" />
            {backText || "Back"}
          </a>
        </Link>
      )}
      <div>
        <h1 className="mb-4 text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mx-auto max-w-2xl text-lg mb-12">{description}</p>
      </div>
      {children}
    </motion.div>
  );
}
