import ProjectLayout from "@/components/layout/ProjectLayout";
import igLikes from "@/assets/images/ig-likes.gif";

export default function NoLikes() {
  return (
    <ProjectLayout
      title="No Likes"
      description="No Likes is a simple Chrome Extension that Removes the Likes Feature on Instagram"
      backLink="/work/foundations"
      backText="Back to Foundations"
    >
      <div className="space-y-12">
        <img
          src={igLikes}
          alt="No Likes Platform"
          className="w-full rounded-lg shadow-xl"
        />
      </div>
    </ProjectLayout>
  );
}
