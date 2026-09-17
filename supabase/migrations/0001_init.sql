-- ComidaPeruana — esquema inicial
--
-- Refleja types/content.ts. Todo texto visible para el viajero existe en dos
-- columnas (_en / _es) porque el producto es bilingüe desde el día uno.
--
-- El contenido es público y de solo lectura: lo edita el equipo editorial desde
-- el panel de Supabase con la service role, nunca desde el navegador. Por eso
-- RLS queda activo en todas las tablas y el rol anónimo solo puede leer filas
-- activas. No hay políticas de insert, update ni delete a propósito.

create table cities (
  id text primary key,
  slug text not null unique,
  name_en text not null,
  name_es text not null,
  country text not null,
  description_en text not null,
  description_es text not null,
  hero_image_url text not null,
  hero_image_alt_en text not null,
  hero_image_alt_es text not null,
  selection_image_url text,
  selection_image_alt_en text,
  selection_image_alt_es text,
  is_active boolean not null default true,
  sort_order integer not null default 0
);

create table districts (
  id text primary key,
  city_id text not null references cities (id) on delete cascade,
  slug text not null,
  name_en text not null,
  name_es text not null,
  description_en text,
  description_es text,
  image_url text,
  image_alt_en text,
  image_alt_es text,
  latitude double precision,
  longitude double precision,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  unique (city_id, slug)
);

create table categories (
  id text primary key,
  slug text not null unique,
  name_en text not null,
  name_es text not null,
  sort_order integer not null default 0
);

create table dishes (
  id text primary key,
  slug text not null unique,
  name_en text not null,
  name_es text not null,
  label_en text,
  label_es text,
  short_description_en text not null,
  short_description_es text not null,
  description_en text not null,
  description_es text not null,
  why_try_it_en text not null,
  why_try_it_es text not null,
  origin_en text,
  origin_es text,
  season_en text,
  season_es text,
  best_moment_en text,
  best_moment_es text,
  local_tip_en text,
  local_tip_es text,
  category_id text not null references categories (id),
  hero_image_url text not null,
  hero_image_alt_en text not null,
  hero_image_alt_es text not null,
  card_image_url text not null,
  card_image_alt_en text not null,
  card_image_alt_es text not null,
  -- Arreglos paralelos: ingredients_en[i] corresponde a ingredients_es[i].
  ingredients_en text[] not null default '{}',
  ingredients_es text[] not null default '{}',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  constraint ingredients_same_length
    check (array_length(ingredients_en, 1) is not distinct from
           array_length(ingredients_es, 1))
);

-- Un plato puede servirse en varias ciudades con distinta relevancia: el
-- ceviche es esencial en Lima y marginal en Cusco.
create table dish_cities (
  id text primary key,
  dish_id text not null references dishes (id) on delete cascade,
  city_id text not null references cities (id) on delete cascade,
  relevance_score integer not null default 0,
  local_description_en text,
  local_description_es text,
  sort_order integer not null default 0,
  unique (dish_id, city_id)
);

-- rating y review_count se cargan a mano desde Google Maps. El proyecto no
-- tiene cuenta de facturación en Google Cloud y no llama a Places API.
-- google_place_id queda nulo mientras no se verifique uno real: inventarlo
-- produciría enlaces rotos a Maps.
create table restaurants (
  id text primary key,
  slug text not null unique,
  name text not null,
  city_id text not null references cities (id) on delete cascade,
  district_id text not null references districts (id),
  google_place_id text,
  cuisine_en text,
  cuisine_es text,
  editorial_description_en text not null,
  editorial_description_es text not null,
  why_we_recommend_en text not null,
  why_we_recommend_es text not null,
  recommended_items_en text[] not null default '{}',
  recommended_items_es text[] not null default '{}',
  tags_en text[] not null default '{}',
  tags_es text[] not null default '{}',
  price_level smallint check (price_level between 1 and 4),
  rating numeric(2, 1) check (rating between 0 and 5),
  review_count integer check (review_count >= 0),
  hero_image_url text,
  hero_image_alt_en text,
  hero_image_alt_es text,
  latitude double precision,
  longitude double precision,
  is_active boolean not null default true
);

-- El corazón editorial: qué lugar recomendamos para qué plato y en qué orden.
-- El tope de tres es por ciudad, y un restaurante pertenece a una sola ciudad,
-- así que la restricción se aplica al consultar, no en el esquema.
create table dish_restaurants (
  id text primary key,
  dish_id text not null references dishes (id) on delete cascade,
  restaurant_id text not null references restaurants (id) on delete cascade,
  recommendation_text_en text not null,
  recommendation_text_es text not null,
  priority integer not null default 1,
  local_pick boolean not null default false,
  is_active boolean not null default true,
  unique (dish_id, restaurant_id)
);

create index districts_city_idx on districts (city_id, sort_order);
create index dish_cities_city_idx on dish_cities (city_id, sort_order);
create index dish_cities_dish_idx on dish_cities (dish_id);
create index restaurants_city_idx on restaurants (city_id);
create index dish_restaurants_dish_idx on dish_restaurants (dish_id, priority);

alter table cities enable row level security;
alter table districts enable row level security;
alter table categories enable row level security;
alter table dishes enable row level security;
alter table dish_cities enable row level security;
alter table restaurants enable row level security;
alter table dish_restaurants enable row level security;

create policy "public reads active cities" on cities
  for select using (is_active);
create policy "public reads active districts" on districts
  for select using (is_active);
create policy "public reads categories" on categories
  for select using (true);
create policy "public reads active dishes" on dishes
  for select using (is_active);
create policy "public reads dish_cities" on dish_cities
  for select using (true);
create policy "public reads active restaurants" on restaurants
  for select using (is_active);
create policy "public reads active dish_restaurants" on dish_restaurants
  for select using (is_active);
