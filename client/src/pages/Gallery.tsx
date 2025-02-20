import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

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
            <Dialog 
              key={index}
              open={isModalOpen && currentImageIndex === index}
              onOpenChange={(open) => {
                setIsModalOpen(open);
                if (open) setCurrentImageIndex(index);
              }}
            >
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
                <DialogTitle className="sr-only">{image.title}</DialogTitle>
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      src={images[currentImageIndex].src}
                      alt={images[currentImageIndex].alt}
                      className="w-full object-contain max-h-[80vh]"
                    />
                  </AnimatePresence>
                  <div className="mt-4">
                    <h2 className="text-2xl font-semibold">{images[currentImageIndex].title}</h2>
                    <p className="text-muted-foreground mt-2">{images[currentImageIndex].description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                    onClick={handlePrevious}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                    onClick={handleNext}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ))
        )}
      </motion.div>
    </div>
  );
}