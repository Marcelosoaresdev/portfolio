import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          © {year} Marcelo Soares — {t("copyright")}
        </p>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          {t("builtWith")} · Next.js 16
        </p>
      </div>
    </footer>
  );
}
