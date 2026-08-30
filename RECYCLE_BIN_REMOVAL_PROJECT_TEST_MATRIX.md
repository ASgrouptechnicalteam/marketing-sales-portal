# Recycle Bin Removal & Project Edit/Status Test Matrix

This matrix verifies the complete removal of the Recycle Bin feature, the restoration of the direct-delete behavior for normal entities, and the correct operation of the Project Active/Inactive lifecycle.

| Test ID | Area | Test Description | Expected Result | Status |
|---|---|---|---|---|
| **Removal** | | | | |
| RM-01 | Routing | Access `/recycle-bin` directly | 404 Not Found (or redirects to Dashboard) | PASS |
| RM-02 | Navigation | Check Sidebar/Mobile Menu for Recycle Bin | Not present | PASS |
| RM-03 | Frontend | Verify `RecycleBin.tsx` and `recycleBinApi.ts` exist | Files deleted | PASS |
| RM-04 | Backend | Verify `recycleBinController.ts` & `recycleBinRoutes.ts` | Files deleted | PASS |
| RM-05 | Schema | Check Prisma schema for `deletedAt` | Columns removed | PASS |
| RM-06 | Schema | Check Prisma schema for `deletedById` | Columns removed | PASS |
| RM-07 | Database | Check `20260830221000_remove_recycle_bin` status | Applied successfully via `migrate deploy` | PASS |
| RM-08 | Codebase | Search for `recycleBin`, `deletedAt` | 0 results found (except legitimate logic) | PASS |
| **Direct Delete Restoration** | | | | |
| DD-01 | User | Delete a User | Permanently deleted from DB (`prisma.user.delete`) | PASS |
| DD-02 | Team | Delete a Team | Permanently deleted from DB (`prisma.team.delete`) | PASS |
| DD-03 | Inventory | Delete an InventoryUnit | Permanently deleted from DB (`prisma.inventoryUnit.delete`) | PASS |
| DD-04 | SiteVisit | Delete a SiteVisit | Permanently deleted from DB (`prisma.siteVisit.delete`) | PASS |
| DD-05 | DemoBooking | Delete a DemoBooking | Permanently deleted from DB (`prisma.demoBooking.delete`) | PASS |
| DD-06 | Offer | Delete an Offer | Permanently deleted from DB (`prisma.offer.delete`) | PASS |
| DD-07 | Confirmation | Click 'Cancel' on Delete User | Modal closes, no mutation, record remains | PASS |
| DD-08 | Confirmation | Click 'OK' on Delete User | Record permanently deleted directly | PASS |
| **Financial/Data Protection** | | | | |
| PR-01 | Booking | Delete associated Inventory Unit | Blocked by constraint, Booking preserved | PASS |
| PR-02 | Commission | Verify commissions persist | Protected, unchanged | PASS |
| **Project Edit & Status** | | | | |
| PE-01 | Edit Form | MD edits Project details and saves | Changes persist, 200 OK | PASS |
| PE-02 | Status | Deactivate project - click Cancel | Remains ACTIVE, no mutation | PASS |
| PE-03 | Status | Deactivate project - click OK | Status becomes INACTIVE | PASS |
| PE-04 | Status | Activate project - click Cancel | Remains INACTIVE, no mutation | PASS |
| PE-05 | Status | Activate project - click OK | Status becomes ACTIVE | PASS |
| PE-06 | Project Data | Edit project metadata | Inventory, Layout, Bookings, Commissions preserved | PASS |
| PE-07 | Images | Edit project metadata | Existing project images preserved | PASS |
| PE-08 | UI | Check for "Delete Project" button | Does not exist | PASS |
| PE-09 | UI | Check for "Project Recycle Bin" | Does not exist | PASS |
| **Roles & Permissions** | | | | |
| RP-01 | MD Role | MD edits/activates/deactivates | Allowed | PASS |
| RP-02 | CPM Role | CPM edits/activates/deactivates | Allowed (within scope) | PASS |
| RP-03 | Assoc Role | Associate views ACTIVE project | Visible normally | PASS |
| RP-04 | Assoc Role | Associate views INACTIVE project | Hidden from normal lists (Featured, Hot Deals) | PASS |
| RP-05 | Assoc Role | Associate attempts edit | Blocked / 403 | PASS |
| RP-06 | Assoc Role | Associate attempts status change | Blocked / 403 | PASS |
| RP-07 | Roles | Search for `ASSOCIATE_MANAGER` | Does not exist | PASS |
| **Build Integrity** | | | | |
| BI-01 | TypeScript | Run `npx tsc --noEmit` Frontend | Code 0 | PASS |
| BI-02 | TypeScript | Run `npx tsc --noEmit` Backend | Code 0 | PASS |
| BI-03 | Prisma | Run `npx prisma validate` | Code 0, valid | PASS |
| BI-04 | Build | Run `npm run build` Frontend | Code 0 | PASS |
| BI-05 | Build | Run `npm run build` Backend | Code 0 | PASS |
