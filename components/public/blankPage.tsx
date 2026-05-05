type BlankPageProps = {
  eyebrow?: string;
  title: string;
};

export function BlankPage({ eyebrow = "I Want That!", title }: BlankPageProps) {
  return (
    <div className="bg-white">
      <section className="border-b border-surface-border bg-surface-subtle/50 py-14 md:py-20">
        <div className="container mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-black md:text-5xl">
            {title}
          </h1>
        </div>
      </section>
    </div>
  );
}
