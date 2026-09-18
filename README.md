# Laperuvian.food

> ### ⚠️ Los datos de este repositorio son de prueba, no información real
>
> Los **nombres de restaurantes son reales**, pero **todo lo demás sobre ellos
> es inventado**: ratings, número de reseñas, textos de recomendación y
> descripciones editoriales fueron redactados para poder desarrollar la
> interfaz, sin investigación ni verificación de ningún tipo.
>
> Lo mismo aplica a los textos de los 18 platos.
>
> **No uses nada de este repositorio como información sobre esos negocios.**
> El contenido verificado llega en la Fase 11.

Guía gastronómica visual para viajeros extranjeros en Perú.
Recorrido central: **Destino → Plato → Restaurante recomendado**.

**En vivo: https://laperuvian.food**

Dominio propio con certificado, apuntando por registro A a Vercel. El
repositorio y el proyecto en Vercel se siguen llamando `comidaperuana`
internamente; es solo un nombre.

**El despliegue automático desde GitHub NO está conectado todavía**: `vercel git connect` falla porque falta autorizar la app
de Vercel en la cuenta de GitHub, que es un paso de navegador. Mientras tanto
se publica a mano:

```bash
npx vercel --prod
npm run prewarm          # imprescindible tras cada despliegue, ver abajo
```

`NEXT_PUBLIC_SITE_URL` está configurada en Vercel (production, preview y
development) y es lo que alimenta los canonical y las URLs de OpenGraph. Sin
ella apuntan a localhost, que en producción le diría a Google que la versión
canónica de cada página vive en una máquina de desarrollo.

La identidad del producto vive en `SOUL.md`. El diseño aprobado es
`diseño inicial MVP.png` (10 pantallas). La especificación funcional completa
(52 secciones, fases 1-11) **no está en el repo** — ver "Pendientes" abajo.

---

## Cómo correrlo

```bash
npm install
npm run dev -- -p 3005
```

Abrir `http://localhost:3005` (redirige a `/en` o `/es` según el navegador).

**Sobre el puerto:** el 3000 lo ocupa otro proyecto (`frisby-control`) y el 3001
tiene un servidor en IPv6 que provoca choques. Usar 3005.

**`.env.local`** lo genera `vercel link` y está ignorado por git. No lo subas.

**Si cambias o agregas rutas:** correr `npx next typegen` antes de `tsc`, o los
tipos de ruta generados quedan viejos y el typecheck falla con errores que
parecen del código y no lo son.

```bash
npx tsc --noEmit    # typecheck
npm run lint
npm run build
```

---

## Stack

Next.js 16.3.5 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4
(tokens en `app/globals.css` vía `@theme`) · Motion · Lucide · Geist.

Sin base de datos todavía: todo sale de `data/mock/`.

---

## Estado por fases

| Fase | Estado |
|---|---|
| 1. Foundation | Completa |
| 2. Mock data | Completa |
| 3. Onboarding | Completa |
| 4. Destination experience | Completa |
| 5. Dish detail | Completa |
| 6. Restaurant experience | Completa |
| 7. Supabase | Parcial: repositorios y SQL listos, falta conectar |
| 8. Google Places | **Cancelada** (ver decisiones) |
| 9. Analytics | Pendiente |
| 10. Polish | Completa |
| 11. Contenido real | Pendiente |

Flujo navegable hoy: splash → ciudad → zona → feed de platos → detalle de plato
→ restaurante → Google Maps.

---

## Decisiones cerradas (no re-litigar)

**Cero gasto.** Restricción explícita del dueño del producto. En consecuencia:

- No se llama a Google Places. `rating` y `reviewCount` se cargan a mano en los
  datos. Por eso la Fase 8 está cancelada, no pospuesta.
- `googlePlaceId` se deja vacío a propósito. Inventarlo produciría enlaces rotos
  a Maps. El enlace se arma con nombre + distrito + ciudad usando el esquema
  gratuito `google.com/maps/search/?api=1&query=`, sin API key.
- La distancia se calcula con haversine local, nunca con Distance Matrix.
- `next.config.ts` limita anchos y formatos de imagen para no pasar la cuota
  gratuita de transformaciones. Esa configuración es funcional, no cosmética.
- Vercel Hobby sirve mientras el proyecto no monetice; su licencia prohíbe uso
  comercial. Evitar APIs propietarias de Vercel para poder migrar barato.

**Fotografías: precalentar siempre.** Cada imagen se transforma una sola vez,
bajo demanda, y el primero en abrirla paga 2.4 s. Después son 0.4 s. `npm run
prewarm` recorre el sitemap y calienta todas las variantes por adelantado; son
las mismas transformaciones que dispararían los visitantes, alrededor del 6% de
la cuota mensual gratuita. **Si despliegas y no lo corres, la primera visita de
cada plato se siente rota.**

**Arranque en inglés.** El producto está escrito para viajeros extranjeros, así
que todos entran en `/en` sin importar el idioma del navegador. Quien pulsa ES
queda registrado en la cookie `cp-locale` y vuelve a español en visitas
siguientes.

**Logo.** `public/brand/`, en rojo para fondos claros y blanco sobre fotografía,
ambos recortados de la misma alfa. Debajo de `sm` se muestra solo el cuenco: el
lockup completo tendría que bajar a ~32 px junto al botón de volver y el texto
deja de leerse. Los PNG pesan 75-115 KB porque el original vino rasterizado —
si aparece el SVG, reemplazarlos baja eso a unos 5 KB.

**Bilingüe desde el día uno.** Inglés por defecto, español siempre disponible.
`app/[lang]/` con slugs idénticos en ambos idiomas. Los tipos obligan a que todo
texto visible exista en los dos: si falta una traducción, **el build falla**.

**Distancia.** Minutos si es caminable (≤25 min), kilómetros si no. Mostrar
"~51 min caminando" era técnicamente cierto e inútil.

**404 y streaming.** Las rutas de plato y restaurante usan `dynamicParams =
false` con `generateStaticParams`. No es cosmético: como tienen `loading.tsx`,
llamar a `notFound()` dentro del componente llegaba después de que el streaming
ya había enviado un 200, produciendo un soft-404. El 404 vive en
`app/not-found.tsx` (raíz) y **no debe renderizar su propio `<html>`**, porque
Next ya aporta el shell y dos anidados rompen la hidratación.

**Capa de repositorios.** Ninguna página importa `data/mock`: todo pasa por
`lib/repositories/`. Sus funciones son **asíncronas aunque hoy lean arreglos en
memoria**, precisamente para que conectar Supabase no obligue a tocar cada punto
de llamada. El esquema vive en `supabase/migrations/0001_init.sql`, con RLS
activo y solo lectura pública.

**Persistencia.** El destino elegido va en cookie, no en `localStorage`, porque
el servidor necesita leerlo para resolver recomendaciones.

**Ciudad de un plato sin contexto.** Un plato puede estar en varias ciudades
(ceviche y chifa están en Lima y Cusco). `/dishes/[slug]` no lleva ciudad en la
URL, así que se resuelve por cookie y, si no hay, por mayor `relevanceScore`.
Esto vuelve la página dinámica: se pierde prerenderizado, no indexación.

**Navegación.** Onboarding = solo volver. Exploración = menú completo. Todo
botón de volver lleva destino explícito, porque quien llega desde Google no
tiene historial.

---

## Lo que parece terminado y NO lo está

Todo esto se reemplaza en la Fase 11:

- **Copy editorial de los 18 platos**: inventado, no investigado.
- **Ratings y número de reseñas**: inventados. Hay que verificarlos a mano
  contra Google Maps.
- **Restaurantes**: los nombres son reales, el resto del contenido no. Los de
  Cusco necesitan validación de alguien que conozca la ciudad.
- **Fotografía**: mezcla de Unsplash y Pexels, ambas de licencia libre y sin
  atribución obligatoria. Seis platos ya usan fotos reales del plato peruano
  (Pexels tiene lo que Unsplash no: buscar "picarones" en Unsplash da cero
  resultados). Quedan cuatro marcadas `APPROXIMATE` en `data/mock/images.ts` que
  siguen sin mostrar el plato real — cuy, alpaca y chiriuchu no parecen existir
  en ningún banco libre. Wikimedia Commons sí los tiene, pero con licencias que
  exigen atribución, lo que obligaría a añadir un campo de crédito al modelo.

---

## Proceso de trabajo

El gate de revisión es un Skill en `.claude/skills/engineering-review-gate/`.
Exige revisión Opus **del plan antes de escribir código** y **del diff real
después**, más conformidad con la spec, fidelidad al mockup, alcanzabilidad de
navegación, costo cero, accesibilidad y performance.

Se trabaja **una fase a la vez** y se para al terminar cada una.

---

## Pendientes para la próxima sesión

1. **Guardar la especificación funcional en el repo.** Hoy solo existe en el
   historial de chat. Su propia §51 dice que hay que consultarla antes de
   implementar cualquier cosa, y no está en disco.
2. Para terminar la Fase 7 hace falta un proyecto Supabase: correr la migración,
   generar el seed desde `data/mock/` y cambiar la implementación de
   `lib/repositories/`. Nada fuera de esa carpeta debería cambiar.
3. Fase 9 (PostHog) necesita una cuenta y una API key.
4. Resolver de dónde saldrá la fotografía real: es la tesis del producto y no
   tiene presupuesto.
