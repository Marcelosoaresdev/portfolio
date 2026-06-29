"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { locales, type Locale } from "@/lib/i18n";

export function LangToggle() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

  function switchTo(target: Locale) {
    if (target === locale) return;
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = target;
    } else {
      segments.splice(1, 0, target);
    }
    router.push(segments.join("/"));
  }

  const next = locale === "pt-BR" ? "en" : "pt-BR";
  const label = next.toUpperCase();

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={`${t("languageLabel")} ${label}`}
      onClick={() => switchTo(next)}
      className="font-mono text-[0.7rem] uppercase tracking-[0.18em]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={locale}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18 }}
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}