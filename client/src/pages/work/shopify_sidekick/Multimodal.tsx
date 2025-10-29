import { useState, useEffect } from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectDetailSkeleton } from "@/components/ui/project-card-skeleton";

const PAGE_TITLE = "Multimodal AI Experiences";
const PAGE_DESCRIPTION = "Designing conversational AI with voice, screen sharing, and natural language understanding";

export default function Multimodal() {
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
          src="https://images.unsplash.com/photo-1589254065878-42c9da997008"
          alt="Multimodal AI"
          className="w-full rounded-lg shadow-xl"
          loading="lazy"
        />

        <div className="prose-lg max-w-none">
          <h2>Overview</h2>
          <p>
            As part of Shopify Sidekick, I designed multimodal interaction
            patterns that allow merchants to communicate with AI through
            multiple channels—text, voice, and screen sharing. This work focused
            on creating seamless transitions between different input modes while
            maintaining context and conversation flow.
          </p>

          <h2>Key Features</h2>
          <p>
            The multimodal experience includes voice mode for hands-free
            interactions, screen sharing for real-time step-by-step guidance,
            and natural language processing that understands merchant intent
            across 20+ languages. Each interaction mode was designed to feel
            natural and appropriate for different merchant scenarios.
          </p>

          <h2>Design Challenges</h2>
          <p>
            One of the core challenges was ensuring that switching between
            interaction modes felt seamless and that the AI could maintain
            context across different modalities. We also needed to design for
            accessibility, ensuring that voice and visual modes could work
            independently or together based on merchant preferences and needs.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}
