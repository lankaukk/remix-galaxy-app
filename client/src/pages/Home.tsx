import { StarField } from "@/components/StarField";

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden bg-background text-foreground pb-16 md:pb-0">
      <StarField />
    </div>
  );
}
