import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { ProjectCardSkeleton } from "@/components/ui/project-card-skeleton";

const projects = [
  {
    title: "Shopify",
    description: "E-commerce platform redesign",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12",
    href: "/work/shopify",
  },
  {
    title: "Utopia",
    description: "Social platform UI simplification",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07",
    href: "/work/utopia",
  },
  {
    title: "Foundations",
    description: "Design system and component library",
    image: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec",
    href: "/work/foundations",
  },
];

export default function Work() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, index) => <ProjectCardSkeleton key={index} />)
          : projects.map((project) => (
              <Link key={project.title} href={project.href}>
                <Card className="cursor-pointer transition-transform hover:scale-[1.02]">
                  <CardContent className="p-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="aspect-video w-full object-cover"
                      loading="lazy"
                    />
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-bold text-[#2D2D2D]">
                        {project.title}
                      </h3>
                      <p className="text-[#333333]">{project.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
      </motion.div>
    </div>
  );
}
