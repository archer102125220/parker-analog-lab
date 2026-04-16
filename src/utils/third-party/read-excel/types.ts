import type { Row, ParseDataResult } from 'read-excel-file/universal';

export interface ReadExcelResult {
  excel?: ParseDataResult<Record<string, unknown>> | Row[];
  files?: File | ArrayBuffer | string;
}
