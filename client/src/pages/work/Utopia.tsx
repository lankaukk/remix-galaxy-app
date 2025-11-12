import { useState, useEffect } from "react";
import { Link } from "wouter";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card } from "@/components/ui/card";
import {
  ProjectDetailSkeleton,
  ProjectCardSkeleton,
} from "@/components/ui/project-card-skeleton";
import utopiaUiCover from "@/assets/images/utopia/utopia-ui-cover.png";
import uiSimplificationImage from "@/assets/images/utopia/ui-simplification.png";
import multiplayerImage from "@/assets/images/utopia/multiplayer.png";
import projectsPageImage from "@/assets/images/utopia/projects-page.png";

const PAGE_TITLE = "Utopia";
const PAGE_DESCRIPTION = "Utopia is an integrated design and development environment for React. It uses React code as the source of truth, and lets you make real time changes to components by editing your app visually and using a suite of familiar design tools.";

const sections = [
  {
    title: "UI Simplification",
    description:
      "Interface redesign to create a more intuitive and flexible development environment",
    href: "/work/utopia/ui_simplification",
    image: uiSimplificationImage,
  },
  {
    title: "Multiplayer Features",
    description:
      "Real-time collaboration tools that enhance the development experience",
    href: "/work/utopia/multiplayer",
    image: multiplayerImage,
  },
  {
    title: "Projects Page",
    description: "Efficient project management and organization system",
    href: "/work/utopia/projects_page",
    image: projectsPageImage,
  },
];

export default function Utopia() {
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
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
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
          src={utopiaUiCover}
          alt="Utopia Platform"
          className="w-full rounded-lg shadow-xl"
          loading="lazy"
        />

        <div className="prose-lg max-w-none">
          <h2>About the product</h2>
          <p>
            Utopia is a revolutionaly web software that bridges the gap between
            design and development, allowing developers to create React
            applications through a visual interface while maintaining full
            access to the underlying code. Utopia empowers developers with a
            unique approach that combines the immediacy of visual design with
            the flexibility of direct code manipulation.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
