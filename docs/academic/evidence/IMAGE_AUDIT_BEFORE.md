# Image Audit Log — Pre-Correction (Before Fix)

**Audit Date**: 2026-11-21 17:55:35 Local Time  
**Scope**: Full scan across all component, page, and data files (`src/`)  
**Method**: Automated HTTP HEAD requests via Node.js script `scripts/check_images.mjs` against CDN endpoints.  
**Total Unique Image URLs Scanned**: 28  

## Summary
- **Passed (HTTP 200)**: 26
- **Failed (HTTP 404)**: 2

---

## Detailed Results

| Status | URL | Context / Target Location |
|---|---|---|
| OK [200] | `https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80` | `about/page.tsx` (Hero) |
| OK [200] | `https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80` | `about/page.tsx` (Founding team) |
| OK [200] | `https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80` | `layout.tsx` (JSON-LD schema) |
| OK [200] | `https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80` | `AtmosphereSection.tsx` |
| OK [200] | `https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80` | `AtmosphereSection.tsx` |
| OK [200] | `https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80` | `AtmosphereSection.tsx` |
| OK [200] | `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80` | `AtmosphereSection.tsx` |
| OK [200] | `https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80` | `StorySection.tsx` |
| OK [200] | `https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80` | `CoffeeSceneFallback.tsx` |
| OK [200] | `https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`cat-coffee`) |
| OK [200] | `https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`cat-cold-coffee`) |
| OK [200] | `https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`cat-tea`) |
| OK [200] | `https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`cat-shakes`) |
| OK [200] | `https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`cat-mocktails`) |
| OK [200] | `https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`cat-pizza`) |
| **FAIL [404]** | `https://images.unsplash.com/photo-1621996346565-e3d5d6281729?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`cat-pasta` & `prod-pasta-alfredo`) |
| OK [200] | `https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`cat-burgers`) |
| OK [200] | `https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`cat-sandwiches`) |
| OK [200] | `https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`cat-desserts`) |
| OK [200] | `https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`cat-specials`) |
| OK [200] | `https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`prod-latte-signature`) |
| OK [200] | `https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`prod-cappuccino-florentine`) |
| OK [200] | `https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`prod-espresso-ristretto`) |
| **FAIL [404]** | `https://images.unsplash.com/photo-1578314670553-5d3c8c767e72?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`prod-mocha-valrhona`) |
| OK [200] | `https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`prod-coldbrew-saffron`) |
| OK [200] | `https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`prod-shake-belgian`) |
| OK [200] | `https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`prod-pizza-burrata`) |
| OK [200] | `https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80` | `mockMenu.ts` (`prod-tiramisu-haven`) |

## Root Cause of Image Failure
The two broken image IDs (`photo-1621996346565-e3d5d6281729` and `photo-1578314670553-5d3c8c767e72`) were hallucinated or removed IDs from the Unsplash public CDN, causing the browser to receive HTTP 404 responses during menu navigation.
