import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="hero" className="flex min-h-[70vh] items-center py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-4">
        <FadeIn>
          <p className="text-sm font-medium text-muted-foreground">{t("greeting")}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-6xl">Marcelo Soares</h1>
          <p className="mt-3 text-xl font-medium text-muted-foreground md:text-2xl">{t("title")}</p>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex gap-3">
            <Button render={<a href="#projects">{t("ctaProjects")}</a>} />
            <Button variant="outline" render={<a href="#contact">{t("ctaContact")}</a>} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
