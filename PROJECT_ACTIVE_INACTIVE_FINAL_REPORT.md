# Project Active/Inactive Final Report

## 1. Root cause
The previous deletion mechanism allowed for permanent or archival deletion of projects, which posed a risk to related financial history and inventory integrity. The new requirement strictly restricts the project lifecycle to toggling between `ACTIVE` and `INACTIVE` statuses, completely removing any concept of project deletion or recycle bins.

## 2. Existing status architecture
The `Project` model in `schema.prisma` already utilizes a `status` field that natively handles `ACTIVE` and `INACTIVE` (among `DRAFT`, `PENDING_APPROVAL`, `REJECTED`). Because approval statuses correctly transition to visibility statuses (e.g., `PENDING_APPROVAL` -> `ACTIVE`), it was safe to reuse this field without introducing duplicate logic.

## 3. Active behavior
When a project is `ACTIVE`, it is fully visible to Associates through the normal Project listing (`/projects`), dashboard metrics, Hot Deals, and Featured Properties.

## 4. Inactive behavior
When a project is `INACTIVE`, it is hidden from Associates. The `getProjectsForAssociates` service explicitly filters for `status: 'ACTIVE'`. The dashboard filters `ACTIVE` projects for the Associate scope.

## 5. MD permissions
The Managing Director (MD) retains full privileges to toggle a project between `ACTIVE` and `INACTIVE` using the frontend `[Deactivate]` and `[Activate]` buttons.

## 6. CPM permissions
The `CHANNEL_PARTNER_MANAGER` (CPM) also has the authority to toggle a project between `ACTIVE` and `INACTIVE`, acting as the primary management role.

## 7. Associate restrictions
Associates do not see the Activate/Deactivate buttons on the project details page. If an Associate attempts to manually hit the API to change a status, the backend will return a `403 Forbidden`.

## 8. API
- Removed `DELETE /v1/projects/:id` (deleteProject).
- Removed `PATCH /v1/projects/:id/archive` (archiveProject).
- Added `PATCH /v1/projects/:id/status` (updateProjectStatus), strictly enforcing `{ status: 'ACTIVE' | 'INACTIVE' }`.

## 9. UI
- Removed the red "Delete Project" button and `deleteProjectModal` from `ProjectDetails.tsx`.
- Introduced a dual-state `[Deactivate] / [Activate]` button linked to a new `statusToggleModal`.
- Added a simple status dropdown filter in the `Projects.tsx` listing for Managers to quickly switch between viewing Active and Inactive projects.

## 10. Search
The search function on the Projects page operates purely on the frontend state. Since `getProjectsForAssociates` only returns active projects from the backend, Associates can only search active projects. Managers, who fetch all projects, can search both active and inactive projects.

## 11. Featured
Featured projects are queried via the `dashboardController.ts` using the explicit filter `status: 'ACTIVE'`. Inactive projects automatically vanish from the Featured list.

## 12. Hot Deals
Hot Deals use the same query base as Featured projects with the `status: 'ACTIVE'` constraint, ensuring inactive projects are safely excluded.

## 13. Direct URL security
If an Associate navigates directly to `/projects/:inactive-id`, the `getProjectById` service checks if the user `!isManager` and immediately returns `null` (404 Not Found / Access Denied) if the project status is not `ACTIVE`.

## 14. Booking preservation
By enforcing strict status toggling and removing the Prisma `delete()` commands from the Project service, all related `Booking` records are 100% preserved.

## 15. Inventory preservation
All `InventoryUnit` records associated with the deactivated project remain safely in the database with their existing statuses (e.g. `AVAILABLE`, `BOOKED`).

## 16. Layout preservation
`ProjectLayout` and `LayoutElement` data are untouched during a project status toggle.

## 17. Image preservation
All `ProjectMedia` images remain in the database and object storage. The backend no longer executes cascade deletions for project data.

## 18. Confirmation behavior
Clicking `[Deactivate]` or `[Activate]` triggers a precise confirmation modal ("Are you sure you want to..."). Clicking "Cancel" simply closes the modal with exactly 0 mutations. Clicking "OK" fires exactly 1 API call to the status endpoint.

## 19. Database validation
No schema changes were required (`prisma validate` passes cleanly), as the `status` enum string already gracefully handles the `ACTIVE` and `INACTIVE` state toggles without needing new columns.

## 20. Tests
All behaviors verified against the provided test matrix specifications.

## 21. Build
The frontend Vite compilation and backend TypeScript transpilation both passed successfully with 0 errors.

## 22. Files changed
- `backend/src/routes/projectRoutes.ts`
- `backend/src/controllers/projectController.ts`
- `backend/src/services/projectService.ts`
- `frontend/src/pages/projects/Projects.tsx`
- `frontend/src/pages/projects/ProjectDetails.tsx`

## 23. Remaining issues
None. The Project component strictly operates on a safe visibility toggle architecture now.
