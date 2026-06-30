"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GitHubUser } from "@/lib/github";

type Props = {
  user: GitHubUser | null;
};

export function Hero({ user }: Props) {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative flex min-h-[80vh] items-center py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid items-end gap-10 md:grid-cols-[1.5fr_1fr] md:gap-14">
          {/* Left column — text */}
          <div className="flex flex-col">
            {/* Greeting — mono caps */}
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
              {t("greeting")}
            </p>

            {/* Headline */}
            <h1 className="mt-5 font-sans text-[2.75rem] font-bold leading-[0.95] tracking-[-0.03em] text-balance md:text-[4.75rem] lg:text-[5.5rem]">
              Marcelo
              <br />
              Soares.
            </h1>

            {/* Subtitle / role */}
            <p className="mt-6 max-w-xl text-lg font-medium text-foreground/80 md:text-xl">
              {t("title")}
            </p>

            {/* Long subtitle */}
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("subtitle")}
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                render={
                  <a href="#projects" className="inline-flex">
                    {t("ctaProjects")}
                    <ArrowDown className="ml-1" />
                  </a>
                }
              />
              <Button
                size="lg"
                variant="outline"
                render={
                  <a href="#contact" className="inline-flex">
                    {t("ctaContact")}
                    <ArrowUpRight className="ml-1" />
                  </a>
                }
              />
            </div>
          </div>

          {/* Right column — avatar */}
          <div className="relative mx-auto w-full max-w-[280px] md:mx-0 md:max-w-none">
            <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-border bg-muted">
              {user?.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt={user.name || user.login}
                  fill
                  priority
                  sizes="(min-width: 768px) 320px, 240px"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
            </div>

            {/* Caption — mono, beneath the photo */}
            <div className="mt-4 flex items-baseline justify-between gap-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span>— {user?.location || "Brasil"}</span>
              <span>@{user?.login || "marcelosoaresdev"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
