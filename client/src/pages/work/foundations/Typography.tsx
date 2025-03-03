import ProjectLayout from "@/components/layout/ProjectLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function Typography() {
  return (
    <ProjectLayout
      title="Typo"
      description="Typo is a web app for generating your own typographic compositions. There is a gallery where you can save your work digitally, and view those created by others. The frontend is built with HTML, CSS, and JavaScript, and it communicates with a backend API that is built with Ruby and Rails."
      backLink="/work/foundations"
      backText="Back to Foundations"
    >
      <div className="space-y-12">
        <img
          src="https://mckayla.com/images/typo-posters.jpg"
          alt="Typography System"
          className="w-full rounded-lg shadow-xl"
        />
      </div>
    </ProjectLayout>
  );
}
