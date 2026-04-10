import { useState, useEffect } from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { ProjectDetailSkeleton } from "@/components/ui/project-card-skeleton";
import { ProjectBrief } from "@/components/ui/ProjectBrief";
import { ProjectOutcome } from "@/components/ui/ProjectOutcome";
import KnowledgeBaseCover from "@/assets/images/shopify/knowledge-base-cover.png";

const PAGE_TITLE = "Shopify Knowledge Base";
const PAGE_DESCRIPTION =
  "View and customize the FAQs that AI shopping agents use to answer questions about your store.";

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
      <div className="space-y-12">
        <img
          src={KnowledgeBaseCover}
          alt="Shopify Knowledge Base"
          className="w-full rounded-lg shadow-xl"
          loading="lazy"
        />

        <ProjectBrief
          brief="Give merchants visibility into how AI shopping agents represent their store, and the tools to customize those answers — ensuring accuracy, brand voice, and competitive differentiation in an AI-first commerce landscape."
          requirements={[
            "Surface Shopify-generated FAQs based on store settings and policies",
            "Show merchants which questions buyers are actually asking AI agents",
            "Allow merchants to create and edit custom FAQs",
            "Monitor query resolution rates and buyer inquiry trends",
            "Integrate seamlessly within the Sidekick ecosystem",
          ]}
          timePeriod="Q4 2024"
          challenges={[
            "Designing for a new merchant mental model around AI agent representation",
            "Balancing automated FAQ generation with merchant customization",
            "Surfacing meaningful data without overwhelming merchants",
            "Coordinating between the Sidekick merchant agent team and consumer agent teams",
            "Working within the limitations of company partnerships and external LLM capabilities — surfacing all the information we wanted to was hard",
          ]}
        />

        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl">
            <iframe
              src="https://www.youtube.com/embed/22NqvJyppt8?si=fWkxvH9fNVZaGOx5"
              title="Shopify Knowledge Base"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>

        <div className="prose-lg max-w-none">
          <h2>About the Product</h2>
          <p>
            AI agents are changing how people shop online. When shoppers use AI
            agents to search for products or ask about store policies, Shopify
            provides answers based on your store's catalog and settings.
            Knowledge Base lets you view how often your store's info is
            requested by AI agents and customize FAQs to ensure AI represents
            your brand accurately and highlights what makes your business
            unique. See what buyers are asking, so you can provide the answers
            they're looking for.
          </p>
          <ul>
            <li>
              View Shopify-generated FAQs based on your store's settings and
              policies.
            </li>
            <li>Monitor buyer inquiries about your store.</li>
            <li>
              Create custom FAQs to address a wider array of buyer questions.
            </li>
          </ul>

          <h2>My Contributions</h2>
          <p>
            I designed the Shopify Knowledge Base app as part of my work on
            Sidekick's multimodal features. This included designing the FAQ
            management interface, the inquiry monitoring dashboard, and the
            custom FAQ creation flow — giving merchants clear visibility into
            how AI agents represent their store and full control over the
            answers shoppers receive.
          </p>
        </div>

        <ProjectOutcome
          outcome="Knowledge Base shipped as a free Shopify app, giving merchants their first direct window into how AI agents represent their store. The app enables merchants to view, monitor, and customize the FAQs that power AI shopping interactions across the web."
          usageData={[
            "<strong>Free to all merchants:</strong> Available on the Shopify App Store at no cost",
            "<strong>AI-ready:</strong> Directly influences how AI shopping agents answer buyer questions",
            "<strong>Merchant control:</strong> Custom FAQs allow brands to define their own voice and accuracy",
            "<strong>Real-time monitoring:</strong> Live query volume and resolution rate tracking",
          ]}
        />
      </div>
    </ProjectLayout>
  );
}
