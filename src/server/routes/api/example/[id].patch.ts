import { defineEventHandler, getRouterParam, readBody } from 'h3';
import { defineRouteMeta } from 'nitropack/runtime';

defineRouteMeta({
  openAPI: {
    tags: ['Analog RESTful API 示範'],
    summary: '[示範] 部分更新資源 (PATCH Update)',
    description: '展示在 Analog 中如何撰寫 PATCH 路由。此範例同時使用了 `getRouterParam` (取得路由 ID) 與 `readBody` (取得更新欄位)，並說明 PATCH 代表「部分欄位更新」的 REST 原則。',
    parameters: [
      { in: 'path', name: 'id', description: '資源的唯一識別碼', required: true }
    ],
    requestBody: {
      description: '要修改的欄位資料',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: '新名稱' },
              description: { type: 'string', description: '新描述' }
            }
          }
        }
      }
    },
    responses: {
      200: { description: '成功更新資料' },
      400: { description: '請求格式錯誤' },
      404: { description: '找不到該資源' }
    }
  }
});

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  
  // PATCH 通常用來進行資料的「部分更新 (Update)」
  // 只更新請求中提共的欄位，保留原本未提供的欄位資料

  return {
    success: true,
    method: 'PATCH',
    message: `成功部分更新 ID 為 ${id} 的使用者資料`,
    data: {
      id: id,
      updatedFields: Object.keys(body)
    }
  };
});
