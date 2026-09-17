"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { District } from "@/types/content";
import type { Locale } from "@/lib/i18n/locales";
import { chooseDestination } from "@/lib/selection";

export function DistrictPicker({
  districts,
  lang,
  citySlug,
  action,
}: {
  districts: District[];
  lang: Locale;
  citySlug: string;
  action: string;
}) {
  const [selected, setSelected] = useState(districts[0]);
  const preview = selected?.image;

  return (
    <form action={chooseDestination} className="flex flex-1 flex-col">
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="city" value={citySlug} />
      <input type="hidden" name="district" value={selected?.slug ?? ""} />

      <div className="flex flex-wrap gap-2 px-6 sm:px-10">
        {districts.map((district) => {
          const isSelected = district.id === selected?.id;
          return (
            <motion.button
              key={district.id}
              type="button"
              onClick={() => setSelected(district)}
              aria-pressed={isSelected}
              whileTap={{ scale: 0.97 }}
              className={`min-h-11 rounded-full px-5 text-sm font-medium transition-colors ${
                isSelected
                  ? "bg-ink text-ivory"
                  : "bg-ink/5 text-ink hover:bg-ink/10"
              }`}
            >
              {district.name[lang]}
            </motion.button>
          );
        })}
      </div>

      {preview && (
        <div className="relative mx-6 mt-8 h-56 overflow-hidden rounded-2xl sm:mx-10 sm:h-72">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={`${preview.url}?w=1200&q=80`}
                alt={preview.alt[lang]}
                fill
                sizes="(max-width: 640px) 100vw, 60vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {selected.description && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5">
              <p className="text-sm text-ivory/90">
                {selected.description[lang]}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-auto px-6 pb-10 pt-8 sm:px-10">
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-base font-medium text-ivory transition-colors hover:bg-ink/90"
        >
          {action} →
        </motion.button>
      </div>
    </form>
  );
}
