import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function JournalApp() {
  return (
    <ProjectLayout
      title="Journal App"
      description="Keeping a journal has countless benefits for both creativity and mental health. This Digital Application is a simple, colorful, customizable journal intended for phone screens. When users make an entry, they get to choose the background color, the text color, and the font. A block representing that entry is then stacked ontop of previous entries, if any, creating a layered pattern of colored pages."
      backLink="/work/foundations"
      backText="Back to Foundations"
    >
      <div className="space-y-12">
        <img
          src="https://mckayla.com/images/journal-mockup.jpg"
          alt="Journal App Interface"
          className="w-full rounded-lg shadow-xl"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold ">Goal</h3>
              <p className="">
                Create a distraction-free writing environment that encourages
                daily journaling while maintaining a clean and intuitive
                interface.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold ">Execution</h3>
              <p className="">
                Designed a minimal interface that focuses on the content while
                providing subtle but powerful formatting tools that appear only
                when needed.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose-lg max-w-none ">
          <h2>Key Features</h2>
          <ul>
            <li>Distraction-free writing mode</li>
            <li>Context-aware formatting tools</li>
            <li>Customizable themes and typography</li>
            <li>Automatic saving and versioning</li>
            <li>Cross-device synchronization</li>
          </ul>

          <h2>Results</h2>
          <p>
            The Journal App has helped users maintain consistent writing habits
            through its focused design. User engagement metrics show increased
            writing session duration and frequency compared to traditional
            note-taking apps.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}
