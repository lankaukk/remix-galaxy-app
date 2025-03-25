import ProjectLayout from "@/components/layout/ProjectLayout";
import RobotPigeonPic from "@/assets/images/pigeon-square.png";

export default function RobotPigeon() {
  return (
    <ProjectLayout
      title="Robot Pigeon"
      description="This project is inspired by the Birds Arent Real movement. The goal of the movement is to make everyone aware of the fact that the government has replaced every living bird with robotic replicas. This Snap Lens utilizes Augmented Reality to help people to see the truth for themselves."
      backLink="/work/foundations"
      backText="Back to Foundations"
    >
      <div className="space-y-12">
        <img
          src={RobotPigeonPic}
          alt="Robot Pigeon Interface"
          className="w-full rounded-lg shadow-xl"
        />
      </div>
    </ProjectLayout>
  );
}
