import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border/40 py-10">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          Marcelo Soares, {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
