
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
  return (
    <ProjectLayout
      title="Projects Page"
      description="A comprehensive project management system for React applications"
      backLink="/work/utopia"
      backText="Back to Utopia"
    >
      <div className="space-y-12">
        <img
          src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d"
          alt="Projects Page"
          className="w-full rounded-lg shadow-xl"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold">Vision</h3>
              <p>
                Like any good creative tool, Utopia needs a dedicated space for users
                to see and organize all of their projects. This became especially
                important with multiplayer functionality, helping users distinguish
                between collaborative and private projects.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold">Implementation</h3>
              <p>
                The project evolved from a basic page to a robust Remix-based
                application capable of handling extensive datasets and advanced
                functionality. We leveraged Radix UI components for consistency
                and built-in theme support, alongside Vanilla Extract for custom
                styling where needed.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose-lg max-w-none">
          <h2>Key Features</h2>
          <ul>
            <li>Fully responsive design across all devices</li>
            <li>Dark and light theme support</li>
            <li>Advanced sorting and filtering options</li>
            <li>List and grid view layouts</li>
            <li>Project categorization system</li>
          </ul>

          <h2>Project Visibility</h2>
          <p>
            A cornerstone feature of the Projects Page is the ability to set project
            visibility to Public, Private, or Collaborative. Users can manage access
            levels through an intuitive sharing dialog, which includes visibility
            settings, shareable project links, and collaborator management.
          </p>

          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
            alt="Project Collaboration Interface"
            className="my-8 w-full rounded-lg shadow-xl"
          />
        </div>

        <Link
          href="/work/utopia"
          className="inline-flex items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Utopia
        </Link>
      </div>
    </ProjectLayout>
  );
}
