import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const images = [
  {
    src: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8",
    alt: "UI Design 1",
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    alt: "UI Design 2",
  },
  {
    src: "https://images.unsplash.com/photo-1506729623306-b5a934d88b53",
    alt: "UI Design 3",
  },
  {
    src: "https://images.unsplash.com/photo-1529119513315-c7c361862fc7",
    alt: "UI Design 4",
  },
  {
    src: "https://images.unsplash.com/photo-1739514984003-330f7c1d2007",
    alt: "UI Design 5",
  },
  {
    src: "https://images.unsplash.com/photo-1510759395231-72b17d622279",
    alt: "UI Design 6",
  },
];

export default function Gallery() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <motion.img
                initial={{ scale: 1.1 }}
                whileHover={{ scale: 1 }}
                src={image.src}
                alt={image.alt}
                className="aspect-video w-full object-cover transition-transform"
              />
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
