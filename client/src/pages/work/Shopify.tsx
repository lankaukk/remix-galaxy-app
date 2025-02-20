import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function Shopify() {
  return (
    <ProjectLayout
      title="Shopify Redesign"
      description="A comprehensive redesign of the Shopify merchant dashboard to improve usability and efficiency."
      backLink="/work"
      backText="Back to Work"
    >
      <div className="space-y-12">
        <img
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12"
          alt="Shopify Dashboard"
          className="w-full rounded-lg shadow-xl"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#2D2D2D]">Challenge</h3>
              <p className="text-[#333333]">
                Merchants found the existing dashboard complex and time-consuming to navigate,
                leading to reduced productivity and satisfaction.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#2D2D2D]">Solution</h3>
              <p className="text-[#333333]">
                Redesigned the interface with a focus on simplicity and quick access to
                key features, resulting in a 40% improvement in task completion time.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none text-[#333333]">
          <h2>Process & Outcome</h2>
          <p>
            Through extensive user research and iterative design, we identified key pain
            points and opportunities for improvement. The new design introduces a
            streamlined navigation system, enhanced data visualization, and
            contextual help features.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}