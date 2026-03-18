## Frontend (Vite + React)

Các bước chạy development:

1. Clone code
2. Cài thư viện frontend: `npm i`
3. Tạo env theo mẫu: copy `.env.example` thành `.env.development` (nếu cần)
4. Chạy frontend: `npm run dev`

---

Các bước chạy production preview frontend:

1. Cài thư viện frontend: `npm i`
2. Update `.env.production` (nếu cần)
3. Build frontend: `npm run build`
4. Preview frontend: `npm run preview`

---

## Backend (NestJS đã build sẵn)

Backend nằm trong thư mục `backend/`.

1. Vào thư mục backend: `cd backend`
2. Cài thư viện backend: `npm i --omit=dev`
3. Chạy backend: `npm start`

Backend dùng prefix API: `/api/v1` và mặc định chạy cổng `8080`.

---

## CSV Import trên Admin

Từ giao diện Admin (`books`, `orders`, `users`):

1. Upload file CSV để preview dữ liệu
2. Bấm **Upload lên server** để import qua API backend

Mapping endpoint đang dùng:

- Users: `POST /api/v1/user/bulk-create`
- Books: `POST /api/v1/book`
- Orders: `POST /api/v1/order`
