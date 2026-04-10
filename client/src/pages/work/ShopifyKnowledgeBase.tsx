import { useState, useEffect } from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { ProjectDetailSkeleton } from "@/components/ui/project-card-skeleton";
import { ProjectBrief } from "@/components/ui/ProjectBrief";
import { ProjectOutcome } from "@/components/ui/ProjectOutcome";
import KnowledgeBaseCover from "@/assets/images/shopify/knowledge-base-cover.png";
import KbOverviewMobile from "@/assets/images/shopify/kb-overview-mobile.jpeg";
import KbOverviewDesktopHq from "@/assets/images/shopify/kb-overview-desktop-hq.jpeg";
import KbOverviewDesktop1 from "@/assets/images/shopify/kb-overview-desktop-1.jpeg";
import KbQueryLogEmpty from "@/assets/images/shopify/kb-query-log-empty.jpeg";
import KbQueryLogFull from "@/assets/images/shopify/kb-query-log-full.jpeg";
import KbAiAgentsHub from "@/assets/images/shopify/kb-ai-agents-hub.jpeg";

const PAGE_TITLE = "Shopify Knowledge Base";
const PAGE_DESCRIPTION =
  "View and customize the FAQs that AI shopping agents use to answer questions about your store.";

function Img({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-xl">
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
    </div>
  );
}

export default function ShopifyKnowledgeBase() {
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
        <ProjectDetailSkeleton />
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
      <div className="space-y-16">
        <div className="rounded-xl overflow-hidden shadow-xl">
          <img
            src={KnowledgeBaseCover}
            alt="Shopify Knowledge Base"
            className="w-full h-auto block"
            loading="lazy"
          />
        </div>

        <ProjectBrief
          brief="Give merchants visibility into how AI shopping agents represent their store, and the tools to customize those answers — ensuring accuracy, brand voice, and competitive differentiation in an AI-first commerce landscape."
          requirements={[
            "Surface Shopify-generated FAQs based on store settings and policies",
            "Show merchants which questions buyers are actually asking AI agents",
            "Allow merchants to create and edit custom FAQs",
            "Monitor query resolution rates and buyer inquiry trends",
            "Integrate seamlessly within the Sidekick ecosystem",
          ]}
          timePeriod="Launched March 2025"
          challenges={[
            "Designing for a new merchant mental model around AI agent representation",
            "Balancing automated FAQ generation with merchant customization",
            "Coordinating between the Sidekick merchant agent team and consumer agent teams",
            "Working within the limitations of company partnerships and external LLM capabilities — surfacing all the information we wanted to was hard",
          ]}
        />

        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">The shipped experience</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The core app gives merchants an activity dashboard — product query volume, FAQ resolution rate, top unanswered questions, and a full query log. Merchants can view Shopify-generated FAQs, add custom ones, and see exactly how AI agents are representing their store in real time.
          </p>
          <div className="rounded-xl overflow-hidden shadow-xl aspect-video">
            <iframe
              src="https://www.youtube.com/embed/22NqvJyppt8?si=fWkxvH9fNVZaGOx5"
              title="Shopify Knowledge Base"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <Img src={KbOverviewMobile} alt="Knowledge Base overview — mobile" />
          <Img src={KbOverviewDesktopHq} alt="Knowledge Base overview — desktop" />
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Monitoring AI queries</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The query log gives merchants a live feed of every question AI agents have fielded about their store — answered, unanswered, and which FAQs matched. I designed both the empty state (for new merchants just getting set up) and the populated experience showing real query traffic.
          </p>
          <div className="relative flex items-start">
            <div className="rounded-xl overflow-hidden shadow-xl w-[65%] shrink-0">
              <img src={KbQueryLogFull} alt="Query log — populated with real queries" className="w-full h-auto block" loading="lazy" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl w-[42%] shrink-0 -ml-[7%] mt-10 relative z-10">
              <img src={KbQueryLogEmpty} alt="Query log — empty state" className="w-full h-auto block" loading="lazy" />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Designing ahead of the partnership</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The bigger vision for this app — and what would make it really sing — depended on something outside our control: a live shopping partnership with ChatGPT. I designed forward-thinking dashboards showing per-agent breakdowns (ChatGPT, Anthropic, and others), plan management for each partnership, revenue attribution from AI-driven sales, and agent-specific resolution rates.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Those screens didn't ship. The technical capability and commercial agreements weren't ready in time. What did ship was a strong foundation — and the uninstall feedback has since validated exactly what I knew was missing: merchants want to know which agents are sending queries, and they want control over each relationship. That work is still ahead.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Img src={KbAiAgentsHub} alt="AI Agents Hub — ChatGPT integration" />
            <Img src={KbOverviewDesktop1} alt="Knowledge Base — FAQ queries panel" />
          </div>
        </section>

        <ProjectOutcome
          outcome="Knowledge Base launched in March 2025 and grew to 14,000+ active merchants within its first year — with strong retention and outsized adoption from high-value enterprise merchants. Uninstall feedback directly validated the forward-thinking design work: merchants want per-agent visibility and partnership controls, exactly what was designed but couldn't yet ship."
          usageData={[
            "<strong>14,000+ active merchants</strong> across 5 countries within the first year",
            "<strong>28% Shopify Plus adoption</strong> — high-value enterprise merchants make up over a quarter of the user base",
            "<strong>70–77% retention</strong> for mature cohorts, with only a ~5–7% deliberate monthly uninstall rate",
            "<strong>Design insight:</strong> Uninstall feedback confirmed the vision — merchants asked for per-agent breakdowns and partnership controls, precisely what was designed ahead of the ChatGPT partnership being ready to ship",
          ]}
        />
      </div>
    </ProjectLayout>
  );
}
