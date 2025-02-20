import { Link } from "wouter";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const sections = [
  {
    title: "UI Simplification",
    description: "Streamlining complex interaction patterns into intuitive, user-friendly interfaces",
    href: "/work/utopia/ui_simplification",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07",
  },
  {
    title: "Multiplayer Features",
    description: "Real-time collaboration tools that enhance the development experience",
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
  return (
    <ProjectLayout
      title="Utopia Platform"
      description="A revolutionary design tool for building React applications visually while maintaining complete control over the code."
    >
      <div className="space-y-12">
        <img
          src="https://images.unsplash.com/photo-1586953208448-b95a79798f07"
          alt="Utopia Platform"
          className="w-full rounded-lg shadow-xl"
        />

        <div className="prose prose-lg max-w-none text-[#333333]">
          <h2>About Utopia</h2>
          <p>
            Utopia is an innovative platform that bridges the gap between design and development,
            allowing developers to create React applications through a visual interface while
            maintaining full access to the underlying code. Unlike traditional no-code tools,
            Utopia empowers developers with a unique approach that combines the immediacy of
            visual design with the flexibility of direct code manipulation.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {sections.map((section) => (
            <Link key={section.title} href={section.href}>
              <Card className="cursor-pointer transition-transform hover:scale-[1.02]">
                <CardContent className="p-0">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="aspect-video w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="mb-2 flex items-center justify-between text-xl font-bold text-[#2D2D2D]">
                      {section.title}
                      <ArrowRight className="h-5 w-5 text-[#FF5757]" />
                    </h3>
                    <p className="text-[#333333]">{section.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </ProjectLayout>
  );
}