# Component Import Update Guide

## Required Updates in All Components

### 1. React Router → Next.js Navigation

**Find and Replace:**
```typescript
// OLD (React Router)
import { Link } from "react-router";
import { useNavigate, useParams, useLocation } from "react-router";

// NEW (Next.js)
import Link from "next/link";
import { useRouter, useParams, usePathname } from "next/navigation";
```

**Component Updates:**
```typescript
// OLD
<Link to="/about">About</Link>

// NEW
<Link href="/about">About</Link>
```

```typescript
// OLD
const navigate = useNavigate();
const location = useLocation();

// NEW
const router = useRouter();
const pathname = usePathname();
```

### 2. Environment Variables

**Find and Replace:**
```typescript
// OLD (Vite)
import.meta.env.VITE_YOUTUBE_API_KEY

// NEW (Next.js)
process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
```

### 3. Client Components

All components using hooks need 'use client' directive:

```typescript
'use client';

import { useState } from 'react';
// ... rest of component
```

### 4. Images (Optional - For Optimization)

```typescript
// OLD
<img src={image} alt="..." />

// NEW (Next.js Image)
import Image from 'next/image';
<Image src={image} alt="..." width={800} height={600} />
```

## Files That Need Updates

### Components to Update:
- ✅ Header.tsx - Already updated
- ✅ Footer.tsx - Already updated
- ⚠️ ProjectDetail.tsx - Needs Link and useParams update
- ⚠️ MediaDetail.tsx - Needs Link and useParams update
- ⚠️ All other components using Link from react-router

### Search for These Patterns:
```bash
# Find all files with react-router imports
grep -r "from \"react-router\"" app/components/

# Find all files with Vite env vars
grep -r "import.meta.env" app/

# Find all files with <Link to=
grep -r "<Link to=" app/components/
```

## Quick Fix Script

Run these find-and-replace commands in your editor:

1. **Replace Link imports:**
   - Find: `import { Link } from "react-router";`
   - Replace: `import Link from "next/link";`

2. **Replace Link usage:**
   - Find: `<Link to="`
   - Replace: `<Link href="`

3. **Replace useLocation:**
   - Find: `import { useLocation } from "react-router";`
   - Replace: `import { usePathname } from "next/navigation";`
   - Find: `useLocation()`
   - Replace: `usePathname()`

4. **Replace environment variables:**
   - Find: `import.meta.env.VITE_`
   - Replace: `process.env.NEXT_PUBLIC_`

## Testing Checklist

After updates:
- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] No console errors about hooks
- [ ] Environment variables load correctly
- [ ] Images display properly
