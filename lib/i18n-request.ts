import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { defaultLocale, locales } from "@/lib/i18n";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = locales.includes(requested as (typeof locales)[number])
    ? requested
    : defaultLocale;
  if (!locale) notFound();

  return {
    locale: locale as string,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
