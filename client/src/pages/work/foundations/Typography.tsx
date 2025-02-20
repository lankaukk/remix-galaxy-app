import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function Typography() {
  return (
    <ProjectLayout
      title="Typography System"
      description="A comprehensive type scale and hierarchy system designed for digital interfaces"
    >
      <div className="space-y-12">
        <img
          src="https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec"
          alt="Typography System"
          className="w-full rounded-lg shadow-xl"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#2D2D2D]">Challenge</h3>
              <p className="text-[#333333]">
                Creating a consistent and scalable typography system that works
                across different screen sizes and maintains readability while
                conveying visual hierarchy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#2D2D2D]">Solution</h3>
              <p className="text-[#333333]">
                Developed a modular type scale with carefully selected font pairs
                and spacing ratios that ensure optimal legibility and visual
                harmony across all devices.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none text-[#333333]">
          <h2>System Components</h2>
          <ul>
            <li>Modular type scale with 8 sizes</li>
            <li>Responsive line heights and letter spacing</li>
            <li>Carefully selected font pairings</li>
            <li>Consistent spacing rules</li>
            <li>Accessibility-first approach</li>
          </ul>
          
          <h2>Impact</h2>
          <p>
            The typography system has become the foundation for all our digital
            products, ensuring consistency across platforms while maintaining
            excellent readability and visual appeal. It has significantly reduced
            design decision time and improved overall user experience.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}
