import { useState, useEffect } from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectDetailSkeleton } from "@/components/ui/project-card-skeleton";

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
        title="Mobile AI Assistant"
        description="Creating seamless AI assistance experiences across mobile devices"
        backLink="/work/shopify_sidekick"
        backText="Shopify Sidekick"
      >
        <ProjectDetailSkeleton />
      </ProjectLayout>
    );
  }

  return (
    <ProjectLayout
      title="Mobile AI Assistant"
      description="Creating seamless AI assistance experiences across mobile devices"
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
          <h2>Overview</h2>
          <p>
            Bringing Shopify Sidekick to mobile required reimagining the AI
            assistant experience for smaller screens and touch interfaces. I
            designed optimized layouts and interaction patterns that make it
            easy for merchants to get help and complete tasks while on the go.
          </p>

          <h2>Mobile-First Design</h2>
          <p>
            The mobile experience prioritizes quick access to Sidekick from any
            page in the Shopify admin, with a chat interface optimized for
            one-handed use. Touch-friendly controls, streamlined task flows, and
            smart suggestions help merchants accomplish their goals efficiently
            on mobile devices.
          </p>

          <h2>Context & Continuity</h2>
          <p>
            A key focus was ensuring continuity between desktop and mobile
            experiences. Merchants can start a conversation on desktop and
            continue it on mobile, or vice versa. The AI maintains full context
            and conversation history across devices, providing a truly seamless
            cross-platform experience.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}
