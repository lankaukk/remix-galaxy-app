import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Masonry from 'react-masonry-css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ImageIcon, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Artwork } from "@shared/schema";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const breakpointColumns = {
  default: 3,
  1024: 2,
  640: 1
};

function GalleryError({ error }: { error: Error }) {
  return (
    <Alert variant="destructive" className="mx-auto max-w-2xl mt-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error Loading Gallery</AlertTitle>
      <AlertDescription>
        {error.message || "Failed to load artwork. Please try again later."}
      </AlertDescription>
    </Alert>
  );
}

function GalleryItemSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-video w-full bg-muted flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>
      </CardContent>
    </Card>
  );
}

function ImageWithFallback({ 
  src, 
  alt, 
  aspectRatio,
  onLoad, 
  onError 
}: { 
  src: string; 
  alt: string; 
  aspectRatio: string;
  onLoad?: () => void;
  onError?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Convert aspect ratio class to paddingTop percentage
  const getPaddingTop = () => {
    switch (aspectRatio) {
      case 'aspect-square': return '100%';
      case 'aspect-video': return '56.25%';
      case 'aspect-[4/5]': return '125%';
      case 'aspect-[3/4]': return '133.33%';
      case 'aspect-[16/9]': return '56.25%';
      case 'aspect-[3/2]': return '66.67%';
      case 'aspect-[9/16]': return '177.78%';
      case 'aspect-[4/3]': return '75%';
      case 'aspect-[21/9]': return '42.86%';
      case 'aspect-[5/4]': return '80%';
      default: return '100%';
    }
  };

  return (
    <div 
      style={{ paddingTop: getPaddingTop() }}
      className="relative w-full bg-muted"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="w-full h-full absolute inset-0" />
        </div>
      )}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground mt-2">Failed to load image</p>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          loading="lazy"
          onLoad={() => {
            setIsLoading(false);
            onLoad?.();
          }}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
            onError?.();
          }}
        />
      )}
    </div>
  );
}

export default function Gallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: artworks, isLoading, error } = useQuery<Artwork[]>({
    queryKey: ['/api/artwork'],
    retry: 2,
    refetchOnWindowFocus: false,
  });

  if (error) {
    return <GalleryError error={error as Error} />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {!artworks?.length && !isLoading && (
        <div className="text-center py-12">
          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No Artwork</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            No artwork has been added to the gallery yet.
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array(6).fill(0).map((_, index) => (
            <GalleryItemSkeleton key={index} />
          ))}
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-6 w-auto"
          columnClassName="pl-6 bg-clip-padding"
        >
          {artworks?.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-6"
            >
              <Dialog 
                open={isModalOpen && currentImageIndex === index}
                onOpenChange={(open) => {
                  setIsModalOpen(open);
                  if (open) setCurrentImageIndex(index);
                }}
              >
                <DialogTrigger asChild>
                  <Card className="overflow-hidden group cursor-pointer relative">
                    <CardContent className="p-0">
                      <ImageWithFallback
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        aspectRatio={artwork.aspectRatio}
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
                        <h3 className="text-white font-semibold text-lg">{artwork.title}</h3>
                        <p className="text-white/80 text-sm">{artwork.category}</p>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-4xl">
                  <DialogTitle>{artwork.title}</DialogTitle>
                  <DialogDescription>{artwork.category}</DialogDescription>
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                      >
                        <ImageWithFallback
                          src={artworks[currentImageIndex].imageUrl}
                          alt={artworks[currentImageIndex].title}
                          aspectRatio={artworks[currentImageIndex].aspectRatio}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {artworks.length > 1 && (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                          onClick={() => setCurrentImageIndex(prev => 
                            prev > 0 ? prev - 1 : artworks.length - 1
                          )}
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                          onClick={() => setCurrentImageIndex(prev => 
                            prev < artworks.length - 1 ? prev + 1 : 0
                          )}
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </Masonry>
      )}
    </div>
  );
}