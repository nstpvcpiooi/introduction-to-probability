# ai-worker

Cloudflare Worker làm proxy gọi [Beeknoee](https://platform.beeknoee.com/docs) để sinh hướng dẫn giải bài tập, giữ API key bí mật (site chính là static/GitHub Pages nên không thể giấu key phía client).

## Chạy thử cục bộ

1. `npm install` (trong thư mục `ai-worker/`).
2. Lấy API key tại https://platform.beeknoee.com, copy `.dev.vars.example` thành `.dev.vars` và điền `BEEKNOEE_API_KEY=sk-bee-...` (file này đã bị `.gitignore`, không commit).
3. `npx wrangler kv namespace create RATE_LIMIT_KV`, dán `id` trả về vào `wrangler.toml`.
4. `npm run dev` → worker chạy tại `http://localhost:8787`.
5. Ở thư mục `math-textbook/`, tạo `.env.local` với `VITE_AI_GUIDE_ENDPOINT=http://localhost:8787`.

## Deploy thật

1. `npx wrangler login`.
2. Sửa `ALLOWED_ORIGIN` trong `wrangler.toml` thành domain GitHub Pages thật (ví dụ `https://<username>.github.io`).
3. `npx wrangler secret put BEEKNOEE_API_KEY` (nhập key khi được hỏi).
4. `npm run deploy` → lấy URL worker (`https://book-web-ai-guide.<subdomain>.workers.dev`), điền vào `VITE_AI_GUIDE_ENDPOINT` trong `.env` của `math-textbook/` trước khi build production.
