import { useState, useEffect } from "react";
import { Link } from "wouter";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card } from "@/components/ui/card";
import {
  ProjectDetailSkeleton,
  ProjectCardSkeleton,
} from "@/components/ui/project-card-skeleton";
import SidekickCover from "@/assets/images/shopify/sidekick-cover.png";
import SidekickMobileCover from "@/assets/images/shopify/sidekick-mobile-cover.png";
import MultimodalAnimation from "@/components/MultimodalAnimation";

const PAGE_TITLE = "Shopify Sidekick";
const PAGE_DESCRIPTION =
  "Sidekick is the AI-powered assistant built into Shopify that helps merchants manage their stores through natural language. Use Sidekick to automate tasks, generate assets, and get personalized support—available across multiple devices and interaction modes.";

const sections = [
  {
    title: "Multimodal",
    description:
      "Designing conversational AI experiences with voice, screen sharing, and natural language understanding",
    href: "/work/shopify_sidekick/multimodal",
    useAnimation: true,
  },
  {
    title: "Mobile",
    description:
      "Creating seamless AI assistance experiences across iOS and Android mobile devices.",
    href: "/work/shopify_sidekick/mobile",
    image: SidekickMobileCover,
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
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
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
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
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
          <h2>My Contributions</h2>
          <p>
            I led mobile and voice design for Sidekick, creating the first audio
            interaction patterns at Shopify with waveforms, voice-active states,
            and responsive motion. I designed the core mobile chat experience,
            contributed voice-mode icons to{" "}
            <a href="https://polaris-react.shopify.com/" target="_blank">
              Shopify's Polaris design system
            </a>
            , and extended the design into Admin mobile navigation. On
            multimodal features, I designed screen sharing flows, Sidekick
            Skills, the Knowledge Base app integration, and the Help Center
            handoff. This work is now serving hundreds of thousands of merchants
            with strong satisfaction scores.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {sections.map((section) => (
            <Link key={section.title} href={section.href}>
              <Card className="cursor-pointer transition-transform hover:scale-[1.02]">
                {section.useAnimation ? (
                  <MultimodalAnimation />
                ) : (
                  <img
                    src={section.image}
                    alt={section.title}
                    className="aspect-video w-full object-cover"
                  />
                )}
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
