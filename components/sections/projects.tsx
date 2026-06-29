import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/project-card";
import type { CuratedRepo } from "@/lib/curation";

type Props = {
  projects: CuratedRepo[];
};

export function Projects({ projects }: Props) {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="relative border-t border-border/40 py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-4">
        <FadeIn>
          <SectionHeading
            id="projects"
            eyebrow={`02 — ${t("heading")}`}
            title={t("heading")}
            subtitle={t("subtitle")}
          />
        </FadeIn>

        {projects.length === 0 ? (
          <p className="text-muted-foreground">{t("empty")}</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((repo, idx) => (
              <FadeIn key={repo.id} delay={idx * 0.05}>
                <ProjectCard
                  repo={repo}
                  viewLabel={t("viewOnGithub")}
                  starsLabel={t("starsLabel")}
                />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}