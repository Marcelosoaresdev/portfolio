import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { fetchProjects, fetchUser } from "@/lib/github";
import { curateProjects } from "@/lib/curation";
import curated from "@/data/projects.json";
import type { Locale } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [repos, user] = await Promise.all([
    fetchProjects("marcelosoaresdev"),
    fetchUser("marcelosoaresdev"),
  ]);

  const projects = curateProjects(repos, curated, locale as Locale);

  return (
    <>
      <Hero />
      <About user={user} />
      <Projects projects={projects} />
      <Contact />
    </>
  );
}