"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import type { DishCardView } from "@/lib/views";
import type { Locale } from "@/lib/i18n/locales";

export function DishStoryCard({
  dish,
  index,
  discoverLabel,
  lang,
}: {
  dish: DishCardView;
  index: number;
  discoverLabel: string;
  lang: Locale;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Transform only: GPU-composited, so the feed stays smooth while scrolling.
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <Link
        href={`/${lang}/dishes/${dish.slug}`}
        className="group relative flex h-[72vh] w-full items-end overflow-hidden rounded-3xl sm:h-[78vh]"
      >
        {/* Taller than the card so the parallax shift never exposes an edge. */}
        <motion.div style={{ y: imageY }} className="absolute -inset-y-[10%] inset-x-0">
          <Image
            src={`${dish.imageUrl}?w=1600&q=80`}
            alt={dish.imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/10" />

        <div className="relative w-full p-6 sm:p-8">
          <span className="block text-sm font-medium tabular-nums text-ivory/60">
            {String(index + 1).padStart(2, "0")}
          </span>

          {dish.label && (
            <span className="mt-4 inline-block rounded-full bg-coral px-3 py-1 text-xs font-medium text-ivory">
              {dish.label}
            </span>
          )}

          <h3 className="mt-3 text-[clamp(2rem,6vw,3.25rem)] font-black uppercase leading-[1] tracking-tight text-ivory">
            {dish.name}
          </h3>

          <p className="mt-3 max-w-sm text-base leading-snug text-ivory/80">
            {dish.shortDescription}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm text-ivory/60">{dish.categoryName}</span>
            <span className="flex items-center gap-1 text-sm font-medium text-ivory transition-transform duration-300 group-hover:translate-x-1">
              {discoverLabel} →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
