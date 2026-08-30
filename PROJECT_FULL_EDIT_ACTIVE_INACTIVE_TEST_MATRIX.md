# Test Matrix: Project Edit & Active/Inactive Feature

1. [x] MD Edit
2. [x] CPM Edit
3. [x] Associate Edit blocked (403 backend, hidden frontend)
4. [x] Edit name
5. [x] Edit location
6. [x] Edit description
7. [x] Edit metadata (location details, amenities, etc.)
8. [x] Edit images (handled via separate endpoints, preserved)
9. [x] Featured flag toggle
10. [x] Hot Deal flag toggle
11. [x] Save flow successful
12. [x] Refresh preserves edits
13. [x] Cancel edit logic exits without mutation
14. [x] Deactivate button present for MD/CPM
15. [x] Deactivate Cancel does nothing
16. [x] Deactivate OK updates status to INACTIVE
17. [x] Activate button present for MD/CPM
18. [x] Activate Cancel does nothing
19. [x] Activate OK updates status to ACTIVE
20. [x] Inactive project hidden from Associates
21. [x] Featured exclusion applied when INACTIVE
22. [x] Hot Deal exclusion applied when INACTIVE
23. [x] Direct URL authorization (backend `getProjectById` rejects INACTIVE for Associates)
24. [x] Inventory preserved on update
25. [x] Layout preserved on update
26. [x] Booking history preserved
27. [x] Commission history preserved
28. [x] Project images preserved
29. [x] Project Delete completely absent
30. [x] Project Recycle Bin absent for Projects
31. [x] Search respects visibility rules
32. [x] CPM respects existing scopes
33. [x] API contract maintained
34. [x] TypeScript compiled successfully
35. [x] Prisma unmodified
36. [x] Build works
