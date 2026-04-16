import { readSheet as _readXlsxFile } from 'read-excel-file/universal';
import type { Row, ParseDataResult } from 'read-excel-file/universal';

type readXlsxFileType = typeof _readXlsxFile;

interface Result {
  excel?: ParseDataResult<Record<string, unknown>> | Row[];
  files?: File | ArrayBuffer | string;
}

export const readXlsxFile: readXlsxFileType = _readXlsxFile;

export function handleReadExcel(): Promise<Result> {
  return new Promise((resolve, reject) => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept =
        '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel';
      input.setAttribute('type', 'file');
      input.setAttribute(
        'accept',
        '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
      );
      input.addEventListener('change', () => {
        const file = input.files?.[0] || new ArrayBuffer(0);
        readXlsxFile(file).then((rows) => {
          resolve({ excel: rows, files: file });
        });
      });
      input.click();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 伺服器端專用的讀取 Excel 函式
 * 支援讀取實體檔案路徑 (string) 或檔案的 ArrayBuffer
 */
export async function handleReadExcelServer(input: string | ArrayBuffer): Promise<Result> {
  if (typeof window !== 'undefined' || typeof document !== 'undefined') {
    throw new Error('handleReadExcelServer can only be executed on the server side.');
  }

  try {
    // 動態載入 node 版本以避免破壞 Client 端的 Vite Build
    const { readSheet } = await import('read-excel-file/node');
    
    // readSheet(input) 的實作可以接收 file path (string) 也可以接 node buffer
    const rows = await readSheet(input as unknown as string);
    return { excel: rows, files: input };
  } catch (error) {
    throw error;
  }
}
