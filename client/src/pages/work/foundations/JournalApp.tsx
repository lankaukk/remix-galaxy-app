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
      </div>
    </ProjectLayout>
  );
}
