import { useState, useEffect } from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { ProjectDetailSkeleton } from "@/components/ui/project-card-skeleton";
import SidekickCover from "@/assets/images/shopify/sidekick-cover.png";

export default function ShopifySidekick() {
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
        title="Senior UX Designer on Sidekick"
        description="Your AI commerce assistant"
        backLink="/work"
        backText="All Work"
      >
        <ProjectDetailSkeleton />
      </ProjectLayout>
    );
  }

  return (
    <ProjectLayout
      title="Senior UX Designer on Sidekick"
      description="Your AI commerce assistant"
      backLink="/work"
      backText="All Work"
    >
      <div className="space-y-12">
        <img
          src={SidekickCover}
          alt="Shopify Sidekick"
          className="w-full rounded-lg shadow-xl"
          loading="lazy"
        />

        <div className="prose-lg max-w-none">
          <h2>About Sidekick</h2>
          <p>
            Sidekick is your AI commerce assistant, designed to help merchants
            navigate and optimize their Shopify experience.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}
