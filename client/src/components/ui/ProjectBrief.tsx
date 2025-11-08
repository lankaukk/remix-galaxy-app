import { cn } from "@/lib/utils";

interface ProjectBriefProps {
  brief?: string;
  requirements?: string;
  timePeriod?: string;
  challenges?: string[];
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
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold" data-testid="heading-project-brief">
          Project Brief
        </h2>
        {timePeriod && (
          <p className="text-base text-muted-foreground" data-testid="text-time-period">
            {timePeriod}
          </p>
        )}
      </div>
      
      <div className="space-y-6">
        {brief && (
          <div>
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
        
        {challenges && challenges.length > 0 && (
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-2" data-testid="label-challenges">
              Challenges
            </h3>
            <ul className="list-disc list-inside space-y-2" data-testid="list-challenges">
              {challenges.map((challenge, index) => (
                <li key={index} className="text-base leading-relaxed" data-testid={`challenge-${index}`}>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
