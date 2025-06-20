-- Update admin user password to a non-empty value
UPDATE "User" 
SET password_hash = 'admin123' 
WHERE email = 'admin@reg.com';

-- Also update the auth.users table if it exists
UPDATE auth.users
SET encrypted_password = crypt('admin123', gen_salt('bf'))
WHERE email = 'admin@reg.com';