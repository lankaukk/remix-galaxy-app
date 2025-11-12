import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useState } from "react";
import { ProjectCardSkeleton } from "@/components/ui/project-card-skeleton";
import UtopiaCover from "@/assets/images/utopia/Utopia_Cover.jpg";
import ShopifyCover from "@/assets/images/shopify/sales_channels.png";
import SidekickCover from "@/assets/images/shopify/sidekick-cover-new.png";

const projects = [
  {
    title: "Shopify",
    description: "Senior UX Designer on Sidekick, the AI assistant for commerce",
    image: SidekickCover,
    href: "/work/shopify_sidekick",
  },
  {
    title: "Shopify",
    description: "UX Designer on the Channels Platform",
    image: ShopifyCover,
    href: "/work/shopify_channels_platform",
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
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(Array.from(prev).concat(index)));
  };

  const handleImageError = (index: number) => {
    setLoadedImages((prev) => new Set(Array.from(prev).concat(index)));
  };

  const allImagesLoaded = loadedImages.size === projects.length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 pb-24 md:pb-12 sm:px-6 lg:px-8 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {!allImagesLoaded &&
          Array(4)
            .fill(0)
            .map((_, index) => <ProjectCardSkeleton key={index} />)}
        
        {projects.map((project, index) => (
          <Link 
            key={project.href} 
            href={project.href}
            className={!allImagesLoaded ? "hidden" : ""}
          >
            <Card className="cursor-pointer transition-transform hover:scale-[1.02]">
              <CardContent className="p-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="aspect-video w-full object-cover"
                  loading="eager"
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageError(index)}
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
