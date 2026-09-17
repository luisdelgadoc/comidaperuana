import { BackButton } from "@/components/BackButton";
import { Reveal } from "@/components/Reveal";

export function StepHeader({
  backHref,
  backLabel,
  step,
  question,
  subtitle,
}: {
  backHref: string;
  backLabel: string;
  step: string;
  question: string;
  subtitle: string;
}) {
  return (
    <header className="px-6 pt-8 sm:px-10">
      <BackButton label={backLabel} href={backHref} tone="dark" />

      <Reveal>
        <p className="mt-6 text-xs uppercase tracking-widest text-ink/40">
          {step}
        </p>
        <h1 className="mt-3 max-w-2xl text-balance text-[clamp(2rem,5.5vw,3.5rem)] font-black leading-[1.02] tracking-tight">
          {question}
        </h1>
        <p className="mt-4 max-w-md text-base text-ink/60">{subtitle}</p>
      </Reveal>
    </header>
  );
}
