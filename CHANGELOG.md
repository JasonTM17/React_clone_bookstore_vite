# Changelog

All notable changes to this project are documented in this file.

## [1.0.0] - 2026-03-18

### Added
- Full auth flow integration with backend `/api/v1` (login/register/session persistence).
- Role-aware admin access guard and authenticated API client interceptor.
- New admin data service for live dashboard/books/orders/users endpoints.
- Reusable admin CSV import/export panel with template download and preview.
- Backend environment template at `backend/.env.example`.

### Changed
- Migrated admin pages from mock data to live API-backed data rendering.
- Upgraded storefront UI/UX to a professional e-commerce style:
  - premium hero homepage,
  - modern book cards,
  - improved product detail layout,
  - enhanced cart page with summary panel,
  - header mini-cart drawer with quick cart actions.
- Updated project setup docs for MongoDB runtime requirements and CSV contracts.

### Fixed
- Corrected frontend auth payload mapping to backend DTO contract.
- Corrected CSV import payload mapping for users/books/orders to match backend validators.
- Prevented accidental commit of local backend `.env` by using `.env.example` and ignore rules.

[1.0.0]: https://github.com/JasonTM17/React_clone_bookstore_vite/releases/tag/v1.0.0
