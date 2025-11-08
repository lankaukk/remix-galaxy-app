import { useState, useEffect } from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectDetailSkeleton } from "@/components/ui/project-card-skeleton";
import MultimodalAnimation from "@/components/MultimodalAnimation";
import { ProjectBrief } from "@/components/ui/ProjectBrief";

const PAGE_TITLE = "Multimodal Sidekick";
const PAGE_DESCRIPTION =
  "Exploring voice, screen sharing, skills, and conversational AI patterns that create natural, helpful interactions for merchants";

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
        <ProjectBrief
          brief="Design the voice interaction experience for Shopify Sidekick—Shopify's first voice-enabled AI assistant. Merchants can now speak naturally to get real-time help and navigate the admin interface hands-free."
          requirements="Create an intuitive voice interface with clear visual feedback showing when the user is speaking and when Sidekick is responding. Implement the 'Puck' voice from Google Gemini, chosen for its near-gender-neutral tone that aligns with Shopify's brand and its superior tool-calling capabilities."
          timePeriod="2024"
          challenges={`Cross-team coordination between Screen Share and Sidekick teams
Limited engineering resources
Complex microphone and screen-sharing permission flows
Managing third-party AI model constraints
Securing leadership alignment across multiple stakeholders`}
        />

        <MultimodalAnimation />

        <div className="prose-lg max-w-none"></div>
      </div>
    </ProjectLayout>
  );
}
