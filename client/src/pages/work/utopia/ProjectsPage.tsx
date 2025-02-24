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
              <h3 className="mb-4 text-xl font-bold ">Vision</h3>
              <p className="">
                Create an intuitive project management interface that helps teams
                organize and track their React applications, components, and
                resources effectively.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold ">Achievement</h3>
              <p className="">
                Developed a comprehensive project dashboard that provides clear
                visibility into project status, team activity, and component
                libraries while maintaining an organized workspace.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose-lg max-w-none ">
          <h2>Key Features</h2>
          <ul>
            <li>Project templates and quick-start options</li>
            <li>Component library management</li>
            <li>Team activity tracking</li>
            <li>Project analytics and insights</li>
            <li>Resource organization tools</li>
          </ul>

          <h2>Impact</h2>
          <p>
            The projects page has become a central hub for team collaboration,
            providing clear organization and easy access to all project resources.
            Teams report improved project visibility and faster onboarding for
            new team members.
          </p>
        </div>
        <Link href="/work/utopia" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Utopia
        </Link>
      </div>
    </ProjectLayout>
  );
}