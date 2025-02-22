import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Masonry from "react-masonry-css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  AlertCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Artwork } from "@shared/schema";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const breakpointColumns = {
  default: 3,
  1024: 2,
  640: 1,
};

function GalleryError({ error }: { error: any }) {
  const getErrorMessage = () => {
    if (error.message?.includes("AUTHENTICATION_REQUIRED")) {
      return "Unable to connect to the artwork database. Please verify the API credentials.";
    }
    return error.error || "Failed to load artwork. Please try again later.";
  };

  return (
    <Alert variant="destructive" className="mx-auto max-w-2xl mt-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error Loading Gallery</AlertTitle>
      <AlertDescription>{getErrorMessage()}</AlertDescription>
    </Alert>
  );
}

function GalleryItemSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative pt-[75%] w-full bg-muted flex items-center justify-center">
          <Skeleton className="absolute inset-0" />
        </div>
      </CardContent>
    </Card>
  );
}

function ImageWithFallback({
  src,
  alt,
  onLoad,
  onError,
}: {
  src: string;
  alt: string;
  onLoad?: () => void;
  onError?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative pt-[75%] w-full ">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="w-full h-full absolute inset-0" />
        </div>
      )}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground mt-2">
              Failed to load image
            </p>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
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

  const {
    data: artworks,
    isLoading,
    error,
  } = useQuery<Artwork[]>({
    queryKey: ["/api/artwork"],
    retry: 2,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("Gallery fetch error:", error);
    },
  });

  if (error) {
    return <GalleryError error={error} />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-background text-foreground">
      {!artworks?.length && !isLoading && (
        <div className="text-center py-12">
          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-semibold text-muted-foreground">
            No Artwork
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            No artwork has been added to the gallery yet.
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, index) => (
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
                        src={artwork.image}
                        alt={artwork.title}
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
                        <h3 className="text-white font-semibold text-lg">
                          {artwork.title}
                        </h3>
                        {artwork.medium && (
                          <p className="text-white/80 text-sm">
                            {artwork.medium}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-4xl">
                  <DialogTitle>{artwork.title}</DialogTitle>

                  <DialogDescription>
                    {artwork.medium && (
                      <span className="block">
                        {artwork.medium}, {artwork.year.split("-")[0]}
                      </span>
                    )}
                    {/* {artwork.collection && (
                      <span className="block">
                        Collection: {artwork.collection}
                      </span>
                    )} */}
                  </DialogDescription>
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
                          src={artworks[currentImageIndex].image}
                          alt={artworks[currentImageIndex].title}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {artworks.length > 1 && (
                      <div className="flex justify-between mt-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-transparent"
                          onClick={() =>
                            setCurrentImageIndex((prev) =>
                              prev > 0 ? prev - 1 : artworks.length - 1,
                            )
                          }
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-transparent"
                          onClick={() =>
                            setCurrentImageIndex((prev) =>
                              prev < artworks.length - 1 ? prev + 1 : 0,
                            )
                          }
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
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
