import { Link } from "wouter";
import { useState, useEffect } from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { ProjectCardSkeleton } from "@/components/ui/project-card-skeleton";

const projects = [
  {
    title: "Typo App",
    description: "Web app for creating typographic compositions",
    href: "/work/foundations/typo",
    image: "https://mckayla.com/images/typo-posters.jpg",
  },
  {
    title: "Journal App",
    description:
      "Mobile App Design and Prototype for an ExpressiveJournaling App",
    href: "/work/foundations/journal_app",
    image: "https://mckayla.com/images/journal-mockup.jpg",
  },
  {
    title: "_blank",
    description:
      "Digital Experience exploring contemporary social media consumption",
    href: "/work/foundations/blank",
    image: "https://mckayla.com/images/projects/blank/install.gif",
  },
  {
    title: "Pexel Art",
    description:
      "Type a word, and see the average color of the image search results in a new pixelated visual",
    href: "/work/foundations/pexel_art",
    image: "../../assets/images/pexel-art.png",
  },
  {
    title: "No Likes",
    description: "Chrome extension to remove likes on Instagram",
    href: "/work/foundations/no_likes",
    image: "../../assets/images/ig-likes.gif",
  },
  {
    title: "Robot Pigeon",
    description: "Snapchat Lens to support the Birds Aren't Real Movement",
    href: "/work/foundations/robot_pigeon",
    image: "../../assets/images/pigeon-square.png",
  },
  {
    title: "Modern Potions",
    description: "Editorial Design and Production for a Magic Potions Catalog",
    href: "/work/foundations/modern_potions",
    image: "../../assets/images/potions-catalog-cover-square.jpg",
  },
  {
    title: "Protest Platform",
    description: "UI Design for a Social Media Platform for Protesting",
    href: "/work/foundations/protest_platform",
    image: "../../assets/images/protest-platform/protest-platform-map.gif",
  },
];

export default function Foundations() {
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
      <ArrowLeft className="mr-2 h-4 w-4" /> All Work
    </Link>
  );

  return (
    <ProjectLayout
      title="Design Foundations"
      description={
        <>
          A collection of projects developed during my studies in the
          Communication Design Program at{" "}
          <span className="text-primary">
            <a
              href="https://www.parsons.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Parsons School of Design
            </a>
          </span>{" "}
          and the Software Engineering Program at{" "}
          <span className="text-primary">
            <a
              href="https://flatironschool.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Flatiron School
            </a>
          </span>
          .
        </>
      }
      backLink="/work"
      backText="All Work"
    >
      <div className="space-y-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array(8)
                .fill(0)
                .map((_, index) => <ProjectCardSkeleton key={index} />)
            : projects.map((project) => (
                <Link key={project.title} href={project.href}>
                  <Card className="cursor-pointer transition-transform hover:scale-[1.02]">
                    <CardContent className="p-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="aspect-video w-full object-cover"
                        loading="lazy"
                      />
                      <div className="p-6">
                        <h3 className="mb-2 flex items-center justify-between text-xl font-bold">
                          {project.title}
                          <ArrowRight className="h-5 w-5" />
                        </h3>
                        <p className="text-muted-foreground">
                          {project.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
        </div>
        {backButton}
      </div>
    </ProjectLayout>
  );
}
