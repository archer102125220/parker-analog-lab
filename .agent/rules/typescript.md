# TypeScript Rules

- NEVER use `any` - use generics, `unknown`, or precise types
- Use `as unknown as Type` for assertions, NEVER `as any`
- Use **inline type imports**: `import { Component, type OnInit } from '@angular/core'`
  - ❌ `import type { OnInit } from '@angular/core';` (separate line)
  - ✅ `import { Component, type OnInit } from '@angular/core';` (inline)
