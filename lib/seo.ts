import type { Locale } from "@/lib/i18n";

export function personJsonLd(locale: Locale, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Marcelo Soares",
    url: `${baseUrl}/${locale}`,
    sameAs: [
      "https://github.com/marcelosoaresdev",
      "https://www.linkedin.com/in/marcelosoaresdev",
    ],
    jobTitle: locale === "en" ? "Software Engineer" : "Engenheiro de Software",
  };
}