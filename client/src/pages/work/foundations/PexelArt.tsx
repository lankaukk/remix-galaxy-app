import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function PexelArt() {
  return (
    <ProjectLayout
      title="Pexel Art"
      description="A digital art creation and curation platform"
    >
      <div className="space-y-12">
        <img
          src="https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07"
          alt="Pexel Art Platform"
          className="w-full rounded-lg shadow-xl"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#2D2D2D]">Vision</h3>
              <p className="text-[#333333]">
                Create a platform that combines pixel art creation tools with
                a community-driven gallery system, making digital art more
                accessible to everyone.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#2D2D2D]">Implementation</h3>
              <p className="text-[#333333]">
                Built an intuitive pixel art editor with powerful tools and
                integrated it with a social platform for sharing and discovering
                artwork.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none text-[#333333]">
          <h2>Key Features</h2>
          <ul>
            <li>Intuitive pixel art editor</li>
            <li>Community galleries and collections</li>
            <li>Artist collaboration tools</li>
            <li>Animation support</li>
            <li>Custom palette management</li>
          </ul>
          
          <h2>Impact</h2>
          <p>
            Pexel Art has grown into a vibrant community of digital artists,
            featuring thousands of unique artworks and fostering collaboration
            between creators of all skill levels.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}
