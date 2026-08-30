# Final Delete, Logout, & PWA Test Matrix

## 1. Logout Confirmation
| Test Case | Steps | Expected Result | Pass/Fail |
|-----------|-------|-----------------|-----------|
| Desktop Sidebar Logout | Click Logout in sidebar -> Click Cancel | Modal closes, user remains logged in | [ ] |
| Desktop Sidebar Logout | Click Logout in sidebar -> Click OK | User is logged out and redirected | [ ] |
| Mobile Nav Logout | Open mobile menu -> Click Logout -> Click Cancel | Modal closes, user remains logged in | [ ] |
| Mobile Nav Logout | Open mobile menu -> Click Logout -> Click OK | User is logged out and redirected | [ ] |

## 2. Delete Confirmation
| Test Case | Steps | Expected Result | Pass/Fail |
|-----------|-------|-----------------|-----------|
| User Deletion | Click Delete User -> Read warning -> Cancel | Modal closes, user remains | [ ] |
| User Deletion | Click Delete User -> Read warning -> Confirm | User is deleted (data cannot be retrieved) | [ ] |
| Team Deletion | Click Delete Team -> Click Cancel | Modal closes, team is safe | [ ] |
| Team Deletion | Click Delete Team -> Click Confirm | Team is deleted permanently | [ ] |
| Offer Archiving | Click Archive Offer -> Click Cancel | Modal closes, offer remains | [ ] |
| Offer Archiving | Click Archive Offer -> Click Confirm | Offer is archived | [ ] |
| Carousel Deletion | Click Delete Banner -> Click Cancel | Modal closes, banner remains | [ ] |
| Carousel Deletion | Click Delete Banner -> Click Confirm | Banner is deleted | [ ] |
| FAQ Deletion | Click Delete FAQ -> Click Cancel | Modal closes, FAQ remains | [ ] |
| FAQ Deletion | Click Delete FAQ -> Click Confirm | FAQ is deleted | [ ] |
| Popup Deletion | Click Delete Popup -> Click Cancel | Modal closes, popup remains | [ ] |
| Popup Deletion | Click Delete Popup -> Click Confirm | Popup is deleted | [ ] |

## 3. PWA Icon & Splash Screen
| Test Case | Steps | Expected Result | Pass/Fail |
|-----------|-------|-----------------|-----------|
| Android Installation | Install PWA on Android | Icon is square with white padding | [ ] |
| Android Splash Screen | Open installed PWA | Splash screen has white background, no black circles | [ ] |
| iOS Installation | Add to Home Screen | Icon is square with white padding | [ ] |
