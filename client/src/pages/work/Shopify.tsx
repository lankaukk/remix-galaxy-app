import { useState, useEffect } from "react";

// Load Twitter widgets when component mounts
const loadTwitterWidgets = () => {
  if (window.twttr) {
    window.twttr.widgets.load();
  }
};
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectDetailSkeleton } from "@/components/ui/project-card-skeleton";
import ShopifyCover from "@/assets/images/shopify/sales_channels.png";

export default function Shopify() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for images and content
    const timer = setTimeout(() => {
      setIsLoading(false);
      loadTwitterWidgets();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <ProjectLayout
        title="UX Designer at Shopify"
        description="I joined Shopify when it acquired Utopia in 2022, and I currently design aspects of the core platform across various teams including Storefronts and the Channels Platform."
        backLink="/work"
        backText="All Work"
      >
        <ProjectDetailSkeleton />
      </ProjectLayout>
    );
  }

  return (
    <ProjectLayout
      title="UX Designer at Shopify"
      description="I joined Shopify when it acquired Utopia in 2022, and I currently design aspects of the core platform across various teams including Storefronts and the Channels Platform."
      backLink="/work"
      backText="All Work"
    >
      <div className="space-y-12">
        <img
          src={ShopifyCover}
          alt="Shopify Platform"
          className="w-full rounded-lg shadow-xl"
          loading="lazy"
        />

        <div className="prose-lg max-w-none">
          <h2>Process & Contributions</h2>
          <p>
             As a UX Designer at Shopify, I define and develop elegant product experiences, so that people can intuitively use our tools to help them succeed in their online business. 
          </p>
        </div>

        <div className="my-12">
          <blockquote className="twitter-tweet" data-media-max-width="560">
            <a href="https://twitter.com/Shopify/status/1805220460877038068"></a>
          </blockquote>
          <script async src="https://platform.twitter.com/widgets.js"></script>
        </div>

        {/* <div className="prose-lg max-w-none">
          <h2>Learning & Growth</h2>
          <p>
            In my role at Shopify, I emphasize system-level thinking, creating
            solutions that resonate across all layers of the experience. By
            challenging design boundaries and embracing an experimental
            approach, I contribute to a dynamic Shopify environment that evolves
            and improves continuously for its users.
          </p>
        </div> */}
      </div>
    </ProjectLayout>
  );
}
