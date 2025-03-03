import { useState, useEffect } from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectDetailSkeleton } from "@/components/ui/project-card-skeleton";

export default function Shopify() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for images and content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <ProjectLayout
        title="UX Designer at Shopify"
        description="Defining and crafting elegant user experiences, so merchants can intuitively use the products and services we create at Shopify to help them win."
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
      description="Defining and crafting elegant user experiences, so merchants can intuitively use the products and services we create at Shopify to help them win."
      backLink="/work"
      backText="All Work"
    >
      <div className="space-y-12">
        <img
          src="https://media.graphassets.com/53cwIkkyTGCGg2faP1WY"
          alt="Shopify Platform"
          className="w-full rounded-lg shadow-xl"
          loading="lazy"
        />

        <div className="prose-lg max-w-none">
          <h2>Process & Contributions</h2>
          <p>
            I joined Shopify when it acquired Utopia in 2022, and I currently
            design aspects of the core platform across teams. Through applying
            Shopify's UX Principles and prototyping solutions, I validate
            enhancements via iterative feedback and testing. This work results
            in a more stylish, intuitive platform that aligns with business
            needs and exceeds user expectations.
          </p>
        </div>

        <div className="prose-lg max-w-none">
          <h2>Learning & Growth</h2>
          <p>
            In my role at Shopify, I emphasize system-level thinking, creating
            solutions that resonate across all layers of the experience. By
            challenging design boundaries and embracing an experimental
            approach, I contribute to a dynamic Shopify environment that evolves
            and improves continuously for its users.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}
