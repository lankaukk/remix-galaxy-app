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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const breakpointColumns = {
  default: 3,
  1024: 2,
  640: 1,
};

function GalleryError({ error }: { error: Error | unknown }) {
  const getErrorMessage = () => {
    const err = error as any;
    if (err?.message?.includes("AUTHENTICATION_REQUIRED")) {
      return "Unable to connect to the artwork database. Please verify the API credentials.";
    }
    return err?.error || "Failed to load artwork. Please try again later.";
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
  // Create different aspect ratios for more natural looking skeletons
  // Using a more conservative range to avoid cards that are too tall
  const randomRatios = [60, 75, 85, 100];
  const randomIndex = Math.floor(Math.random() * randomRatios.length);
  const aspectRatio = randomRatios[randomIndex];
  
  return (
    <Card className="overflow-hidden mb-6">
      <CardContent className="p-0">
        <div 
          className="relative w-full bg-muted flex items-center justify-center"
          style={{ paddingTop: `${aspectRatio}%` }}
        >
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
  maintainAspectRatio = false,
  inGallery = false,
}: {
  src: string;
  alt: string;
  onLoad?: () => void;
  onError?: () => void;
  maintainAspectRatio?: boolean;
  inGallery?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imgNaturalHeight, setImgNaturalHeight] = useState<number | null>(null);
  const [imgNaturalWidth, setImgNaturalWidth] = useState<number | null>(null);
  const [imgSrc, setImgSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);

  // Try to refresh the image if it fails to load initially (may help with temporary URLs)
  const handleImageError = () => {
    if (retryCount < 2) {
      // Add a cache-busting parameter
      const newSrc = `${src}${src.includes("?") ? "&" : "?"}_retry=${Date.now()}`;
      setImgSrc(newSrc);
      setRetryCount((prev) => prev + 1);
    } else {
      setIsLoading(false);
      setHasError(true);
      onError?.();
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImgNaturalHeight(img.naturalHeight);
    setImgNaturalWidth(img.naturalWidth);
    setIsLoading(false);
    onLoad?.();
  };

  // For gallery cards, we want them to maintain aspect ratio but have consistent width
  if (inGallery) {
    // Calculate an appropriate aspect ratio for loading and error states
    const aspectRatio = imgNaturalWidth && imgNaturalHeight 
      ? (imgNaturalHeight / imgNaturalWidth) * 100
      : 66.7; // Default 3:2 ratio if dimensions not known yet
      
    return (
      <div className="w-full">
        {isLoading && (
          <div 
            className="w-full relative"
            style={{ paddingTop: `${aspectRatio}%` }}
          >
            <Skeleton className="absolute inset-0" />
          </div>
        )}
        {hasError ? (
          <div 
            className="w-full relative flex items-center justify-center bg-muted"
            style={{ paddingTop: `${aspectRatio}%` }}
          >
            <div className="text-center absolute inset-0 flex flex-col items-center justify-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mt-2">
                Failed to load image
              </p>
            </div>
          </div>
        ) : (
          <div
            className="w-full relative"
            style={
              imgNaturalWidth && imgNaturalHeight && !isLoading
                ? {
                    paddingTop: `${(imgNaturalHeight / imgNaturalWidth) * 100}%`,
                  }
                : { paddingTop: `${aspectRatio}%` }
            }
          >
            <img
              src={imgSrc}
              alt={alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isLoading ? "opacity-40" : "opacity-100"
              }`}
              loading="lazy"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
        )}
      </div>
    );
  }

  // For modal images - maintain aspect ratio with max height constraint
  if (maintainAspectRatio) {
    return (
      <div className="w-full">
        {isLoading && (
          <div className="min-h-[200px] flex items-center justify-center">
            <Skeleton className="w-full h-[200px]" />
          </div>
        )}
        {hasError ? (
          <div className="min-h-[200px] flex items-center justify-center bg-muted">
            <div className="text-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground mt-2">
                Failed to load image
              </p>
            </div>
          </div>
        ) : (
          <img
            src={imgSrc}
            alt={alt}
            className={`w-full max-h-[70vh] object-contain transition-opacity duration-300 ${
              isLoading ? "opacity-40" : "opacity-100"
            }`}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>
    );
  }

  // Original fixed aspect ratio display for backward compatibility
  return (
    <div className="relative pt-[75%] w-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="absolute inset-0" />
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
          src={imgSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-40" : "opacity-100"
          }`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
    </div>
  );
}

type SortOption = "date" | "title";

export default function Gallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("date");

  const {
    data: artworksData = [],
    isLoading,
    error,
  } = useQuery<Artwork[]>({
    queryKey: ["/api/artwork"],
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // Sort artworks based on selected sort option
  const artworks = [...(artworksData || [])].sort((a, b) => {
    if (sortBy === "title") {
      return (a.title || "").localeCompare(b.title || "");
    } else {
      // Sort by year, most recent first (date is default)
      if (!a.year && !b.year) return 0;
      if (!a.year) return 1;
      if (!b.year) return -1;
      return b.year.localeCompare(a.year);
    }
  });

  if (error) {
    return <GalleryError error={error} />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-background text-foreground">
      {/* Sort selector */}
      {artworks.length > 1 && !isLoading && (
        <div className="mb-6 flex justify-end">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortOption)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">
                  <span>Date</span>
                </SelectItem>
                <SelectItem value="title">
                  <span>Title</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

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
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-6 w-auto"
          columnClassName="pl-6 bg-clip-padding"
        >
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <GalleryItemSkeleton key={`skeleton-${index}`} />
            ))}
        </Masonry>
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
                        inGallery={true}
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

                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogTitle>{artwork.title}</DialogTitle>

                  <DialogDescription>
                    {artwork.medium && artwork.year && (
                      <span className="block">
                        {artwork.medium},{" "}
                        {artwork.year ? artwork.year.split("-")[0] : ""}
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
                          maintainAspectRatio={true}
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
