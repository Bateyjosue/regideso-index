/*
  # Add User Credentials

  1. New Data
    - Add admin user credentials
    - Add senior agent credentials
    - Add field agent credentials
    
  2. Security
    - Passwords are stored as plain text for demo purposes only
    - In production, these would be properly hashed
*/

-- Add admin user
INSERT INTO "User" (email, password_hash, name, role, updatedAt)
VALUES ('admin@regideso.com', 'password123', 'Admin User', 'ADMIN', now());

-- Add agency for agents
INSERT INTO "Agency" (name, code_direction, updatedAt)
SELECT 'Agence Kigali', code_direction, now()
FROM "Direction"
WHERE name = 'Direction Technique'
LIMIT 1;

-- Add senior agent
INSERT INTO "Agent" (
  matricule_agent, 
  first_name, 
  last_name, 
  sur_name, 
  telephone, 
  code_agency, 
  code_level, 
  code_category, 
  updatedAt
)
SELECT 
  'AG001', 
  'Jean', 
  'Mukamana', 
  'Marie', 
  '+250788123456', 
  a.code_agency, 
  l.code_level, 
  c.code_category, 
  now()
FROM 
  "Agency" a,
  "Level" l,
  "Category" c
WHERE 
  l.name = 'Senior Agent' AND
  c.name = 'Field Operations'
LIMIT 1;

-- Add field agent
INSERT INTO "Agent" (
  matricule_agent, 
  first_name, 
  last_name, 
  sur_name, 
  telephone, 
  code_agency, 
  code_level, 
  code_category, 
  updatedAt
)
SELECT 
  'FA001', 
  'Pierre', 
  'Nkurunziza', 
  'Claude', 
  '+250788654321', 
  a.code_agency, 
  l.code_level, 
  c.code_category, 
  now()
FROM 
  "Agency" a,
  "Level" l,
  "Category" c
WHERE 
  l.name = 'Field Agent' AND
  c.name = 'Field Operations'
LIMIT 1;

-- Add auth users for agents
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
VALUES
  ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 'AG001@regideso.com', crypt('password123', gen_salt('bf')), now(), now(), now()),
  ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 'FA001@regideso.com', crypt('password123', gen_salt('bf')), now(), now(), now());