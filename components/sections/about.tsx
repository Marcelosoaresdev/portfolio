import Image from "next/image";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import type { GitHubUser } from "@/lib/github";

type Props = {
  user: GitHubUser | null;
};

const STACK = ["TypeScript", "React", "Next.js", "Node.js", "Tailwind", "PostgreSQL"];

export function About({ user }: Props) {
  const t = useTranslations("about");
  const bio = t.raw("bio") as string[];

  return (
    <section id="about" className="border-t border-border/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <FadeIn>
          <SectionHeading id="about" title={t("heading")} />
          <div className="grid gap-12 md:grid-cols-[1fr,200px] md:items-start">
            <div>
              {bio.map((paragraph, i) => (
                <p key={i} className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}

              <h3 className="mt-10 text-sm font-semibold uppercase tracking-wide">
                {t("stackHeading")}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {STACK.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mx-auto md:mx-0">
              {user?.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt={user.name || user.login}
                  width={200}
                  height={200}
                  className="rounded-full border border-border/40"
                  priority
                />
              ) : (
                <div className="h-[200px] w-[200px] rounded-full bg-muted" />
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
