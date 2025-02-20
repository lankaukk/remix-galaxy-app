import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="mb-6 text-5xl font-bold text-[#2D2D2D] sm:text-6xl lg:text-7xl">
              UX Designer & <br />
              Digital Craftsperson
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-[#333333]">
              Creating thoughtful digital experiences through user-centered design,
              research, and careful attention to detail.
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
