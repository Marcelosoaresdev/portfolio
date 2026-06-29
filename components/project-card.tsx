import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Star } from "lucide-react";
import type { CuratedRepo } from "@/lib/curation";

type Props = {
  repo: CuratedRepo;
  viewLabel: string;
  starsLabel: string;
};

export function ProjectCard({ repo, viewLabel, starsLabel }: Props) {
  return (
    <Card className="group relative h-full border-border transition-colors hover:border-foreground">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-sans text-lg font-semibold leading-tight tracking-tight">
            {repo.name}
          </h3>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${viewLabel}: ${repo.name}`}
            className="-mr-1 -mt-1 inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </CardHeader>
      <CardContent className="flex h-full flex-col gap-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {repo.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2 font-mono text-[0.7rem] uppercase tracking-[0.12em]">
          <div className="flex items-center gap-2">
            {repo.language && (
              <Badge
                variant="secondary"
                className="font-mono text-[0.65rem] font-normal tracking-wide"
              >
                {repo.language}
              </Badge>
            )}
          </div>
          {repo.stargazers_count > 0 && (
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Star className="h-3 w-3" />
              {repo.stargazers_count.toLocaleString()} {starsLabel}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
