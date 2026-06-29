type Props = {
  id?: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ id, title, subtitle }: Props) {
  return (
    <div id={id} className="mb-12 md:mb-16">
      <h2 className="font-sans text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-5xl">
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
