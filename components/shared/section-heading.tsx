type Props = {
  id?: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ id, title, subtitle }: Props) {
  return (
    <div id={id} className="mb-12">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}