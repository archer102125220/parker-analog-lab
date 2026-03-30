import { defineEventHandler, getRouterParam } from 'h3';
import { defineRouteMeta } from 'nitropack/runtime';

defineRouteMeta({
  openAPI: {
    tags: ['Analog RESTful API 示範'],
    summary: '[示範] 取得單一資源 (GET Single)',
    description: '展示在 Analog 中如何撰寫擷取單一資源的 GET 路由。此範例重點在於示範如何透過 `getRouterParam` 取得路由中的動態參數 `[id]`。',
    parameters: [
      { in: 'path', name: 'id', description: '資源的唯一識別碼', required: true }
    ],
    responses: {
      200: { description: '成功取得資料' },
      404: { description: '找不到該資源' }
    }
  }
});

export default defineEventHandler((event) => {
  // 透過 getRouterParam 可以取得路由結構中的動態參數 [id]
  const id = getRouterParam(event, 'id');
  
  // 根據該 ID 去資料庫查詢對應的一筆資料
  
  return {
    success: true,
    method: 'GET',
    message: `成功取得 ID 為 ${id} 的使用者資料`,
    data: {
      id: id,
      name: '範例使用者',
      email: 'example@analog.js'
    }
  };
});
