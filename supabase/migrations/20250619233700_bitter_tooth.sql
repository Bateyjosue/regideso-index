/*
  # Initial Schema Setup for REGIDESO

  1. New Tables
    - `Direction` - Regional directions
    - `Agency` - Local agencies under directions
    - `Avenue` - Streets/avenues under agencies
    - `Level` - Agent authorization levels
    - `Category` - Categories for agents and subscribers
    - `Agent` - Field agents information
    - `Subscriber` - Water service subscribers
    - `User` - System users with authentication
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Role enum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role "Role" DEFAULT 'USER',
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create Direction table
CREATE TABLE IF NOT EXISTS "Direction" (
  code_direction uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create Agency table
CREATE TABLE IF NOT EXISTS "Agency" (
  code_agency uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code_direction uuid NOT NULL REFERENCES "Direction"(code_direction),
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create Avenue table
CREATE TABLE IF NOT EXISTS "Avenue" (
  code_avenue uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code_agency uuid NOT NULL REFERENCES "Agency"(code_agency),
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create Level table
CREATE TABLE IF NOT EXISTS "Level" (
  code_level uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  priority INTEGER DEFAULT 1,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create Category table
CREATE TABLE IF NOT EXISTS "Category" (
  code_category uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  tariff_rate DECIMAL(10, 2) DEFAULT 0,
  connection_fee DECIMAL(10, 2) DEFAULT 0,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create Agent table
CREATE TABLE IF NOT EXISTS "Agent" (
  code_agent uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  matricule_agent TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  sur_name TEXT NOT NULL,
  telephone TEXT NOT NULL,
  code_agency uuid NOT NULL REFERENCES "Agency"(code_agency),
  code_level uuid NOT NULL REFERENCES "Level"(code_level),
  code_category uuid NOT NULL REFERENCES "Category"(code_category),
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create Subscriber table
CREATE TABLE IF NOT EXISTS "Subscriber" (
  code_subscriber uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  sur_name TEXT NOT NULL,
  telephone TEXT NOT NULL,
  code_avenue uuid NOT NULL REFERENCES "Avenue"(code_avenue),
  code_category uuid NOT NULL REFERENCES "Category"(code_category),
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create IndexReading table
CREATE TABLE IF NOT EXISTS "IndexReading" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code_subscriber uuid NOT NULL REFERENCES "Subscriber"(code_subscriber),
  previous_reading INTEGER NOT NULL,
  current_reading INTEGER NOT NULL,
  consumption INTEGER NOT NULL,
  reading_date DATE NOT NULL,
  code_agent uuid NOT NULL REFERENCES "Agent"(code_agent),
  notes TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create LeakReport table
CREATE TABLE IF NOT EXISTS "LeakReport" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  description TEXT NOT NULL,
  code_agent uuid NOT NULL REFERENCES "Agent"(code_agent),
  reported_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in-progress', 'resolved')),
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Enable Row Level Security
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Direction" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Agency" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Avenue" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Level" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Agent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscriber" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "IndexReading" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LeakReport" ENABLE ROW LEVEL SECURITY;

-- Create basic policies
CREATE POLICY "Public users can view" ON "User" FOR SELECT USING (true);
CREATE POLICY "Public directions can view" ON "Direction" FOR SELECT USING (true);
CREATE POLICY "Public agencies can view" ON "Agency" FOR SELECT USING (true);
CREATE POLICY "Public avenues can view" ON "Avenue" FOR SELECT USING (true);
CREATE POLICY "Public levels can view" ON "Level" FOR SELECT USING (true);
CREATE POLICY "Public categories can view" ON "Category" FOR SELECT USING (true);
CREATE POLICY "Public agents can view" ON "Agent" FOR SELECT USING (true);
CREATE POLICY "Public subscribers can view" ON "Subscriber" FOR SELECT USING (true);
CREATE POLICY "Public index readings can view" ON "IndexReading" FOR SELECT USING (true);
CREATE POLICY "Public leak reports can view" ON "LeakReport" FOR SELECT USING (true);

-- Insert initial data
INSERT INTO "Direction" (name, updatedAt) VALUES 
  ('Direction Technique', now()),
  ('Direction Commerciale', now()),
  ('Direction Administrative', now());

INSERT INTO "Level" (name, description, priority, updatedAt) VALUES
  ('Field Agent', 'Basic field operations and meter reading', 1, now()),
  ('Senior Agent', 'Advanced field operations with emergency response', 2, now()),
  ('Supervisor', 'Team supervision and advanced permissions', 3, now());

INSERT INTO "Category" (name, description, color, tariff_rate, connection_fee, updatedAt) VALUES
  ('Domestic Basic', 'Standard household water supply', '#3B82F6', 450, 25000, now()),
  ('Domestic Premium', 'High-volume household connections', '#10B981', 650, 35000, now()),
  ('Commercial', 'Business and commercial establishments', '#F59E0B', 850, 50000, now()),
  ('Field Operations', 'Field-based water service operations', '#3B82F6', 0, 0, now()),
  ('Maintenance', 'Infrastructure maintenance and repairs', '#10B981', 0, 0, now());