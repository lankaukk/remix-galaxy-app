import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card } from "@/components/ui/card";
import {
  ProjectDetailSkeleton,
  ProjectCardSkeleton,
} from "@/components/ui/project-card-skeleton";

const sections = [
  {
    title: "UI Simplification",
    description:
      "Interface redesign to create a more intuitive and flexible development environment",
    href: "/work/utopia/ui_simplification",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07",
  },
  {
    title: "Multiplayer Features",
    description:
      "Real-time collaboration tools that enhance the development experience",
    href: "/work/utopia/multiplayer",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
  },
  {
    title: "Projects Page",
    description: "Efficient project management and organization system",
    href: "/work/utopia/projects_page",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d",
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

  const backButton = (
    <Link
      href="/work"
      className="inline-flex items-center text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      All Work
    </Link>
  );

  if (isLoading) {
    return (
      <ProjectLayout
        title="Utopia"
        description="Utopia is an integrated design and development environment for React. It uses React code as the source of truth, and lets you make real time changes to components by editing your app visually and using a suite of familiar design tools."
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
          {backButton}
        </div>
      </ProjectLayout>
    );
  }

  return (
    <ProjectLayout
      title="Utopia"
      description="Utopia is an integrated design and development environment for React. It uses React code as the source of truth, and lets you make real time changes to components by editing your app visually and using a suite of familiar design tools."
      backLink="/work"
      backText="All Work"
    >
      <div className="space-y-12">
        <img
          src="https://user-images.githubusercontent.com/2226774/93580752-7b7b8e80-f9a0-11ea-8663-39683a53df2e.png"
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
        {backButton}
      </div>
    </ProjectLayout>
  );
}
