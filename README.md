# RuRadar 俄贸雷达

一个面向俄罗斯 B2B 招投标信息的中文化平台原型。第一阶段只使用本地 mock 数据，不接入自动抓取、n8n、GitHub Actions 或部署流程。

## 技术栈

- Next.js App Router
- React
- 本地 mock 数据：`lib/mockTenders.js`

## 本地运行

```powershell
npm install
npm run dev
```

浏览器访问 `http://localhost:3000`。

## 路由

- `/` 首页与最新信息列表
- `/tenders` 信息列表、关键词搜索、分类筛选、时间排序
- `/tender/[id]` 信息详情与源站链接

## 后续接入真实数据

后续抓取或 n8n 只需要把真实数据转换成 `lib/mockTenders.js` 中相同的字段结构，或改为读取 API/数据库返回的同构 JSON：

- `id`
- `title`
- `originalTitle`
- `category`
- `procurementType`
- `organizer`
- `publishTime`
- `deadline`
- `region`
- `summary`
- `sourceUrl`

ruradar/README.md
