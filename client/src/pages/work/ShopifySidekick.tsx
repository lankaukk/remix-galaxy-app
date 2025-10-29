import { useState, useEffect } from "react";
import { Link } from "wouter";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card } from "@/components/ui/card";
import {
  ProjectDetailSkeleton,
  ProjectCardSkeleton,
} from "@/components/ui/project-card-skeleton";
import SidekickCover from "@/assets/images/shopify/sidekick-cover.png";

const sections = [
  {
    title: "Multimodal",
    description:
      "Designing conversational AI experiences with voice, screen sharing, and natural language understanding",
    href: "/work/shopify_sidekick/multimodal",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008",
  },
  {
    title: "Mobile",
    description:
      "Creating seamless AI assistance experiences across mobile devices and touch interfaces",
    href: "/work/shopify_sidekick/mobile",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
  },
];

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
        title="Shopify Sidekick"
        description="Sidekick is an AI-powered commerce assistant built into Shopify that helps merchants manage their stores through natural language, automate tasks, and get personalized support—available across multiple devices and interaction modes."
        backLink="/work"
        backText="All Work"
      >
        <div className="space-y-12">
          <ProjectDetailSkeleton />
          <div className="grid gap-8 md:grid-cols-2">
            {[1, 2].map((i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </ProjectLayout>
    );
  }

  return (
    <ProjectLayout
      title="Shopify Sidekick"
      description="Sidekick is an AI-powered commerce assistant built into Shopify that helps merchants manage their stores through natural language, automate tasks, and get personalized support—available across multiple devices and interaction modes."
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
          <h2>About the product</h2>
          <p>
            Shopify Sidekick represents the future of declarative commerce,
            where merchants describe what they want and AI handles the
            execution. As a Senior UX Designer on the Sidekick team, I focus on
            creating intuitive, accessible AI experiences that empower merchants
            to manage their stores effortlessly through conversation, voice, and
            visual interactions.
          </p>
          <p>
            Sidekick integrates directly into the Shopify admin, providing
            real-time help, task automation, content generation, and strategic
            insights—all through natural language interactions available in 20+
            languages.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {sections.map((section) => (
            <Link key={section.title} href={section.href}>
              <Card className="cursor-pointer transition-transform hover:scale-[1.02]">
                <img
                  src={section.image}
                  alt={section.title}
                  className="aspect-video w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{section.title}</h3>
                  <p className="text-muted-foreground">{section.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </ProjectLayout>
  );
}
