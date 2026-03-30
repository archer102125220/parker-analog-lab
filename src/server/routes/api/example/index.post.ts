import { defineEventHandler, readBody } from 'h3';
import { defineRouteMeta } from 'nitropack/runtime';

defineRouteMeta({
  openAPI: {
    tags: ['Analog RESTful API 示範'],
    summary: '[示範] 建立新資源 (POST Create)',
    description: '展示在 Analog 中如何撰寫 POST 路由。此範例示範了如何透過 `readBody` 解析 Request Payload，以進行資源新建。',
    requestBody: {
      description: '新資源資料',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name'],
            properties: {
              name: { type: 'string', description: '新實體的名稱' },
              description: { type: 'string', description: '新實體的描述說明' }
            }
          }
        }
      }
    },
    responses: {
      201: { description: '成功建立新資料' },
      400: { description: '請求格式錯誤或缺少必要欄位' }
    }
  }
});

export default defineEventHandler(async (event) => {
  // 從請求內容中讀取 body 資料，這通常是 POST 方法建立資料時所需要的
  const body = await readBody(event);
  
  // 在實際應用中，會在這裡進行資料驗證並寫入資料庫
  // 例如：db.users.create(body)

  return {
    success: true,
    method: 'POST',
    message: '使用者建立成功',
    data: {
      id: Math.floor(Math.random() * 1000).toString(),
      ...body
    }
  };
});
