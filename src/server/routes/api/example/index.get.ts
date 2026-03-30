import { defineEventHandler, getQuery } from 'h3';
import { defineRouteMeta } from 'nitropack/runtime';

// Nitro 內建的編譯期巨集，用於提取 OpenAPI metadata
defineRouteMeta({
  openAPI: {
    tags: ['Analog RESTful API 示範'],
    summary: '[示範] 取得集合清單 (GET Collection)',
    description: '展示在 Analog 中如何撰寫 GET 集合路由。此範例示範了從 URL 取得 Query 參數 (`getQuery`)，並實作基礎的分頁邏輯。',
    parameters: [
      { in: 'query', name: 'page', description: '當前頁碼 (預設: 1)', required: false },
      { in: 'query', name: 'limit', description: '每頁顯示數量 (預設: 10)', required: false }
    ],
    responses: {
      200: {
        description: '成功取得列表'
      }
    }
  }
});

export default defineEventHandler((event) => {
  // 從 URL 中獲取 Query 參數，例如 /api/v1/users?page=1&limit=10
  const query = getQuery<{ page?: string; limit?: string }>(event);
  
  // 在實際應用中，通常會使用這些參數去資料庫抓取符合條件的列表
  const parsedPage = Number(query.page);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const parsedLimit = Number(query.limit);
  const limit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 10;

  return {
    success: true,
    method: 'GET',
    message: '取得使用者列表成功',
    meta: {
      page,
      limit,
      total: 100
    },
    data: [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' }
    ]
  };
});
