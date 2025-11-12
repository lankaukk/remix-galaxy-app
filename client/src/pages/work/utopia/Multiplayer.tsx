import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import multiplayerImage from "@/assets/images/utopia/multiplayer.png";

export default function Multiplayer() {
  return (
    <ProjectLayout
      title="Multiplayer Features"
      description="Enabling real-time collaboration in React development"
      backLink="/work/utopia"
      backText="Back to Utopia"
    >
      <div className="space-y-12">
        <img
          src={multiplayerImage}
          alt="Multiplayer Features"
          className="w-full rounded-lg shadow-xl"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold">Vision</h3>
              <p>
                Create a collaborative environment where everyone, regardless of their role,
                can contribute meaningfully to live applications. Our approach brings the
                spirit of gaming industry tools like Unity into web development.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold">Experience</h3>
              <p>
                Similar to Figma's collaborative features, but with a crucial difference:
                in Utopia, your designs are immediately backed by production-ready code,
                creating a seamless design-to-development workflow.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose-lg max-w-none">
          <h2>Smart Collaboration Features</h2>
          <p>
            A unique challenge we faced was handling multiplayer cursors across different
            pages. Unlike Figma's separate "play-mode" tab, Utopia lets you navigate through
            different routes directly on the canvas. We solved this by showing cursors at
            lower opacity when users are on different pages, maintaining presence awareness
            while clearly indicating different viewports.
          </p>

          <div
            className="my-8 w-full bg-muted rounded-lg aspect-video flex items-center justify-center text-muted-foreground"
            data-testid="placeholder-cursors"
          >
            <span className="text-lg">Multiplayer Cursors</span>
          </div>

          <h2>Working with Constraints</h2>
          <p>
            For comment indicators and threads, we leveraged Liveblocks' third-party
            components to accelerate development. While this meant adapting our original
            designs, we successfully modified the components to maintain consistency with
            our interface while working within the library's constraints.
          </p>

          <div className="my-12 grid gap-8 md:grid-cols-2">
            <div
              className="bg-muted rounded-lg aspect-video flex items-center justify-center text-muted-foreground"
              data-testid="placeholder-explorations"
            >
              <span className="text-lg">Design Explorations</span>
            </div>
            <div
              className="bg-muted rounded-lg aspect-video flex items-center justify-center text-muted-foreground"
              data-testid="placeholder-implementation"
            >
              <span className="text-lg">Implementation</span>
            </div>
          </div>

          <h2>Thoughtful Color Design</h2>
          <p>
            The multiplayer cursor color palette was carefully chosen to maintain
            consistency across both dark and light themes. We created a
            perceptually-uniform color set that ensures good contrast in all contexts
            while avoiding any implied hierarchy through color choices.
          </p>

          <div
            className="my-8 w-full bg-muted rounded-lg aspect-video flex items-center justify-center text-muted-foreground"
            data-testid="placeholder-colors"
          >
            <span className="text-lg">Color Palette</span>
          </div>

          <h2>My Role</h2>
          <p>
            Beyond initial design explorations, I took an active role in quality
            assurance, documenting bugs and UI inconsistencies, creating necessary
            icons, and implementing styling updates directly in the codebase.
          </p>
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
