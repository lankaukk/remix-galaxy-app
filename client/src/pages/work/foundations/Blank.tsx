import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function Blank() {
  return (
    <ProjectLayout
      title="Blank Canvas"
      description="An experimental design space for creative exploration"
      backLink="/work/foundations"
      backText="Back to Foundations"
    >
      <div className="space-y-12">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
          alt="Blank Canvas Interface"
          className="w-full rounded-lg shadow-xl"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold ">Concept</h3>
              <p className="">
                Create an open-ended digital canvas that encourages experimentation
                and creative expression without the constraints of traditional
                design tools.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold ">Approach</h3>
              <p className="">
                Developed a flexible interface that combines traditional design
                tools with experimental features, allowing users to discover new
                ways of creating digital art.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose-lg max-w-none ">
          <h2>Features</h2>
          <ul>
            <li>Infinite canvas with zoom capabilities</li>
            <li>Experimental brush and effect systems</li>
            <li>Procedural generation tools</li>
            <li>Real-time collaboration options</li>
            <li>Export in multiple formats</li>
          </ul>

          <h2>Outcome</h2>
          <p>
            Blank Canvas has become a playground for digital artists and
            designers, fostering a community of creators who push the boundaries
            of digital art. The project has led to the discovery of new
            design techniques and creative workflows.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}