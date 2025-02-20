import { Link } from "wouter";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Typography System",
    description: "Comprehensive type scale and hierarchy for digital interfaces",
    href: "/work/foundations/typo",
    image: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec",
  },
  {
    title: "Journal App",
    description: "Minimal writing experience focused on clarity and ease of use",
    href: "/work/foundations/journal_app",
    image: "https://images.unsplash.com/photo-1660592868727-858d28c3ba52",
  },
  {
    title: "Blank Canvas",
    description: "Experimental design space for creative exploration",
    href: "/work/foundations/blank",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
  },
  {
    title: "Pexel Art",
    description: "Digital art creation and curation platform",
    href: "/work/foundations/pexel_art",
    image: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07",
  },
  {
    title: "No Likes",
    description: "Social media reimagined without vanity metrics",
    href: "/work/foundations/no_likes",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
  },
  {
    title: "Robot Pigeon",
    description: "Playful AI-driven message delivery system",
    href: "/work/foundations/robot_pigeon",
    image: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7",
  },
  {
    title: "Modern Potions",
    description: "E-commerce redesign for artisanal beverages",
    href: "/work/foundations/modern_potions",
    image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64",
  },
  {
    title: "Protest Platform",
    description: "Digital toolkit for organizing social movements",
    href: "/work/foundations/protest_platform",
    image: "https://images.unsplash.com/photo-1591625677520-65c9b8016a31",
  },
];

export default function Foundations() {
  return (
    <ProjectLayout
      title="Design Foundations"
      description="A collection of experimental projects exploring different aspects of digital design and user experience."
    >
      <div className="space-y-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.title} href={project.href}>
              <Card className="cursor-pointer transition-transform hover:scale-[1.02]">
                <CardContent className="p-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="aspect-video w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="mb-2 flex items-center justify-between text-xl font-bold text-[#2D2D2D]">
                      {project.title}
                      <ArrowRight className="h-5 w-5 text-[#FF5757]" />
                    </h3>
                    <p className="text-[#333333]">{project.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="prose prose-lg max-w-none text-[#333333]">
          <h2>Design System Principles</h2>
          <p>
            Each project in this collection represents a unique exploration of design
            principles, user interaction patterns, and innovative solutions to
            real-world challenges. These experiments inform our broader understanding
            of digital design and help shape future projects.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}