import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function Utopia() {
  return (
    <ProjectLayout
      title="Utopia Platform"
      description="Simplifying social interactions through thoughtful UI design and improved user flows."
    >
      <div className="space-y-12">
        <img
          src="https://images.unsplash.com/photo-1586953208448-b95a79798f07"
          alt="Utopia Platform"
          className="w-full rounded-lg shadow-xl"
        />

        <div className="grid gap-8 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#2D2D2D]">UI Simplification</h3>
              <p className="text-[#333333]">
                Streamlined complex interaction patterns into intuitive, user-friendly interfaces.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#2D2D2D]">Multiplayer Features</h3>
              <p className="text-[#333333]">
                Designed real-time collaboration tools that enhance user engagement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#2D2D2D]">Project Management</h3>
              <p className="text-[#333333]">
                Created an efficient project tracking system for team collaboration.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none text-[#333333]">
          <h2>Design Process</h2>
          <p>
            The Utopia platform underwent several iterations based on user feedback
            and usability testing. We focused on creating a cohesive experience
            that balances functionality with aesthetic appeal.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}
