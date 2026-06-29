type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
};

export function SectionHeading({ id, title, subtitle, eyebrow }: Props) {
  return (
    <div id={id} className="mb-12 md:mb-16">
      {eyebrow && (
        <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-prose text-base text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}