import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function ProtestPlatform() {
  return (
    <ProjectLayout
      title="Protest Platform"
      description="A digital toolkit for organizing social movements"
      backLink="/work/foundations"
      backText="Back to Foundations"
    >
      <div className="space-y-12">
        <img
          src="https://images.unsplash.com/photo-1591625677520-65c9b8016a31"
          alt="Protest Platform Interface"
          className="w-full rounded-lg shadow-xl"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#2D2D2D]">Mission</h3>
              <p className="text-[#333333]">
                Develop a secure and accessible platform that empowers
                activists to organize, communicate, and coordinate social
                movements effectively.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold text-[#2D2D2D]">Approach</h3>
              <p className="text-[#333333]">
                Created a comprehensive suite of tools focused on privacy,
                accessibility, and rapid information sharing, designed to
                work even in challenging connectivity conditions.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none text-[#333333]">
          <h2>Core Features</h2>
          <ul>
            <li>Secure communication channels</li>
            <li>Resource coordination tools</li>
            <li>Emergency response system</li>
            <li>Offline functionality</li>
            <li>Multi-language support</li>
          </ul>

          <h2>Impact</h2>
          <p>
            The Protest Platform has become an essential tool for grassroots
            organizations, facilitating more effective and safer coordination
            of social movements while ensuring privacy and accessibility.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}