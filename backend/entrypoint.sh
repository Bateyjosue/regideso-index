#!/bin/sh  

# Apply Prisma migrations and start the application  
npx prisma migrate deploy --schema=./prisma/schema.prisma  
npx prisma generate --schema=./prisma/schema.prisma  

# Run database migrations  
npx prisma migrate dev --name init --schema=./prisma/schema.prisma

# Run the main container command  
exec "$@"