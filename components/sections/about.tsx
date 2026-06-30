import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import type { GitHubUser } from "@/lib/github";

type Props = {
  user: GitHubUser | null;
};

const STACK = ["TypeScript", "React", "Node.js", "Next.js", "PostgreSQL", "Drizzle", "Tailwind", "Docker"];

export function About({ user }: Props) {
  const t = useTranslations("about");
  const bio = t.raw("bio") as string[];

  return (
    <section id="about" className="relative border-t border-border/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <FadeIn>
          <SectionHeading id="about" title={t("heading")} />

          <div className="grid gap-12 md:grid-cols-[1fr_240px] md:items-start">
            <div>
              {bio.map((paragraph, i) => (
                <p
                  key={i}
                  className="mt-5 max-w-prose text-[1.0625rem] leading-[1.75] text-foreground/80 first:mt-0"
                >
                  {paragraph}
                </p>
              ))}

              <h3 className="mt-12 font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                {t("stackHeading")}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {STACK.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="font-mono text-[0.7rem] font-normal tracking-wide"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Side rail — quick meta info */}
            <aside className="space-y-6 md:border-l md:border-border/40 md:pl-8">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                  Location
                </p>
                <p className="mt-1.5 text-lg font-medium">
                  {user?.location || "Brasil"}
                </p>
              </div>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                  Github
                </p>
                <a
                  href={user?.html_url || "https://github.com/marcelosoaresdev"}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-1.5 inline-block text-lg font-medium transition-colors hover:text-foreground text-muted-foreground"
                >
                  @{user?.login || "marcelosoaresdev"}
                </a>
              </div>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                  Focus
                </p>
                <p className="mt-1.5 text-lg font-medium">
                  Full Stack
                </p>
              </div>
            </aside>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
