import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function UiSimplification() {
  return (
    <ProjectLayout
      title="UI Simplification"
      description="Making complex React development more accessible through intuitive visual interfaces"
      backLink="/work/utopia"
    >
      <div className="space-y-12">
        <img
          src="https://images.unsplash.com/photo-1586953208448-b95a79798f07"
          alt="UI Simplification"
          className="w-full rounded-lg shadow-xl"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#2D2D2D]">Challenge</h3>
              <p className="text-[#333333]">
                React development traditionally requires deep technical knowledge and
                extensive code writing, making it challenging for designers and newer
                developers to build complex interfaces efficiently.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#2D2D2D]">Solution</h3>
              <p className="text-[#333333]">
                We developed an intuitive visual interface that allows developers to
                manipulate React components directly while automatically generating
                clean, maintainable code.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none text-[#333333]">
          <h2>Key Features</h2>
          <ul>
            <li>Visual component hierarchy editor</li>
            <li>Real-time code synchronization</li>
            <li>Drag-and-drop component placement</li>
            <li>Interactive property controls</li>
            <li>Custom component library integration</li>
          </ul>

          <h2>Impact</h2>
          <p>
            The UI simplification initiative has significantly reduced the learning
            curve for new React developers while maintaining the flexibility and
            power that experienced developers expect. Teams report up to 40% faster
            development cycles for complex interface components.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}