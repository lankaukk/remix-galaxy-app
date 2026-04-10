import { useState, useEffect } from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { ProjectDetailSkeleton } from "@/components/ui/project-card-skeleton";
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
            custom FAQ creation flow—giving merchants clear visibility into how
            AI agents represent their store and full control over the answers
            shoppers receive.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}
