/**
 * Warms Vercel's image cache after a deploy.
 *
 * Every optimised image is transformed once, on demand, and the first visitor
 * to open a dish pays the full cost: fetching the source, resizing it and
 * encoding AVIF adds up to roughly 2.5 seconds. Afterwards it is served from
 * cache in under half a second.
 *
 * This walks the real pages, collects the exact variants they request, and
 * fetches them so no visitor is ever the first. It costs the same number of
 * transformations those visitors would have triggered anyway — around 2% of
 * the monthly free allowance per deploy.
 *
 * Usage: node scripts/prewarm-images.mjs [base-url]
 */

const BASE = process.argv[2] ?? "https://comidaperuana.vercel.app";

const ACCEPT_MODERN = "image/avif,image/webp,image/*,*/*";
const CONCURRENCY = 6;

/** Routes are discovered by crawling the deployed pages, so the script needs
 *  no knowledge of the content and keeps working as the catalogue grows. */
async function routesToVisit() {
  const roots = ["/es", "/en", "/es/explore", "/es/explore/lima"];
  const found = new Set(roots);

  for (const root of roots) {
    const html = await fetchText(root);
    for (const href of html.matchAll(/href="(\/(?:es|en)\/[^"#]*)"/g)) {
      found.add(href[1]);
    }
  }

  // The feed links to every dish; dish pages link to their restaurants.
  for (const route of [...found]) {
    if (!route.includes("/explore/")) continue;
    const html = await fetchText(route);
    for (const href of html.matchAll(/href="(\/(?:es|en)\/dishes\/[^"#]*)"/g)) {
      found.add(href[1]);
    }
  }

  for (const route of [...found]) {
    if (!route.includes("/dishes/")) continue;
    const html = await fetchText(route);
    for (const href of html.matchAll(/href="(\/(?:es|en)\/places\/[^"#]*)"/g)) {
      found.add(href[1]);
    }
  }

  return [...found];
}

async function fetchText(path) {
  const res = await fetch(BASE + path, {
    headers: { cookie: "cp-destination=lima/miraflores" },
  });
  return res.ok ? res.text() : "";
}

function extractImageUrls(html) {
  const urls = new Set();
  for (const match of html.matchAll(/\/_next\/image\?[^"'\s]+/g)) {
    urls.add(match[0].replaceAll("&amp;", "&"));
  }
  return urls;
}

async function run() {
  const routes = await routesToVisit();
  console.log(`Recorriendo ${routes.length} rutas…`);

  const images = new Set();
  for (const route of routes) {
    for (const url of extractImageUrls(await fetchText(route))) {
      images.add(url);
    }
  }

  const list = [...images];
  console.log(`Precalentando ${list.length} variantes de imagen…`);

  let done = 0;
  let slow = 0;

  async function worker(queue) {
    while (queue.length) {
      const url = queue.pop();
      const started = Date.now();
      try {
        const res = await fetch(BASE + url, {
          headers: { accept: ACCEPT_MODERN },
        });
        await res.arrayBuffer();
        const ms = Date.now() - started;
        if (ms > 1000) slow += 1;
      } catch {
        // A failed warm-up is not worth failing the deploy over.
      }
      done += 1;
    }
  }

  const queue = [...list];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, () => worker(queue))
  );

  console.log(`Listo: ${done} variantes, ${slow} estaban frías.`);
}

run();
