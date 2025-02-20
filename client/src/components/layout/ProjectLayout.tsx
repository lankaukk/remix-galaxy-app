import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

interface ProjectLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  backLink: string;
}

export default function ProjectLayout({ title, description, children, backLink }: ProjectLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <Link href={backLink}>
        <a className="mb-8 inline-flex items-center text-[#333333] hover:text-[#FF5757]">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </a>
      </Link>
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-[#2D2D2D] sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-[#333333]">
          {description}
        </p>
      </div>
      {children}
    </motion.div>
  );
}