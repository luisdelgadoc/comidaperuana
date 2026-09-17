"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { CategoryView, DishCardView } from "@/lib/views";
import type { Locale } from "@/lib/i18n/locales";
import { DishStoryCard } from "./DishStoryCard";

const ALL = "all";

export function DishFeed({
  dishes,
  categories,
  allLabel,
  discoverLabel,
  sectionTitle,
  lang,
}: {
  dishes: DishCardView[];
  categories: CategoryView[];
  allLabel: string;
  discoverLabel: string;
  sectionTitle: string;
  lang: Locale;
}) {
  const [active, setActive] = useState(ALL);

  const visible =
    active === ALL
      ? dishes
      : dishes.filter((dish) => dish.categoryId === active);

  const options = [{ id: ALL, name: allLabel }, ...categories];

  return (
    <section className="px-6 pb-20 sm:px-10">
      <div className="sticky top-0 z-20 -mx-6 bg-ivory/90 px-6 py-4 backdrop-blur sm:-mx-10 sm:px-10">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {options.map((option) => {
            const isActive = option.id === active;
            return (
              <motion.button
                key={option.id}
                type="button"
                onClick={() => setActive(option.id)}
                aria-pressed={isActive}
                whileTap={{ scale: 0.97 }}
                className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-ink text-ivory"
                    : "bg-ink/5 text-ink hover:bg-ink/10"
                }`}
              >
                {option.name}
              </motion.button>
            );
          })}
        </div>
      </div>

      <h2 className="mb-6 mt-8 text-sm font-semibold uppercase tracking-widest text-ink/40">
        {sectionTitle}
      </h2>

      {/* Spec §36: desktop keeps its editorial character instead of becoming a
          uniform grid. Cards alternate width and offset so the column breathes
          without turning into a marketplace listing. */}
      <div className="flex flex-col gap-6 lg:gap-10">
        {visible.map((dish, index) => (
          <div
            key={dish.slug}
            className={
              index % 3 === 0
                ? "lg:w-[78%]"
                : index % 3 === 1
                  ? "lg:ml-auto lg:w-[62%]"
                  : "lg:mx-auto lg:w-[70%]"
            }
          >
            <DishStoryCard
              dish={dish}
              index={index}
              discoverLabel={discoverLabel}
              lang={lang}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
