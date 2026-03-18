# Handover - React Clone Bookstore Vite

## 1) Bản bàn giao

- Release hiện tại: `v1.0.0`
- Nhánh triển khai: `master`
- Repo: `https://github.com/JasonTM17/React_clone_bookstore_vite`
- Changelog: [CHANGELOG.md](CHANGELOG.md)

## 2) Phạm vi đã hoàn thành

### Frontend
- UI/UX storefront nâng cấp theo hướng production:
  - Hero homepage chuyên nghiệp, card sách hiện đại, trang chi tiết sản phẩm rõ ràng.
  - Giỏ hàng nâng cấp với summary panel và thao tác nhanh.
  - Mini-cart Drawer tại header (xem nhanh, sửa số lượng, xóa item).
- Auth flow đã đồng bộ backend:
  - Login/register đúng DTO backend.
  - Lưu session token + user vào local storage.
  - Gắn `Authorization` tự động qua axios interceptor.
- Admin đã chuyển từ mock sang live API:
  - Dashboard, books, orders, users lấy dữ liệu thật.
- CSV import/export hoàn chỉnh cho admin:
  - Download template, preview dữ liệu, import lên server.
  - Mapping payload đã khớp validator backend cho users/books/orders.

### Backend integration
- Tài liệu env backend và rule ignore secret local đã chuẩn hóa.
- API prefix dùng thống nhất: `/api/v1`.

## 3) Trạng thái kiểm thử

- Frontend build: **PASS** (`npm run build`)
- Frontend lint: **PASS** (`npm run lint`)
- Backend start: **BLOCKED nếu MongoDB local chưa chạy**
  - Lỗi quan sát: `ECONNREFUSED 127.0.0.1:27017`

## 4) Runbook vận hành

### Frontend
1. `npm install`
2. `npm run dev` (local) hoặc `npm run build` + `npm run preview` (production preview)

### Backend
1. `cd backend`
2. `npm install --omit=dev`
3. Tạo file env local từ [backend/.env.example](backend/.env.example)
4. Đảm bảo MongoDB chạy và đúng `MONGO_DB_URL`
5. `npm start`

## 5) Biến môi trường bắt buộc backend

- `PORT`
- `MONGO_DB_URL`
- `JWT_ACCESS_SECRET`
- `JWT_ACCESS_EXPIRE_IN`
- `JWT_REFRESH_SECRET`
- `JWT_REFRESH_EXPIRE_IN`
- `MIGRATION_USER_PASSWORD`

## 6) Checklist nghiệm thu nhanh

- [ ] Mở frontend thành công tại `http://localhost:5173`
- [ ] Login user hoạt động
- [ ] Admin login và vào `/admin` thành công
- [ ] Dashboard admin hiển thị dữ liệu thật
- [ ] Import CSV users/books/orders chạy thành công
- [ ] Header mini-cart cập nhật theo thao tác add/remove/update
- [ ] Build production pass

## 7) Rủi ro/Known issue còn lại

- Backend phụ thuộc MongoDB runtime; nếu máy chưa bật MongoDB service thì backend không khởi động được.
- Bundle `vendor-antd` vẫn lớn (warning chunk size), không ảnh hưởng chức năng nhưng có thể tối ưu thêm ở bản kế tiếp.

## 8) Đề xuất phiên bản tiếp theo (v1.0.1)

- Tối ưu chunk `vendor-antd` theo nhóm route/component.
- Thêm health-check endpoint và trang thông báo backend unavailable thân thiện hơn.
- Bổ sung e2e smoke test cho auth/cart/csv import.
