---
name: Build Tools & Environment Check (Vite + Analog)
description: Guidelines for using Vite with Analog.js and checking environment configuration
---

# Build Tools & Environment Check (Vite + Analog)

## 🎯 When to Use This Skill

Use this skill when:
- Starting development server
- Building for production
- Running tests with Vitest
- Setting up new development environment
- **Getting Vite or Analog build errors**

## 📋 Correct Commands

### Development

```bash
# ✅ CORRECT - Start Vite dev server
yarn dev        # Starts Vite dev server (SSR + client)

# ✅ CORRECT - Preview production build
yarn preview    # Starts SSR preview server
```

### Production

```bash
# ✅ CORRECT - Build with Vite
yarn build

# Output: dist/analog/
#   ├── public/   # Client bundle
#   └── server/   # SSR server bundle (index.mjs)
```

### Testing

```bash
# ✅ CORRECT - Run tests with Vitest
yarn test
```

**Do NOT use** `ng serve` or `ng build` directly — always use the `yarn` scripts.

---

## 📋 Environment Check Workflow

### Before Starting Dev Server (MANDATORY)

**MUST check these things**:

1. **`.env` file exists and is readable**
   - If `.env` is gitignored and unreadable → Ask user
   - If `.env` doesn't exist → Ask user

2. **`VITE_*` environment variables match your dev setup**
   - `VITE_API_BASE` should point to the correct dev API endpoint

**If mismatch OR .env is gitignored**:
```
AI: "I noticed .env is not readable or missing.
     Should I proceed with default configuration?"
```

**Wait for user confirmation before proceeding.**

---

## ✅ Correct Examples

### Example 1: Starting Dev Server

```bash
# Step 1: Check .env
cat .env | grep VITE_API_BASE
# Output: VITE_API_BASE=http://localhost:3000

# Step 2: Start server
yarn dev
# Server starts at http://localhost:5173
```

---

## ❌ Common Mistakes

### Mistake 1: Using Angular CLI Directly

```bash
# ❌ WRONG - May not work correctly with Analog plugins
ng serve

# ✅ CORRECT
yarn dev
```

### Mistake 2: Not Checking Environment Variables

```bash
# ❌ WRONG - Starting without checking .env
yarn dev
# API calls may fail if env vars are wrong

# ✅ CORRECT - Check first
cat .env | grep VITE_
# Verify, then start
yarn dev
```

---

## 📝 Checklist

### Before Starting Dev Server

- [ ] Using `yarn dev`
- [ ] Checked `.env` file exists and is readable
- [ ] Verified `VITE_*` variables are correct

### Before Building for Production

- [ ] Using `yarn build`
- [ ] Verified environment variables are set
- [ ] Checked `vite.config.ts` configuration

---

## 💡 Pro Tips

### Tip 1: Vite Environment Variables

Vite exposes env variables with `VITE_` prefix to the client:

```typescript
// ✅ CORRECT - Browser-accessible
// .env
VITE_API_BASE=http://localhost:3000

// Usage
const apiBase = import.meta.env['VITE_API_BASE'];
```

### Tip 2: Analog File-Based Routing

Pages in `src/app/pages/` follow Analog's file-based routing:

```
src/app/pages/
├── index.page.ts      → /
├── about.page.ts      → /about
└── blog/
    └── [id].page.ts   → /blog/:id
```

### Tip 3: Server-Side API Routes

Server routes in `src/server/routes/`:

```
src/server/routes/
└── api/
    └── users.get.ts   → GET /api/users
```

---

## 🔗 Related Rules

- `.agent/rules/build-tools.md`
- `GEMINI.md` - Build & Dev Tooling section
- `CLAUDE.md` - Build Tools section
