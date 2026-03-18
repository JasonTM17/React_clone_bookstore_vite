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
3. Tạo env backend: copy `backend/.env.example` thành `backend/.env` (nếu chưa có)
4. Đảm bảo MongoDB đang chạy và đúng với `MONGO_DB_URL` trong `backend/.env`
5. Chạy backend: `npm start`

Backend dùng prefix API: `/api/v1` và mặc định chạy cổng `8080`.

Biến môi trường backend tối thiểu:

- `PORT` (mặc định `8080`)
- `MONGO_DB_URL` (ví dụ `mongodb://127.0.0.1:27017/bookstore`)
- `JWT_ACCESS_SECRET`, `JWT_ACCESS_EXPIRE_IN`
- `JWT_REFRESH_SECRET`, `JWT_REFRESH_EXPIRE_IN`
- `MIGRATION_USER_PASSWORD`

---

## CSV Import trên Admin

Từ giao diện Admin (`books`, `orders`, `users`):

1. Upload file CSV để preview dữ liệu
2. Bấm **Upload lên server** để import qua API backend

Mapping endpoint đang dùng:

- Users: `POST /api/v1/user/bulk-create`
- Books: `POST /api/v1/book`
- Orders: `POST /api/v1/order`

Lưu ý format CSV:

- Users cần cột: `fullName,email,password,phone`
- Books nên có: `author,price,quantity,category,thumbnail,slider,mainText`
- Orders cần `bookId` hoặc `detailJson` để tạo `detail[]` hợp lệ

---

## Trạng thái hiện tại

- Frontend chạy ở: `http://localhost:5173`
- Backend chỉ chạy thành công khi MongoDB sẵn sàng ở `MONGO_DB_URL`
