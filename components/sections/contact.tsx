import { useTranslations } from "next-intl";
import { ArrowUpRight, Mail, Globe, AtSign } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";

const CONTACTS = [
  {
    href: "https://github.com/marcelosoaresdev",
    icon: Globe,
    key: "github" as const,
    label: "github.com/marcelosoaresdev",
  },
  {
    href: "https://www.linkedin.com/in/marcelosoaresdev",
    icon: AtSign,
    key: "linkedin" as const,
    label: "linkedin.com/in/marcelosoaresdev",
  },
  {
    href: "mailto:marcelo@example.com",
    icon: Mail,
    key: "email" as const,
    label: "marcelo@example.com",
  },
];

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="relative border-t border-border/40 py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto max-w-3xl px-4">
        <FadeIn>
          <SectionHeading
            id="contact"
            eyebrow={`03 — ${t("heading")}`}
            title={t("heading")}
            subtitle={t("description")}
          />

          <ul className="divide-y divide-border/40 border-y border-border/40">
            {CONTACTS.map(({ href, icon: Icon, key, label }) => (
              <li key={key}>
                <a
                  href={href}
                  target={key === "email" ? undefined : "_blank"}
                  rel={key === "email" ? undefined : "noreferrer noopener"}
                  className="group flex items-center justify-between gap-4 py-5 transition-colors hover:bg-muted/40"
                >
                  <span className="flex items-center gap-4">
                    <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" />
                    <span className="font-display text-lg font-medium md:text-xl">
                      {t(key)}
                    </span>
                    <span className="hidden font-mono text-xs text-muted-foreground md:inline">
                      {label}
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 translate-x-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}