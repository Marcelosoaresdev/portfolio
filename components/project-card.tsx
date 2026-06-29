import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import type { CuratedRepo } from "@/lib/curation";

type Props = {
  repo: CuratedRepo;
  viewLabel: string;
  starsLabel: string;
};

export function ProjectCard({ repo, viewLabel, starsLabel }: Props) {
  return (
    <Card className="group transition-colors hover:border-foreground/40">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold tracking-tight">{repo.name}</h3>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${viewLabel}: ${repo.name}`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{repo.description}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          {repo.language && <Badge variant="secondary">{repo.language}</Badge>}
          {repo.stargazers_count > 0 && (
            <span>
              {repo.stargazers_count.toLocaleString()} {starsLabel}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
