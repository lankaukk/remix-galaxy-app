import { StarField } from "@/components/StarField";

export default function Home() {
  return (
    <div 
      className="fixed inset-0 overflow-hidden bg-background text-foreground"
      style={{ touchAction: 'none', overscrollBehavior: 'none' }}
      onTouchMove={(e) => e.preventDefault()}
    >
      <StarField />
    </div>
  );
}
