"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { ImageAsset } from "@/types/content";

export function CityCard({
  href,
  name,
  action,
  image,
  alt,
  index,
}: {
  href: string;
  name: string;
  action: string;
  image: ImageAsset;
  alt: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
    >
      <Link
        href={href}
        className="group relative flex h-44 w-full items-end overflow-hidden rounded-2xl bg-ink/15 sm:h-56"
      >
        <Image
          src={`${image.url}?w=1200&q=80`}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />

        <div className="relative flex w-full items-end justify-between p-5">
          <span className="text-3xl font-black tracking-tight text-ivory sm:text-4xl">
            {name}
          </span>
          <span className="flex items-center gap-1 text-sm font-medium text-ivory/80">
            {action} →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
