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
        description="As a UX Designer at Shopify, I define and develop elegant product experiences, so that people can intuitively use our tools to help them succeed in their online business."
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
      description="As a UX Designer at Shopify, I define and develop elegant product experiences, so that people can intuitively use our tools to help them succeed in their online business."
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
            I joined Shopify when it acquired Utopia in 2022, and I currently
            design aspects of the core platform across various teams including
            Storefronts and the Channels Platform.
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
