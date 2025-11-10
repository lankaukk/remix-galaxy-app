import { useState, useEffect } from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectDetailSkeleton } from "@/components/ui/project-card-skeleton";
import MultimodalAnimation from "@/components/MultimodalAnimation";
import { ProjectBrief } from "@/components/ui/ProjectBrief";
import { ProjectOutcome } from "@/components/ui/ProjectOutcome";
import desktopEntryPointGif from "@/assets/images/shopify_sidekick/multimodal/desktop-entry-point.gif";
import mobileEntryPointVideo from "@/assets/images/shopify_sidekick/multimodal/voice-mobile-entry-point.mp4";

const PAGE_TITLE = "Multimodal Sidekick";
const PAGE_DESCRIPTION =
  "Designing a voice mode and screen sharing experience with conversational AI to provide natural, helpful assistance for merchants.";

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
            "Multi-modal conversations properly evaluated by ACE",
          ]}
          timePeriod="Q3 2025"
          challenges={[
            "Cross-team coordination across multiple teams",
            "Limited engineering resources",
            "Complex microphone and screen-sharing permission flows",
            "Managing third-party AI model constraints",
            "Securing leadership alignment across multiple stakeholders",
          ]}
        />

        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Creating an entry point
          </h2>
          <div className="space-y-4">
            <div
              className="w-full bg-muted rounded-lg aspect-video flex items-center justify-center text-muted-foreground"
              data-testid="placeholder-entry-point-gif"
            >
              <span className="text-lg">GIF: Iterations</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:h-[600px]">
              <div
                className="rounded-lg overflow-hidden mx-auto md:mx-0 w-auto md:h-full"
                style={{ aspectRatio: '9/16' }}
                data-testid="video-entry-point-mobile"
              >
                <video
                  src={mobileEntryPointVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="rounded-lg overflow-hidden md:flex-1 md:h-full"
                data-testid="image-entry-point-desktop"
              >
                <img 
                  src={desktopEntryPointGif} 
                  alt="Desktop entry point final design"
                  className="w-full h-full object-cover"
                  style={{ transform: 'scale(1.02)' }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            What is voice mode?
          </h2>
          <div
            className="w-full bg-muted rounded-lg aspect-video flex items-center justify-center text-muted-foreground"
            data-testid="placeholder-voice-mode-gif"
          >
            <span className="text-lg">GIF: Iterations</span>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Visualizing Sound
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="bg-muted rounded-lg aspect-square flex items-center justify-center text-muted-foreground"
                data-testid={`placeholder-visualizing-sound-${index}`}
              >
                <span className="text-lg">GIF {index}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Rendering cards</h2>
          <div
            className="w-full bg-muted rounded-lg aspect-video flex items-center justify-center text-muted-foreground"
            data-testid="placeholder-rendering-cards-gif"
          >
            <span className="text-lg">GIF: Full Width</span>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Speaking while navigating
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="bg-muted rounded-lg aspect-video flex flex-col items-center justify-center text-muted-foreground"
              data-testid="placeholder-speaking-desktop"
            >
              <span className="text-lg font-medium">Mobile</span>
              <span className="text-sm">GIF</span>
            </div>
            <div
              className="bg-muted rounded-lg aspect-video flex flex-col items-center justify-center text-muted-foreground"
              data-testid="placeholder-speaking-desktop"
            >
              <span className="text-lg font-medium">Desktop</span>
              <span className="text-sm">GIF</span>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Screenshare, Screenshot, and Tab Share concepts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Screenshare", "Screenshot", "Tab Share"].map(
              (concept, index) => (
                <div
                  key={index}
                  className="bg-muted rounded-lg aspect-video flex flex-col items-center justify-center text-muted-foreground"
                  data-testid={`placeholder-screenshare-${index + 1}`}
                >
                  <span className="text-lg font-medium">{concept}</span>
                  <span className="text-sm">GIF</span>
                </div>
              ),
            )}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Call summaries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="bg-muted rounded-lg aspect-video flex flex-col items-center justify-center text-muted-foreground"
              data-testid="placeholder-summaries-desktop"
            >
              <span className="text-lg font-medium">Mobile</span>
              <span className="text-sm">GIF</span>
            </div>
            <div
              className="bg-muted rounded-lg aspect-video flex flex-col items-center justify-center text-muted-foreground"
              data-testid="placeholder-summaries-desktop"
            >
              <span className="text-lg font-medium">Desktop</span>
              <span className="text-sm">GIF</span>
            </div>
          </div>
        </section>

        <ProjectOutcome
          outcome="Successfully unified Sidekick's experience across text, voice, and voice+screenshare modes with seamless context preservation and a single entry point. This first implementation of multimodal Sidekick is now available to all merchants, and enhancments will be made through smaller targeted projects."
          usageData={[
            "<strong>Massive Scale:</strong> 15M+ suggestions helping 190K+ merchants",
            "<strong>High Effectiveness:</strong> 75% apply rate, 60% save rate",
            "<strong>Strong Trust:</strong> 50% saved without edits",
            "<strong>Positive Sentiment:</strong> 79% positive feedback",
            "<strong>Improving Quality:</strong> Apply/save rates increasing month-over-month",
            "<strong>Broad Reach:</strong> Helping nearly 190K shops improve their stores",
          ]}
        />

        <div className="prose-lg max-w-none"></div>
      </div>
    </ProjectLayout>
  );
}
