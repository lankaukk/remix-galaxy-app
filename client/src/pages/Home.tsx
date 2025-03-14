import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="mb-6 text-5xl font-bold sm:text-6xl lg:text-7xl">
              Hi, <br />
              I'm <br />
              McKayla
            </h1>
            <p className="mb-8 text-lg sm:text-xl">
              I’m a UX designer working on the Storefronts team at Shopify. My passion
              is to create intuitive experiences at the intersection of art,
              design, and code.
            </p>

            <Link href="/work">
              <Button
                size="lg"
                className="bg-[#FF5757] text-white hover:bg-[#FF5757]/90"
              >
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16"
          >
            <img
              src="https://images.unsplash.com/photo-1549833971-c4283bad0032"
              alt="Designer Workspace"
              className="mx-auto rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
