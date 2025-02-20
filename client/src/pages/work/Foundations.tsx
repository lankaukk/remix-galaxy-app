import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";

const projects = [
  {
    title: "Typography System",
    description: "Comprehensive type scale and hierarchy",
    image: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec",
  },
  {
    title: "Journal App",
    description: "Minimal writing experience",
    image: "https://images.unsplash.com/photo-1660592868727-858d28c3ba52",
  },
  {
    title: "Modern Potions",
    description: "E-commerce product showcase",
    image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64",
  },
];

export default function Foundations() {
  return (
    <ProjectLayout
      title="Design Foundations"
      description="Core design principles and components that form the foundation of our design system."
    >
      <div className="space-y-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.title}>
              <CardContent className="p-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="aspect-video w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-[#2D2D2D]">
                    {project.title}
                  </h3>
                  <p className="text-[#333333]">{project.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="prose prose-lg max-w-none text-[#333333]">
          <h2>Design System Principles</h2>
          <p>
            Our design system is built on the principles of consistency,
            accessibility, and scalability. Each component is carefully crafted
            to work harmoniously within the larger ecosystem while maintaining
            its individual purpose and functionality.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}
