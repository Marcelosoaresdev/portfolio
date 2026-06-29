"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LangToggle } from "./lang-toggle";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#about", label: t("about") },
    { href: "#projects", label: t("projects") },
    { href: "#contact", label: t("contact") },
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
            className="font-sans text-lg font-bold tracking-tight"
          >
            Marcelo.
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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

      {/* Full-screen mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-background"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="flex h-full w-full flex-col px-8 py-6"
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

            {/* Nav links */}
            <nav className="mt-16 flex flex-1 flex-col justify-center gap-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-3xl font-semibold leading-tight tracking-tight transition-colors hover:text-muted-foreground"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Bottom row — toggles */}
            <div className="flex items-center justify-between border-t border-border/40 pt-6">
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
