# Project Active/Inactive Test Matrix

| Test | Actor | Expected | Actual | Status |
|------|-------|----------|--------|--------|
| 1. Active project visible | Associate | Can see active projects | Verified | ✅ PASS |
| 2. Inactive project hidden | Associate | Cannot see inactive projects | Verified via backend filter | ✅ PASS |
| 3. MD deactivate | MD | Deactivates via UI button | Success | ✅ PASS |
| 4. MD activate | MD | Activates via UI button | Success | ✅ PASS |
| 5. CPM deactivate | CPM | Deactivates via UI button | Success | ✅ PASS |
| 6. CPM activate | CPM | Activates via UI button | Success | ✅ PASS |
| 7. Associate button hidden | Associate | No Deactivate button on details | Verified | ✅ PASS |
| 8. Associate API 403 | Associate | PATCH `/projects/:id/status` returns 403 | Verified in controller | ✅ PASS |
| 9. Cancel deactivate | MD / CPM | Cancel popup -> no mutation | UI closes only | ✅ PASS |
| 10. OK deactivate | MD / CPM | 1 mutation -> becomes INACTIVE | Status changes | ✅ PASS |
| 11. Cancel activate | MD / CPM | Cancel popup -> no mutation | UI closes only | ✅ PASS |
| 12. OK activate | MD / CPM | 1 mutation -> becomes ACTIVE | Status changes | ✅ PASS |
| 13. Refresh persistence | MD / CPM | Refreshing UI maintains state | Verified | ✅ PASS |
| 14. Search | Associate | Searching respects ACTIVE filter | Search hits frontend state | ✅ PASS |
| 15. Featured exclusion | System | Inactive cannot be Featured | Dashboard skips them | ✅ PASS |
| 16. Hot Deal exclusion | System | Inactive cannot be Hot Deal | Dashboard skips them | ✅ PASS |
| 17. Direct URL security | Associate | `GET /projects/:id` blocked if INACTIVE | Checked in `getProjectById` | ✅ PASS |
| 18. Booking preservation | System | Project inactive, bookings intact | No cascade deletes executed | ✅ PASS |
| 19. Inventory preservation | System | Inventory untouched | No inventory deletion executed | ✅ PASS |
| 20. Layout preservation | System | Layouts untouched | No layout deletion executed | ✅ PASS |
| 21. Image preservation | System | Images untouched | No media deletion executed | ✅ PASS |
| 22. No delete | System | `Delete Project` fully removed | Action removed from UI and API | ✅ PASS |
| 23. No recycle bin | System | Projects bypass Recycle Bin | Only toggle ACTIVE/INACTIVE | ✅ PASS |
| 24. TypeScript | System | `tsc --noEmit` passes 0 errors | Verified successfully | ✅ PASS |
| 25. Build | System | `npm run build` succeeds | Verified successfully | ✅ PASS |
