import { useState, useEffect } from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { ProjectDetailSkeleton } from "@/components/ui/project-card-skeleton";
import PexelsArt from "@/assets/images/pexels-art.gif";

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
      description="Pexel Art is a React App that fetches from the Pexels API. The typed words serve as a search query for their database of images. Using the 'average color' attribute of the response, abstract artwork is created. 🎨"
      backLink="/work/foundations"
      backText="Back to Foundations"
    >
      <div className="space-y-12">
        <img
          src={PexelsArt}
          alt="Pexel Art Platform"
          className="w-full rounded-lg shadow-xl"
          loading="lazy"
        />
      </div>
    </ProjectLayout>
  );
}
