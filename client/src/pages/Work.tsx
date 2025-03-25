import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { ProjectCardSkeleton } from "@/components/ui/project-card-skeleton";
import UtopiaCover from "@/assets/images/utopia/Utopia_Cover.jpg";
import ShopifyCover from "@/assets/images/shopify/sales_channels.png";

const projects = [
  {
    title: "Shopify",
    description: "UX Designer on the Channels Platform",
    image: ShopifyCover,
    href: "/work/shopify",
  },
  {
    title: "Utopia",
    description: "Founding Designer of Utopia, the Design Tool For Code",
    image: UtopiaCover,
    href: "/work/utopia",
  },
  {
    title: "Foundations",
    description:
      "Early explorations of digital design and emerging technologies",
    image: "https://mckayla.com/images/protest-platform-map.gif",
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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-background text-foreground">
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
                      style={{ objectPosition: "center 40%" }}
                    />
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-bold ">
                        {project.title}
                      </h3>
                      <p className="">{project.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
      </motion.div>
    </div>
  );
}
