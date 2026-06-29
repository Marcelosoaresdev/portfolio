"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LangToggle } from "./lang-toggle";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#about", label: t("about"), num: "01" },
    { href: "#projects", label: t("projects"), num: "02" },
    { href: "#contact", label: t("contact"), num: "03" },
  ];

  // Lock body scroll while overlay is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="font-display text-lg font-bold tracking-tight"
          >
            Marcelo<span className="text-accent">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-1 border-l border-border/60 pl-4">
              <LangToggle />
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
              className="ml-auto flex h-full w-full max-w-md flex-col border-l border-border/40 bg-background px-8 py-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top row — close */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                  Menu
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Nav links — display type */}
              <nav className="mt-16 flex flex-1 flex-col justify-center gap-2">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.12 + i * 0.06,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group flex items-baseline gap-4 py-3"
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      {l.num}
                    </span>
                    <span className="font-display text-5xl font-bold leading-none tracking-tight transition-colors group-hover:text-accent">
                      {l.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Bottom row — toggles */}
              <div className="flex items-center justify-between border-t border-border/40 pt-6">
                <LangToggle />
                <ThemeToggle />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}