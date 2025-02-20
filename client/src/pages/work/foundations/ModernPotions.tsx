import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function ModernPotions() {
  return (
    <ProjectLayout
      title="Modern Potions"
      description="An e-commerce redesign for artisanal beverages"
      backLink="/work/foundations"
    >
      <div className="space-y-12">
        <img
          src="https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64"
          alt="Modern Potions Store"
          className="w-full rounded-lg shadow-xl"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#2D2D2D]">Challenge</h3>
              <p className="text-[#333333]">
                Reimagine the online shopping experience for craft beverages,
                focusing on storytelling and visual presentation while maintaining
                efficient e-commerce functionality.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#2D2D2D]">Solution</h3>
              <p className="text-[#333333]">
                Created an immersive shopping experience that combines beautiful
                product photography with engaging content about ingredients,
                brewing processes, and brand stories.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none text-[#333333]">
          <h2>Key Features</h2>
          <ul>
            <li>Immersive product presentations</li>
            <li>Interactive brewing guides</li>
            <li>Subscription management system</li>
            <li>Personalized recommendations</li>
            <li>Seamless checkout process</li>
          </ul>

          <h2>Results</h2>
          <p>
            The redesigned platform has significantly improved customer
            engagement and sales conversion rates, while establishing Modern
            Potions as a premium destination for artisanal beverages.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}