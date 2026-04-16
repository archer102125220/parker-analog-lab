import type { ReadExcelResult } from './types';

/**
 * 伺服器端專用的讀取 Excel 函式
 * 支援讀取實體檔案路徑 (string) 或檔案的 ArrayBuffer
 */
export async function handleReadExcelServer(input: string | ArrayBuffer): Promise<ReadExcelResult> {
  if (typeof window !== 'undefined' || typeof document !== 'undefined') {
    throw new Error('handleReadExcelServer can only be executed on the server side.');
  }

  try {
    // 伺服器版本可以專門引入 node 版本
    const { readSheet } = await import('read-excel-file/node');
    
    // readSheet(input) 的實作可以接收 file path (string) 也可以接 node buffer
    const rows = await readSheet(input as unknown as string);
    return { excel: rows, files: input };
  } catch (error) {
    throw error;
  }
}
