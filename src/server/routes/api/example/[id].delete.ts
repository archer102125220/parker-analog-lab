import { defineEventHandler, getRouterParam } from 'h3';
import { defineRouteMeta } from 'nitropack/runtime';

defineRouteMeta({
  openAPI: {
    tags: ['Analog RESTful API 示範'],
    summary: '[示範] 刪除資源 (DELETE)',
    description: '展示在 Analog 中如何撰寫 DELETE 路由。此範例示範取得 `[id]` 參數後，回傳相對應的 HTTP Response 表示資源已刪除。',
    parameters: [
      { in: 'path', name: 'id', description: '資源的唯一識別碼', required: true }
    ],
    responses: {
      200: { description: '成功刪除' },
      404: { description: '找不到該資源' }
    }
  }
});

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id');
  
  // 執行刪除作業，例如：db.users.delete({ where: { id } })

  return {
    success: true,
    method: 'DELETE',
    message: `成功刪除 ID 為 ${id} 的使用者`,
    data: {
      deletedId: id
    }
  };
});
