import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function RobotPigeon() {
  return (
    <ProjectLayout
      title="Robot Pigeon"
      description="A playful AI-driven message delivery system"
      backLink="/work/foundations"
      backText="Back to Foundations"
    >
      <div className="space-y-12">
        <img
          src="https://images.unsplash.com/photo-1548802673-380ab8ebc7b7"
          alt="Robot Pigeon Interface"
          className="w-full rounded-lg shadow-xl"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold ">Concept</h3>
              <p className="">
                Create a whimsical messaging platform that uses AI-powered
                virtual pigeons to deliver messages, adding an element of
                surprise and delight to digital communication.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold ">Execution</h3>
              <p className="">
                Developed an intuitive interface that combines messaging
                functionality with playful animations and AI-generated
                delivery scenarios.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose-lg max-w-none ">
          <h2>Features</h2>
          <ul>
            <li>AI-powered message delivery system</li>
            <li>Customizable virtual pigeons</li>
            <li>Interactive delivery animations</li>
            <li>Message journey tracking</li>
            <li>Collectible pigeon variants</li>
          </ul>

          <h2>Impact</h2>
          <p>
            Robot Pigeon has brought joy and whimsy to digital communication,
            with users reporting increased engagement and emotional connection
            through the playful delivery system.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}