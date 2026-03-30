import { defineEventHandler, getRouterParam, readBody } from 'h3';
import { defineRouteMeta } from 'nitropack/runtime';

defineRouteMeta({
  openAPI: {
    tags: ['Analog RESTful API 示範'],
    summary: '[示範] 覆寫資源 (PUT Replace)',
    description: '展示在 Analog 中如何撰寫 PUT 路由。此範例說明 PUT 通常代表「全面覆蓋更新」(Replace) 的 REST API 原則。',
    parameters: [
      { in: 'path', name: 'id', description: '資源的唯一識別碼', required: true }
    ],
    requestBody: {
      description: '完整的資源資料',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name'],
            properties: {
              name: { type: 'string', description: '實體名稱' },
              description: { type: 'string', description: '實體描述' }
            }
          }
        }
      }
    },
    responses: {
      200: { description: '成功更新資料' },
      400: { description: '請求格式錯誤或缺少必要欄位' },
      404: { description: '找不到該資源' }
    }
  }
});

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  
  // PUT 通常用來進行資料的「完全覆蓋更新 (Replace)」
  // 如果某些屬性沒有帶上，可能就會被寫為 null 或預設值
  
  return {
    success: true,
    method: 'PUT',
    message: `成功全面更新 ID 為 ${id} 的使用者資料`,
    data: {
      id: id,
      ...body
    }
  };
});
