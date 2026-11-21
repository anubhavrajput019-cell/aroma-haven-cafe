# Academic Testing Evidence & Verification Log

**Date**: 2026-11-21 18:11:30 Local Time  
**Investigator**: AI Engineering Assistant on behalf of Anubhav Rajput  
**Target Application**: Aroma Haven Café (`http://localhost:3000`)  
**Scope**: Verification of Image 404 Resolution and Node.js `localStorage` Warning Elimination  

---

## 1. Image 404 Bug Investigation & Verification

### Initial Problem
During local testing of Aroma Haven Café, several Unsplash image requests failed with HTTP 404 status codes.

### Automated Diagnostic Audit
- Scanned all 28 Unsplash image URLs across the application repository (`src/`).
- Executed automated HTTP HEAD requests against all endpoints using `scripts/check_images.mjs`.
- **Pre-Fix Failure Rate**: 2 of 28 URLs returned HTTP 404 Not Found:
  1. `https://images.unsplash.com/photo-1621996346565-e3d5d6281729?auto=format&fit=crop&w=800&q=80` (Assigned to Pasta Category & Truffle Fettuccine)
  2. `https://images.unsplash.com/photo-1578314670553-5d3c8c767e72?auto=format&fit=crop&w=800&q=80` (Assigned to Valrhona Dark Chocolate Mocha)

### Root Cause
Genuine AI-generated hallucination during menu seed data assembly: the photo ID numbers were invalid or deactivated on Unsplash's CDN.

### Corrections Applied
1. **Pasta Category (`cat-pasta`)**: Updated to `https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80` (Verified 200 OK, authentic pasta plate).
2. **Creamy Truffle Mushroom Fettuccine (`prod-truffle-alfredo-fettuccine`)**: Updated to `https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80` (Verified 200 OK, gourmet creamy fettuccine).
3. **Valrhona Dark Chocolate Mocha (`prod-mocha-valrhona`)**: Updated to `https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80` (Verified 200 OK, mocha coffee with dark chocolate drizzle).

### Post-Correction Verification
- Re-ran `scripts/check_images.mjs` across all 29 URLs in the codebase.
- **Post-Fix Success Rate**: 29 of 29 passed (100% HTTP 200 OK).
- Automated visual browser inspection verified that:
  - Product page `/product/valrhona-dark-chocolate-mocha` loads the hero image in full fidelity without error.
  - Product page `/product/creamy-truffle-mushroom-fettuccine` loads without error.
  - Category and product routing operate without broken image placeholders.
- Real visual capture saved to: `docs/academic/evidence/product_page_verified.png`.

---

## 2. Node.js localStorage Experimental Warning Investigation & Resolution

### Initial Problem
Terminal outputs during Next.js compilation displayed repeated warnings:
```
(node:XXXXX) ExperimentalWarning: localStorage is not available because --localstorage-file was not provided.
```

### Stack Trace Analysis
Using `node --trace-warnings ./node_modules/next/dist/bin/next build`, traced the exact call:
```
at Object.get (node:internal/webstorage:42:21)
at get (node:internal/process/pre_execution:488:58)
at ...\.next\server\chunks\404.js:2:65371 (Zustand persist middleware default evaluation)
```

### Root Cause
1. Host runs Node.js `v26.13.1`. Modern Node.js (v22+) introduced experimental server-side `globalThis.localStorage`.
2. When accessed without `--localstorage-file`, Node emits an `ExperimentalWarning` to stderr and throws.
3. In Zustand's `persist` middleware implementation, the default parameter `{ storage: createJSONStorage(() => localStorage), ...baseOptions }` evaluates the default storage expression before spreading custom user options. Even though `cartStore` and `authStore` supply custom SSR-safe storage, Zustand's default evaluated `() => localStorage`, triggering Node's experimental getter.
4. **Functionality Impact**: Did not break client-side functionality (browser uses native `window.localStorage`), but polluted build logs and server outputs.

### Correction Applied
Implemented a server-side guard in `src/lib/constants/index.ts` and `next.config.js`:
```typescript
if (typeof window === 'undefined' && typeof globalThis !== 'undefined') {
  try {
    Object.defineProperty(globalThis, 'localStorage', {
      value: undefined,
      configurable: true,
      writable: true,
    });
  } catch {}
}
```
This safely neutralizes the experimental getter during Node.js compilation while preserving standard browser `window.localStorage` execution on the client.

### Post-Correction Verification
Ran `next build` across all 31 routes:
- Zero `ExperimentalWarning: localStorage` warnings emitted.
- All 31 pages compiled cleanly.
