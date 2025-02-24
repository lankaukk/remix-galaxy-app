
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function UiSimplification() {
  return (
    <ProjectLayout
      title="UI Simplification"
      description="Redesigning Utopia's interface to create a more welcoming and flexible development environment"
      backLink="/work/utopia"
      backText="Back to Utopia"
    >
      <div className="space-y-12">
        <img
          src="https://images.unsplash.com/photo-1586953208448-b95a79798f07"
          alt="Utopia UI Transformation"
          className="w-full rounded-lg shadow-xl"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold">Challenge</h3>
              <p className="">
                Utopia's original interface had become cluttered with panels 
                stretched to screen edges, an overwhelming toolbar, and a design
                that felt intimidating to newcomers. We needed to transform it
                into a more welcoming space that served both explorers and experts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold">Solution</h3>
              <p className="">
                We reimagined the interface with a modern floating panel system
                that empowers users to customize their workspace. The new design
                emphasizes flexibility while maintaining professional functionality.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose-lg max-w-none">
          <h2>Personalized Workspace</h2>
          <p>
            Utopia is for everyone, and everyone works differently. The new UI
            embraces this philosophy by allowing complete customization of the
            workspace. Users can reorder, resize, or close panels based on their
            needs - whether they prefer a minimal interface focused on design or
            a full-featured development environment.
          </p>

          <img
            src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e"
            alt="Customizable Workspace"
            className="my-8 w-full rounded-lg shadow-xl"
          />

          <h2>Design Inspiration</h2>
          <p>
            Drawing inspiration from contemporary tools like Spline and tldraw,
            we implemented a floating panel system that elevates UI elements above
            the canvas. This visual hierarchy creates a fresh, modern feel while
            improving workspace organization.
          </p>
          
          <p>
            Following Framer's lead, we transformed the toolbar into an intelligent
            communication hub, displaying context-aware messages and organizing
            different interaction modes. Each mode - edit, text, insert, play, and
            comment - features its own distinctive cursor, enhancing the user
            experience.
          </p>

          <h2>Technical Implementation</h2>
          <p>
            The development process presented unique challenges, particularly in
            creating an intuitive drag-and-drop system for panel management. Our
            engineering team, led by Balazs and Eni, developed an innovative
            solution using an invisible grid system combined with React's
            drag-and-drop library, resulting in seamless panel reorganization.
          </p>

          <div className="my-12 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-bold">Before</h3>
              <img
                src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb"
                alt="Original Interface"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h3 className="mb-4 text-xl font-bold">After</h3>
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                alt="Redesigned Interface"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
        
        <Link href="/work/utopia" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Utopia
        </Link>
      </div>
    </ProjectLayout>
  );
}
