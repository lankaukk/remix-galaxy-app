import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function NoLikes() {
  return (
    <ProjectLayout
      title="No Likes"
      description="A social media platform reimagined without vanity metrics"
      backLink="/work/foundations"
    >
      <div className="space-y-12">
        <img
          src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7"
          alt="No Likes Platform"
          className="w-full rounded-lg shadow-xl"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#2D2D2D]">Challenge</h3>
              <p className="text-[#333333]">
                Create a social platform that promotes meaningful interactions
                without relying on traditional engagement metrics like likes
                and follower counts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#2D2D2D]">Solution</h3>
              <p className="text-[#333333]">
                Designed an alternative engagement system that emphasizes
                quality of interaction over quantity, using thoughtful
                responses and genuine connections.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none text-[#333333]">
          <h2>Core Features</h2>
          <ul>
            <li>Response-based engagement system</li>
            <li>Interest-based content discovery</li>
            <li>Meaningful interaction tracking</li>
            <li>Community-driven content curation</li>
            <li>Focus on conversation quality</li>
          </ul>

          <h2>Results</h2>
          <p>
            No Likes has demonstrated that social platforms can thrive without
            traditional vanity metrics, showing increased user satisfaction
            and more meaningful connections between users.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}