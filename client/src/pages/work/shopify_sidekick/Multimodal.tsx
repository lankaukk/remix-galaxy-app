import { useState, useEffect } from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectDetailSkeleton } from "@/components/ui/project-card-skeleton";
import MultimodalAnimation from "@/components/MultimodalAnimation";
import { ProjectBrief } from "@/components/ui/ProjectBrief";
import { ProjectOutcome } from "@/components/ui/ProjectOutcome";

const PAGE_TITLE = "Multimodal Sidekick";
const PAGE_DESCRIPTION =
  "Exploring voice mode, screen sharing, and conversational AI patterns that provide natural, helpful assistance for merchants.";

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
        <MultimodalAnimation />

        <ProjectBrief
          brief="Unify Sidekick's experience across text, voice, and voice+screenshare modes, allowing merchants to seamlessly switch between interaction types within a single conversation."
          requirements={[
            "Seamless switching between text, voice, and voice+screenshare modes without losing context",
            "Single entry point for all Sidekick interactions",
            "Persistent conversation history across mode transitions",
            "Feature parity across all modes with same tools and capabilities",
            "Multi-modal conversations properly evaluated by ACE"
          ]}
          timePeriod="Q3 2025"
          challenges={[
            "Cross-team coordination across multiple teams",
            "Limited engineering resources",
            "Complex microphone and screen-sharing permission flows",
            "Managing third-party AI model constraints",
            "Securing leadership alignment across multiple stakeholders"
          ]}
        />

        <ProjectOutcome
          outcome="Successfully unified Sidekick's experience across text, voice, and voice+screenshare modes with seamless context preservation and a single entry point. Established robust evaluation processes for multimodal AI models."
          usageData={[
            "729,570 total conversations across 190,886 merchants",
            "15.1 million suggestions delivered with 75.1% apply rate and 60.2% save rate",
            "79.2% positive feedback ratio",
            "Voice features include auto-navigation, mobile support, and multilingual capabilities with automatic detection"
          ]}
        />

        <div className="prose-lg max-w-none"></div>
      </div>
    </ProjectLayout>
  );
}
