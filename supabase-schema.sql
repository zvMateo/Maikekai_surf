-- Maikekai Surf Database Schema

-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'customer');
CREATE TYPE plan_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'customer',
  phone TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Surf plans table
CREATE TABLE surf_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  level plan_level NOT NULL,
  duration_days INTEGER NOT NULL,
  duration_nights INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  max_participants INTEGER DEFAULT 6,
  features TEXT[] DEFAULT '{}',
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  plan_id UUID REFERENCES surf_plans(id) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  participants INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10,2) NOT NULL,
  status booking_status DEFAULT 'pending',
  special_requests TEXT,
  contact_info JSONB,
  payment_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  booking_id UUID REFERENCES bookings(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  title TEXT,
  comment TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT true,
  google_review_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart items table (for temporary shopping cart)
CREATE TABLE cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  plan_id UUID REFERENCES surf_plans(id) NOT NULL,
  start_date DATE NOT NULL,
  participants INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_surf_plans_level ON surf_plans(level);
CREATE INDEX idx_surf_plans_active ON surf_plans(is_active);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_plan_id ON bookings(plan_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_dates ON bookings(start_date, end_date);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_public ON reviews(is_public);
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);

-- Row Level Security (RLS) Policies

-- Profiles policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Surf plans policies (public read, admin write)
ALTER TABLE surf_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active surf plans" ON surf_plans
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage surf plans" ON surf_plans
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Bookings policies
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pending bookings" ON bookings
  FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Admins can view all bookings" ON bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all bookings" ON bookings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Reviews policies
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public reviews" ON reviews
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view own reviews" ON reviews
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own unverified reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id AND is_verified = false);

CREATE POLICY "Admins can manage all reviews" ON reviews
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Cart items policies
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own cart items" ON cart_items
  FOR ALL USING (auth.uid() = user_id);

-- Functions and triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_surf_plans_updated_at 
  BEFORE UPDATE ON surf_plans 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at 
  BEFORE UPDATE ON bookings 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at 
  BEFORE UPDATE ON reviews 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert sample surf plans
INSERT INTO surf_plans (name, description, level, duration_days, duration_nights, price, original_price, max_participants, features, image_url) VALUES
(
  'Plan Principiante',
  'Perfecto para quienes nunca han surfeado. Incluye hospedaje cómodo y clases básicas.',
  'beginner',
  3,
  2,
  180.00,
  220.00,
  6,
  ARRAY[
    '2 noches de hospedaje',
    '3 clases de surf (2 horas c/u)',
    'Tabla de surf incluida',
    'Traje de neopreno',
    'Instructor certificado',
    'Desayuno incluido',
    'Transporte a las playas'
  ],
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
),
(
  'Plan Intermedio',
  'Para surfistas con experiencia básica que quieren mejorar su técnica.',
  'intermediate',
  5,
  4,
  320.00,
  400.00,
  4,
  ARRAY[
    '4 noches de hospedaje',
    '5 clases de surf (2 horas c/u)',
    'Tabla premium incluida',
    'Traje de neopreno',
    'Instructor personalizado',
    'Todas las comidas incluidas',
    'Transporte a múltiples playas',
    'Video análisis de técnica',
    'Certificado de surf'
  ],
  'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
),
(
  'Plan Avanzado',
  'Experiencia premium para surfistas experimentados que buscan perfeccionar su estilo.',
  'advanced',
  7,
  6,
  490.00,
  600.00,
  2,
  ARRAY[
    '6 noches de hospedaje premium',
    '7 clases de surf avanzado',
    'Tabla profesional incluida',
    'Equipo completo premium',
    'Instructor privado',
    'Todas las comidas + snacks',
    'Tour a playas secretas',
    'Sesión de fotos profesional',
    'Certificación avanzada',
    'Acceso a spots exclusivos'
  ],
  'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
);
