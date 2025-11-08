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
          outcome="Voice capabilities fully integrated and rolled out to all merchants with strong adoption and positive feedback. Established a robust process for evaluating and adopting new multimodal models from OpenAI and Google."
          designTradeoffs="Selected the 'Puck' voice from Google Gemini for its near-gender-neutral tone and superior tool-calling capabilities. Screenshare remained separate based on leadership feedback, though it uses the same infrastructure."
          usageData="Delivered seamless text-to-voice switching, persistent context, unified entry point, and ACE integration. Voice features include auto-navigation, mobile support, multilingual capabilities with automatic detection, and visual feedback. ACE scores for voice are still below text mode but showing improvement."
        />

        <div className="prose-lg max-w-none"></div>
      </div>
    </ProjectLayout>
  );
}
