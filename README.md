# RuRadar (俄贸雷达) MVP

## 本地运行
1. 复制 `.env.local.example` 为 `.env.local` 并填写 Supabase 参数
2. 安装依赖：`npm i`
3. 启动：`npm run dev`

## Supabase
- 运行 `supabase.sql` 建表

## 路由
- `/` 首页
- `/tenders` 列表 + 搜索
- `/tender/[id]` 详情 + 公众号短文一键复制
- `/admin` 后台登录
- `/admin/dashboard` 后台列表


zip 内结构：

ruradar/package.json

ruradar/next.config.js

ruradar/.env.local.example

ruradar/supabase.sql

ruradar/lib/supabasePublic.js

ruradar/lib/supabaseAdmin.js

ruradar/app/layout.js

ruradar/app/page.js

ruradar/app/tenders/page.js

ruradar/app/tender/[id]/page.js

ruradar/app/admin/page.js

ruradar/app/admin/dashboard/page.js

ruradar/app/api/admin/login/route.js

ruradar/README.md