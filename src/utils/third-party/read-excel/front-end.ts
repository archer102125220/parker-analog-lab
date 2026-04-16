import { readSheet as _readXlsxFile } from 'read-excel-file/universal';
import type { ReadExcelResult } from './types';

export type ReadXlsxFileType = typeof _readXlsxFile;
export const readXlsxFile: ReadXlsxFileType = _readXlsxFile;

export function handleReadExcel(): Promise<ReadExcelResult> {
  return new Promise((resolve, reject) => {
    try {
      if (typeof document === 'undefined') {
        throw new Error('handleReadExcel can only be executed in the browser (client) side.');
      }

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
