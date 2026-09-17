"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/lib/i18n/locales";

export type MenuLink = { href: string; label: string };

export function NavMenu({
  links,
  openLabel,
  closeLabel,
  title,
  lang,
  tone = "dark",
}: {
  links: MenuLink[];
  openLabel: string;
  closeLabel: string;
  title: string;
  lang: Locale;
  tone?: "dark" | "light";
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={openLabel}
        aria-expanded={open}
        className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
          tone === "light"
            ? "text-ivory hover:bg-ivory/15"
            : "text-ink hover:bg-ink/5"
        }`}
      >
        <Menu size={22} strokeWidth={2.25} aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-ink px-6 py-8 sm:px-10"
            role="dialog"
            aria-modal="true"
            lang={lang}
          >
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={closeLabel}
                autoFocus
                className="flex h-11 w-11 items-center justify-center rounded-full text-ivory transition-colors hover:bg-ivory/15"
              >
                <X size={22} strokeWidth={2.25} aria-hidden />
              </button>
            </div>

            <p className="mt-8 text-xs uppercase tracking-widest text-ivory/40">
              {title}
            </p>

            <nav className="mt-6 flex flex-col gap-1">
              {links.map((link, index) => (
                <motion.div
                  key={link.href + link.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.05 + index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-[clamp(1.75rem,6vw,3rem)] font-black leading-tight tracking-tight text-ivory transition-colors hover:text-coral"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
