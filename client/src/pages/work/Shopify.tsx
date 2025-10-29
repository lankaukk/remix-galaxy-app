import { useState, useEffect } from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectDetailSkeleton } from "@/components/ui/project-card-skeleton";
import ShopifyCover from "@/assets/images/shopify/sales_channels.png";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
  }
}

const loadTwitterWidgets = () => {
  if (window.twttr) {
    window.twttr.widgets.load();
  }
};

const PAGE_TITLE = "Senior Product Designer at Shopify";
const PAGE_DESCRIPTION = "Designing intuitive, accessible experiences for Shopify's core platform, from Storefronts to the Channels Platform.";

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
          src={ShopifyCover}
          alt="Shopify Platform"
          className="w-full rounded-lg shadow-xl"
          loading="lazy"
        />

        <div className="prose-lg max-w-none">
          <h2>About the Product</h2>
          <p>
            Shopify empowers merchants to build and scale their online businesses through an integrated commerce platform.
          </p>

          <h2>My Contributions</h2>
          <p>
            I joined Shopify when it acquired Utopia in 2022, and currently design core platform experiences across Storefronts and the Channels Platform. My approach emphasizes system-level thinking, exploring multiple design directions to find elegant solutions while maintaining pixel-perfect craft from prototype through release. I collaborate closely with cross-functional teams, using storytelling to validate solutions with users and influence decisions at all levels. By challenging existing standards and pushing boundaries, I create stylish, intuitive, and accessible experiences that help merchants succeed—always treating requirements as a floor and raising the ceiling through ambitious, well-crafted design.
          </p>
        </div>

        <div className="my-12">
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl">
            <iframe
              src="https://www.shopify.com/editions/summer2024#hydrogen-visual-editor-top-10"
              className="w-full h-full"
              allow="autoplay; fullscreen"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="my-12 border border-gray-700 rounded-lg p-4">
          {" "}
          {/* Added border */}
          <a href="https://twitter.com/Shopify/status/1805220460877038068?ref_src=twsrc%5Etfw">
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">
                🧑‍💻 Hydrogen Visual Editor powered by Utopia
                <br />
                <br />
                Announced today: Merchants can maximize efficiency by letting
                non-technical staff visually build headless storefronts and
                collaborate in a single tool to design, develop, and merchandise
                their stores.{" "}
                <a href="https://t.co/BCbZqNUuzS">
                  <image href=" pic.twitter.com/BCbZqNUuzS" />
                </a>
              </p>
              &mdash; Shopify (@Shopify) June 24, 2024
            </blockquote>
          </a>
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          ></script>
        </div>
      </div>
    </ProjectLayout>
  );
}
