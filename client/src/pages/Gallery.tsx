import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const images = [
  {
    src: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8",
    alt: "UI Design 1",
    title: "Modern Dashboard Design",
    description: "A clean and intuitive dashboard interface for data visualization",
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    alt: "UI Design 2",
    title: "Financial App Interface",
    description: "Mobile banking application with focus on user experience",
  },
  {
    src: "https://images.unsplash.com/photo-1506729623306-b5a934d88b53",
    alt: "UI Design 3",
    title: "E-commerce Redesign",
    description: "Complete redesign of an online shopping platform",
  },
  {
    src: "https://images.unsplash.com/photo-1529119513315-c7c361862fc7",
    alt: "UI Design 4",
    title: "Social Media App",
    description: "Modern social networking interface with dark mode",
  },
  {
    src: "https://images.unsplash.com/photo-1739514984003-330f7c1d2007",
    alt: "UI Design 5",
    title: "Healthcare Platform",
    description: "Patient management system with accessibility features",
  },
  {
    src: "https://images.unsplash.com/photo-1510759395231-72b17d622279",
    alt: "UI Design 6",
    title: "Travel Booking Interface",
    description: "Streamlined booking process for travel services",
  },
];

function GallerySkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Skeleton className="aspect-video w-full" />
      </CardContent>
    </Card>
  );
}

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

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
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {isLoading ? (
          Array(6).fill(0).map((_, index) => (
            <GallerySkeleton key={index} />
          ))
        ) : (
          images.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card className="overflow-hidden group cursor-pointer relative">
                  <CardContent className="p-0">
                    <motion.img
                      initial={{ scale: 1.1 }}
                      whileHover={{ scale: 1 }}
                      src={image.src}
                      alt={image.alt}
                      className="aspect-video w-full object-cover transition-transform"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
                      <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                      <p className="text-white/80 text-sm">{image.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full object-contain max-h-[80vh]"
                  />
                  <div className="mt-4">
                    <h2 className="text-2xl font-semibold">{image.title}</h2>
                    <p className="text-muted-foreground mt-2">{image.description}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))
        )}
      </motion.div>
    </div>
  );
}