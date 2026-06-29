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
    <Card className="group relative h-full border-border/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_8px_30px_-12px_rgba(217,119,87,0.25)]">
      {/* Hairline accent strip on hover */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-tight tracking-tight">
            {repo.name}
          </h3>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${viewLabel}: ${repo.name}`}
            className="-mr-1 -mt-1 inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
            <span className="num-tabular inline-flex items-center gap-1 text-muted-foreground">
              <Star className="h-3 w-3" />
              {repo.stargazers_count.toLocaleString()} {starsLabel}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}