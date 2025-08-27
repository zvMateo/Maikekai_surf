-- Maikekai Surf Database Schema (catalog v2)

-- Enumerations
CREATE TYPE user_role AS ENUM ('admin', 'user');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

-- Profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product catalog core tables
CREATE TABLE product_types (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL
);

CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type_id INTEGER REFERENCES product_types(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  sorting INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE product_translations (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT,
  long_description TEXT,
  highlights TEXT[],
  PRIMARY KEY (product_id, locale)
);

CREATE TABLE product_prices (
  id SERIAL PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  currency TEXT NOT NULL,
  unit_amount INTEGER NOT NULL,
  interval TEXT,
  duration INTEGER
);

CREATE TABLE product_variants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  capacity INTEGER,
  duration_days INTEGER,
  options JSONB
);

CREATE TABLE product_availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  date_from DATE NOT NULL,
  date_to DATE NOT NULL,
  capacity INTEGER,
  policy JSONB
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL
);

CREATE TABLE product_categories (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

CREATE TABLE bundles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE bundle_items (
  bundle_id UUID REFERENCES bundles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  PRIMARY KEY (bundle_id, product_id)
);

CREATE TABLE bundle_translations (
  bundle_id UUID REFERENCES bundles(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT,
  long_description TEXT,
  highlights TEXT[],
  PRIMARY KEY (bundle_id, locale)
);

CREATE TABLE bundle_prices (
  id SERIAL PRIMARY KEY,
  bundle_id UUID REFERENCES bundles(id) ON DELETE CASCADE,
  currency TEXT NOT NULL,
  unit_amount INTEGER NOT NULL
);

-- Bookings referencing products
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  product_id UUID REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),
  start_date DATE,
  end_date DATE,
  participants INTEGER DEFAULT 1,
  total_price INTEGER NOT NULL,
  status booking_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed data
INSERT INTO product_types (slug) VALUES
  ('camp'),
  ('lodging'),
  ('excursion');

-- Products
INSERT INTO products (id, type_id, slug, sorting) VALUES
  ('00000000-0000-0000-0000-000000000001', 1, 'surf-guru', 1),
  ('00000000-0000-0000-0000-000000000002', 2, 'ocean-view-room', 1),
  ('00000000-0000-0000-0000-000000000003', 2, 'surf-hostel-bed', 2);

INSERT INTO product_translations (product_id, locale, name, short_description, long_description, highlights) VALUES
  ('00000000-0000-0000-0000-000000000001', 'en', 'Surf Guru Camp', 'Intensive surf camp for all levels', 'Seven-day program with lodging, meals and surf lessons.', ARRAY['6 nights lodging', '5 surf lessons', 'Equipment included']),
  ('00000000-0000-0000-0000-000000000001', 'es', 'Campamento Surf Guru', 'Campamento intensivo de surf para todos los niveles', 'Programa de siete días con hospedaje, comidas y clases de surf.', ARRAY['6 noches de hospedaje', '5 clases de surf', 'Equipo incluido']),
  ('00000000-0000-0000-0000-000000000002', 'en', 'Ocean View Room', 'Private room with ocean view', 'Comfortable room just steps from the beach.', ARRAY['Private bathroom', 'Breakfast included']),
  ('00000000-0000-0000-0000-000000000002', 'es', 'Habitación Vista al Mar', 'Habitación privada con vista al mar', 'Habitación cómoda a pasos de la playa.', ARRAY['Baño privado', 'Desayuno incluido']),
  ('00000000-0000-0000-0000-000000000003', 'en', 'Surf Hostel Bed', 'Shared room in surf hostel', 'Affordable bed in a friendly surf hostel.', ARRAY['Shared bathroom', 'Wi-Fi']),
  ('00000000-0000-0000-0000-000000000003', 'es', 'Cama en Surf Hostel', 'Habitación compartida en hostel surf', 'Cama económica en un hostel de surf amigable.', ARRAY['Baño compartido', 'Wi-Fi']);

INSERT INTO product_prices (product_id, currency, unit_amount) VALUES
  ('00000000-0000-0000-0000-000000000001', 'USD', 89900),
  ('00000000-0000-0000-0000-000000000002', 'USD', 5000),
  ('00000000-0000-0000-0000-000000000003', 'USD', 2500);

-- Bundles
INSERT INTO bundles (id, slug) VALUES
  ('00000000-0000-0000-0000-000000000010', 'surf-guru-ocean-view');

INSERT INTO bundle_items (bundle_id, product_id, quantity) VALUES
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000001', 1),
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000002', 1);

INSERT INTO bundle_translations (bundle_id, locale, name, short_description, long_description, highlights) VALUES
  ('00000000-0000-0000-0000-000000000010', 'en', 'Surf Guru + Ocean View Room', 'Camp plus premium room', 'Package including Surf Guru Camp and Ocean View Room.', ARRAY['7 days', 'Ocean view lodging']),
  ('00000000-0000-0000-0000-000000000010', 'es', 'Surf Guru + Habitación Vista al Mar', 'Campamento más habitación premium', 'Paquete que incluye Campamento Surf Guru y Habitación Vista al Mar.', ARRAY['7 días', 'Hospedaje con vista al mar']);

INSERT INTO bundle_prices (bundle_id, currency, unit_amount) VALUES
  ('00000000-0000-0000-0000-000000000010', 'USD', 94900);
