import { cn } from "@/lib/utils";

interface ProjectBriefProps {
  brief?: string;
  requirements?: string;
  timePeriod?: string;
  challenges?: string;
  className?: string;
}

export function ProjectBrief({
  brief,
  requirements,
  timePeriod,
  challenges,
  className,
}: ProjectBriefProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-muted p-6 sm:p-8 w-full",
        className
      )}
      data-testid="card-project-brief"
    >
      <h2 className="text-2xl font-semibold mb-6" data-testid="heading-project-brief">
        Project Brief
      </h2>
      
      <div className="space-y-6">
        {brief && (
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-2" data-testid="label-brief">
              Brief
            </h3>
            <p className="text-base leading-relaxed" data-testid="text-brief">
              {brief}
            </p>
          </div>
        )}
        
        {requirements && (
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-2" data-testid="label-requirements">
              Requirements
            </h3>
            <p className="text-base leading-relaxed" data-testid="text-requirements">
              {requirements}
            </p>
          </div>
        )}
        
        {timePeriod && (
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-2" data-testid="label-time-period">
              Time Period
            </h3>
            <p className="text-base leading-relaxed" data-testid="text-time-period">
              {timePeriod}
            </p>
          </div>
        )}
        
        {challenges && (
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-2" data-testid="label-challenges">
              Challenges
            </h3>
            <p className="text-base leading-relaxed whitespace-pre-line" data-testid="text-challenges">
              {challenges}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
