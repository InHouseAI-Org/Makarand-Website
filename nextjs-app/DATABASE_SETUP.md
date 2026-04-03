# Database & Admin Panel Setup Guide

## Overview
This guide will help you set up PostgreSQL database with Prisma and create an admin panel for managing:
- Projects
- Government Projects
- BMC Ward Officers
- Media Coverage
- Testimonials

## Prerequisites
- PostgreSQL installed locally OR use a cloud provider (Supabase, Neon, etc.)

## Step 1: Set Up PostgreSQL Database

### Option A: Local PostgreSQL
1. Install PostgreSQL: `brew install postgresql@15` (Mac) or download from postgresql.org
2. Start PostgreSQL: `brew services start postgresql@15`
3. Create database: `createdb makarand_website`
4. Get connection string: `postgresql://localhost:5432/makarand_website`

### Option B: Cloud PostgreSQL (Recommended)
Use [Supabase](https://supabase.com) (free tier):
1. Create account at supabase.com
2. Create new project
3. Go to Project Settings → Database
4. Copy the connection string (pooling mode)

## Step 2: Configure Environment Variables

Create `.env.local` file in nextjs-app folder:

```env
# Database
DATABASE_URL="your_postgresql_connection_string_here"

# NextAuth Secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="http://localhost:3000"

# YouTube API (optional)
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key_here
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=your_channel_id_here

# Instagram API (optional)
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=your_instagram_token_here
```

## Step 3: Run Database Migrations

```bash
cd nextjs-app

# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma db push

# Optional: Open Prisma Studio to view/edit data
npx prisma studio
```

## Step 4: Create Admin User

Run this command to create your first admin:

```bash
npm run create-admin
```

Or manually in Prisma Studio:
1. Run `npx prisma studio`
2. Open Admin table
3. Add new record with:
   - email: your@email.com
   - password: (use bcrypt hash - see below)
   - name: Your Name
   - role: admin

To hash password:
```bash
npx ts-node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your_password', 10));"
```

## Step 5: Access Admin Panel

After setup, access admin at:
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin

## Database Models

### Projects
- Community projects, ward development initiatives
- Fields: title, description, category, status, budget, location, dates, images

### Government Projects
- Government-funded projects, BMC initiatives
- Fields: title, description, department, budget, dates, documents

### Ward Officers
- BMC officers contact information
- Fields: name, designation, department, contact details

### Media
- Press coverage, videos, photos
- Fields: title, type, source, url, description

### Testimonials
- Citizen testimonials and feedback
- Fields: name, role, content, rating, photo

## Next Steps

After database setup:
1. Install NextAuth: `npm install next-auth @auth/prisma-adapter bcryptjs`
2. Install form libraries: `npm install react-hook-form zod @hookform/resolvers`
3. The admin panel code will be generated in the next step

## Troubleshooting

### Connection Error
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Check firewall/network settings

### Migration Errors
- Run `npx prisma migrate reset` to reset database
- Check schema.prisma for syntax errors

### Admin Login Issues
- Ensure admin user exists in database
- Check password hash is correct
- Verify NEXTAUTH_SECRET is set

## Support
For issues, check:
- Prisma docs: https://www.prisma.io/docs
- NextAuth docs: https://next-auth.js.org
