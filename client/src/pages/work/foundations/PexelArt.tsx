import { useState, useEffect } from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectDetailSkeleton } from "@/components/ui/project-card-skeleton";

export default function PexelArt() {
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
        title="Pexel Art"
        description="A digital art creation and curation platform"
        backLink="/work/foundations"
        backText="Back to Foundations"
      >
        <ProjectDetailSkeleton />
      </ProjectLayout>
    );
  }

  return (
    <ProjectLayout
      title="Pexel Art"
      description="A digital art creation and curation platform"
      backLink="/work/foundations"
      backText="Back to Foundations"
    >
      <div className="space-y-12">
        <img
          src="https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07"
          alt="Pexel Art Platform"
          className="w-full rounded-lg shadow-xl"
          loading="lazy"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold ">Vision</h3>
              <p className="">
                Create a platform that combines pixel art creation tools with
                a community-driven gallery system, making digital art more
                accessible to everyone.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold ">Implementation</h3>
              <p className="">
                Built an intuitive pixel art editor with powerful tools and
                integrated it with a social platform for sharing and discovering
                artwork.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose-lg max-w-none ">
          <h2>Key Features</h2>
          <ul>
            <li>Intuitive pixel art editor</li>
            <li>Community galleries and collections</li>
            <li>Artist collaboration tools</li>
            <li>Animation support</li>
            <li>Custom palette management</li>
          </ul>

          <h2>Impact</h2>
          <p>
            Pexel Art has grown into a vibrant community of digital artists,
            featuring thousands of unique artworks and fostering collaboration
            between creators of all skill levels.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}