import { motion } from "framer-motion";

interface ProjectLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function ProjectLayout({ title, description, children }: ProjectLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
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
