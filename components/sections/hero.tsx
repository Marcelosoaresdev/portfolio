"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GitHubUser } from "@/lib/github";

type Props = {
  user: GitHubUser | null;
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero({ user }: Props) {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative flex min-h-[80vh] items-center py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid items-end gap-10 md:grid-cols-[1.5fr_1fr] md:gap-14"
        >
          {/* Left column — text */}
          <div className="flex flex-col">
            {/* Issue / catalog line — mono caps */}
            <motion.p
              variants={item}
              className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground"
            >
              <span className="text-accent">●</span>&nbsp;&nbsp;{t("greeting")} —{" "}
              {new Date().getFullYear()}
            </motion.p>

            {/* Display headline */}
            <motion.h1
              variants={item}
              className="mt-5 font-display text-[2.75rem] font-bold leading-[0.95] tracking-[-0.03em] text-balance md:text-[4.75rem] lg:text-[5.5rem]"
            >
              Marcelo
              <br />
              <span className="italic text-accent">Soares.</span>
            </motion.h1>

            {/* Subtitle / role */}
            <motion.p
              variants={item}
              className="mt-6 max-w-xl font-display text-lg font-medium text-foreground/80 md:text-xl"
            >
              {t("title")}
            </motion.p>

            {/* Long subtitle */}
            <motion.p
              variants={item}
              className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button
                size="lg"
                render={
                  <a href="#projects" className="group inline-flex">
                    {t("ctaProjects")}
                    <ArrowDown className="transition-transform group-hover:translate-y-0.5" />
                  </a>
                }
              />
              <Button
                size="lg"
                variant="outline"
                render={
                  <a
                    href="#contact"
                    className="group inline-flex"
                  >
                    {t("ctaContact")}
                    <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                }
              />
            </motion.div>
          </div>

          {/* Right column — avatar */}
          <motion.div
            variants={item}
            className="relative mx-auto w-full max-w-[280px] md:mx-0 md:max-w-none"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-border bg-muted">
              {user?.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt={user.name || user.login}
                  fill
                  priority
                  sizes="(min-width: 768px) 320px, 240px"
                  className="object-cover grayscale-0 transition duration-700 hover:scale-[1.02] md:grayscale md:hover:grayscale-0"
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
            </div>

            {/* Caption — mono, beneath the photo */}
            <div className="mt-4 flex items-baseline justify-between gap-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span>— {user?.location || "Brasil"}</span>
              <span className="text-accent">@{user?.login || "marcelosoaresdev"}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}