import { Card, CardContent } from "./card";
import { Skeleton } from "./skeleton";

export function ProjectCardSkeleton() {
  return (
    <Card className="cursor-pointer">
      <CardContent className="p-0">
        <Skeleton className="aspect-video w-full" />
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-[140px]" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ProjectDetailSkeleton() {
  return (
    <div className="space-y-12">
      <Skeleton className="w-full aspect-[21/9] rounded-lg" />
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[90%]" />
      </div>
    </div>
  );
}
