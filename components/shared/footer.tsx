import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
        <p>
          © {year} Marcelo Soares. {t("copyright")}
        </p>
        <p className="mt-1">{t("builtWith")}</p>
      </div>
    </footer>
  );
}
