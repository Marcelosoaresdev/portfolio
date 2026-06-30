import { useTranslations } from "next-intl";
import { ArrowUpRight, Mail } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import type { ReactNode } from "react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.4 7.86 10.92.58.11.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.35.78 1.05.78 2.12v3.14c0 .31.21.68.8.56C20.21 21.4 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

type ContactItem = {
  href: string;
  icon: ReactNode;
  key: "github" | "linkedin" | "email";
  label: string;
  external: boolean;
};

const CONTACTS: ContactItem[] = [
  {
    href: "https://github.com/marcelosoaresdev",
    icon: <GithubIcon className="h-5 w-5" />,
    key: "github",
    label: "github.com/marcelosoaresdev",
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/marcelosoaresdev",
    icon: <LinkedinIcon className="h-5 w-5" />,
    key: "linkedin",
    label: "linkedin.com/in/marcelosoaresdev",
    external: true,
  },
  {
    href: "mailto:marcelohsoares142@gmail.com",
    icon: <Mail className="h-5 w-5" />,
    key: "email",
    label: "marcelohsoares142@gmail.com",
    external: false,
  },
];

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="relative border-t border-border/40 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4">
        <FadeIn>
          <SectionHeading
            id="contact"
            title={t("heading")}
            subtitle={t("description")}
          />

          <ul className="divide-y divide-border/40 border-y border-border/40">
            {CONTACTS.map(({ href, icon, key, label, external }) => (
              <li key={key}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer noopener" : undefined}
                  className="group flex items-center justify-between gap-4 py-5 transition-colors hover:bg-muted/40"
                >
                  <span className="flex items-center gap-4 text-muted-foreground group-hover:text-foreground">
                    {icon}
                    <span className="text-lg font-medium md:text-xl">
                      {t(key)}
                    </span>
                    <span className="hidden font-mono text-xs md:inline">
                      {label}
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
