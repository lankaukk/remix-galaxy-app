import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";

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
          src="https://images.unsplash.com/photo-1552664730-d307ca884978"
          alt="Multiplayer Features"
          className="w-full rounded-lg shadow-xl"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold ">Objective</h3>
              <p className="">
                Create a seamless collaborative environment where multiple developers
                can work on the same React project simultaneously, seeing changes
                in real-time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold ">Implementation</h3>
              <p className="">
                Developed a robust real-time synchronization system using WebSocket
                technology and operational transformation algorithms to handle
                concurrent edits effectively.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className=" prose-lg max-w-none ">
          <h2>Collaborative Features</h2>
          <ul>
            <li>Real-time component editing</li>
            <li>Live code synchronization</li>
            <li>Cursor presence indicators</li>
            <li>Built-in chat and commenting system</li>
            <li>Conflict resolution handling</li>
          </ul>

          <h2>Results</h2>
          <p>
            The multiplayer features have transformed how teams approach React
            development, enabling true real-time collaboration. Teams can now work
            together seamlessly, reducing communication overhead and accelerating
            the development process.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}