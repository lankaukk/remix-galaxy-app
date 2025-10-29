import { useState, useEffect } from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectDetailSkeleton } from "@/components/ui/project-card-skeleton";

const PAGE_TITLE = "Multimodal Sidekick";
const PAGE_DESCRIPTION = "Exploring voice, screen sharing, skills, and conversational AI patterns that create natural, helpful interactions for merchants";

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
          <h2>Screen Share in Admin</h2>
          <p>
            I designed the Screen Share experience within Shopify Admin, tackling complex flows around permissions, post-call summaries, and interruption feedback. This feature enables real-time collaborative support, allowing Sidekick to guide merchants through tasks visually while maintaining clear communication about what's happening during the session.
          </p>

          <h2>Sidekick Skills</h2>
          <p>
            I explored and designed Sidekick Skills features, including long text handling and saved prompts. These capabilities help merchants work more efficiently by enabling them to save frequently used queries and manage longer, more complex interactions with the AI assistant.
          </p>

          <h2>Knowledge Base & Help Center</h2>
          <p>
            I worked on the Knowledge Base integration and designed the handoff from Sidekick to the Help Center, ensuring merchants can seamlessly transition between AI assistance and traditional help resources. This creates a unified support experience where merchants get help in the format that works best for their specific needs.
          </p>

          <h2>Conversational Design</h2>
          <p>
            Throughout these features, I focused on natural conversational flow and communication design. I excel at creative problem-solving that makes complex AI interactions feel intuitive and human, iterating quickly across multiple features to find the right balance between capability and simplicity.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}
