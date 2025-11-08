import { cn } from "@/lib/utils";

interface ProjectOutcomeProps {
  usageData?: string[];
  designTradeoffs?: string;
  outcome?: string;
  className?: string;
}

export function ProjectOutcome({
  usageData,
  designTradeoffs,
  outcome,
  className,
}: ProjectOutcomeProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-muted p-6 sm:p-8 w-full",
        className
      )}
      data-testid="card-project-outcome"
    >
      <h2 className="text-2xl font-semibold mb-6" data-testid="heading-project-outcome">
        Project Outcome
      </h2>
      
      <div className="space-y-6">
        {usageData && usageData.length > 0 && (
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-2" data-testid="label-usage-data">
              Real Usage Data
            </h3>
            <ul className="list-disc list-outside ml-5 space-y-2" data-testid="list-usage-data">
              {usageData.map((data, index) => (
                <li key={index} className="text-base leading-relaxed pl-1" data-testid={`usage-data-${index}`}>
                  {data}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {designTradeoffs && (
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-2" data-testid="label-design-tradeoffs">
              Design Tradeoffs
            </h3>
            <p className="text-base leading-relaxed whitespace-pre-line" data-testid="text-design-tradeoffs">
              {designTradeoffs}
            </p>
          </div>
        )}
        
        {outcome && (
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-2" data-testid="label-outcome">
              Outcome
            </h3>
            <p className="text-base leading-relaxed" data-testid="text-outcome">
              {outcome}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
