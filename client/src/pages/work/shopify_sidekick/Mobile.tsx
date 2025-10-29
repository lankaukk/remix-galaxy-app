import { useState, useEffect } from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectDetailSkeleton } from "@/components/ui/project-card-skeleton";

const PAGE_TITLE = "Sidekick on Mobile";
const PAGE_DESCRIPTION = "Leading mobile and voice design for Shopify's AI assistant, bringing conversational AI to hundreds of thousands of merchants on the go";

export default function Mobile() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <ProjectLayout
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        backLink="/work/shopify_sidekick"
        backText="Shopify Sidekick"
      >
        <ProjectDetailSkeleton />
      </ProjectLayout>
    );
  }

  return (
    <ProjectLayout
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      backLink="/work/shopify_sidekick"
      backText="Shopify Sidekick"
    >
      <div className="space-y-12">
        <img
          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c"
          alt="Mobile Experience"
          className="w-full rounded-lg shadow-xl"
          loading="lazy"
        />

        <div className="prose-lg max-w-none">
          <h2>Audio Interaction Patterns</h2>
          <p>
            I led the first real audio interaction patterns at Shopify—visualizing sound with waveforms and ripples, designing clear voice-active states, and creating motion that feels alive. These patterns bring voice mode to life on mobile, making it feel natural and responsive when merchants interact with Sidekick hands-free.
          </p>

          <h2>Mobile Chat & Input Design</h2>
          <p>
            I designed the core mobile chat and input experience, making it feel native through our hybrid webview and React Native approach. The interface is optimized for mobile use, allowing merchants to quickly get help and complete tasks while managing their stores on the go. I also contributed voice-mode icons to Polaris, Shopify's design system, ensuring consistency across the platform.
          </p>

          <h2>Admin Mobile Navigation</h2>
          <p>
            My work extended into core Admin mobile navigation, integrating Sidekick seamlessly into the mobile merchant experience. This ensures Sidekick is accessible wherever merchants need it, creating a cohesive experience across the entire mobile platform.
          </p>

          <h2>Impact</h2>
          <p>
            Sidekick on Mobile is now in the hands of hundreds of thousands of shops with strong satisfaction scores. By putting Sidekick where it's easy for merchants to work—on their phones—we've made AI assistance accessible in the moments that matter most.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}
