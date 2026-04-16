import { readSheet as _readXlsxFile } from 'read-excel-file/universal';
import type { Row, ParseDataResult } from 'read-excel-file/universal';

type readXlsxFileType = typeof _readXlsxFile;

interface Result {
  excel?: ParseDataResult<Record<string, unknown>> | Row[];
  files?: File | ArrayBuffer;
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
