import { useTranslations } from "next-intl";
import { Globe, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";

const CONTACTS = [
  { href: "https://github.com/marcelosoaresdev", icon: Globe, key: "github" as const },
  {
    href: "https://www.linkedin.com/in/marcelosoaresdev",
    icon: Globe,
    key: "linkedin" as const,
  },
  { href: "mailto:marcelo@example.com", icon: Mail, key: "email" as const },
];

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="border-t border-border/40 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <FadeIn>
          <SectionHeading id="contact" title={t("heading")} />
          <p className="text-muted-foreground">{t("description")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {CONTACTS.map(({ href, icon: Icon, key }) => (
              <Button
                key={key}
                variant="outline"
                render={
                  <a
                    href={href}
                    target={key === "email" ? undefined : "_blank"}
                    rel={key === "email" ? undefined : "noreferrer noopener"}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {t(key)}
                  </a>
                }
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
