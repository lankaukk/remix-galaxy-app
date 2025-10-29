import { useState, useEffect } from "react";
import { Link } from "wouter";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card } from "@/components/ui/card";
import {
  ProjectDetailSkeleton,
  ProjectCardSkeleton,
} from "@/components/ui/project-card-skeleton";
import SidekickCover from "@/assets/images/shopify/sidekick-cover.png";

const PAGE_TITLE = "Shopify Sidekick";
const PAGE_DESCRIPTION =
  "Sidekick is the AI-powered assistant built into Shopify that helps merchants manage their stores through natural language. Use Sidekick to automate tasks, generate assets, and get personalized support—available across multiple devices and interaction modes.";

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
      "Creating seamless AI assistance experiences across iOS and Android mobile devices.",
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
          <h2>About the Product</h2>
          <p>
            Shopify Sidekick is an AI-powered assistant built directly into Shopify that helps merchants manage their stores through natural language, voice, and visual interactions.
          </p>

          <h2>My Contributions</h2>
          <p>
            I went from brand-new on Sidekick to owning big pieces of Mobile and Voice. I led the first real audio interaction patterns at Shopify—visualizing sound with waveforms and ripples, clear voice-active states, and motion that feels alive. I designed the core mobile chat and input, made it feel native with our hybrid webview and React Native approach, contributed voice-mode icons to Polaris, and extended into core Admin mobile navigation. Sidekick on Mobile is now in the hands of hundreds of thousands of shops with strong satisfaction, putting Sidekick where it's easy for merchants to work—on their phones.
          </p>
          <p>
            I explored broadly and iterated fast across Multimodal Sidekick and Screen Share in Admin (permissions, post-call summaries, interruption feedback), Sidekick Skills (long text, saved prompts), Knowledge Base, and the Sidekick to Help Center handoff. I excel at creative problem-solving and communication design focused on natural conversational flow, with a steep growth curve—from zero mobile product design background to shipping high-impact work at scale.
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
