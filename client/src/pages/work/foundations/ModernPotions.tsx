import ProjectLayout from "@/components/layout/ProjectLayout";
import CoverPic from "@/assets/images/modern-potions/covers.jpeg";

export default function ModernPotions() {
  return (
    <ProjectLayout
      title="Modern Potions"
      description="Modern Potions is a speculative catalog selling the season's most potent magic potions. It's essential reading material for influential witches and humans alike."
      backLink="/work/foundations"
      backText="Back to Foundations"
    >
      <div className="space-y-12">
        <img
          src={CoverPic}
          alt="Modern Potions Store"
          className="w-full rounded-lg shadow-xl"
        />
      </div>
    </ProjectLayout>
  );
}
