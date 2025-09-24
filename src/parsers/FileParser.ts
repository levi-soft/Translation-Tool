import * as Papa from 'papaparse';
import { ParsedContent } from '../services/TranslationService';

export class FileParser {
  parse(content: string, extension: string): ParsedContent {
    switch (extension.toLowerCase()) {
      case 'txt':
        return this.parseTxt(content);
      case 'json':
        return this.parseJson(content);
      case 'csv':
        return this.parseCsv(content);
      case 'tsv':
        return this.parseTsv(content);
      default:
        throw new Error(`Unsupported file extension: ${extension}`);
    }
  }

  format(parsedContent: ParsedContent, extension: string): string {
    switch (extension.toLowerCase()) {
      case 'txt':
        return this.formatTxt(parsedContent);
      case 'json':
        return this.formatJson(parsedContent);
      case 'csv':
        return this.formatCsv(parsedContent);
      case 'tsv':
        return this.formatTsv(parsedContent);
      default:
        throw new Error(`Unsupported file extension: ${extension}`);
    }
  }

  private parseTxt(content: string): ParsedContent {
    // For .txt files, treat as plain text
    return {
      type: 'text',
      content: content
    };
  }

  private parseJson(content: string): ParsedContent {
    try {
      const parsed = JSON.parse(content);

      // If it's an object, treat as key-value pairs
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        return {
          type: 'keyValue',
          content: this.flattenObject(parsed)
        };
      }

      // If it's an array of strings, treat as array
      if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
        return {
          type: 'array',
          content: parsed
        };
      }

      // Otherwise, treat as text
      return {
        type: 'text',
        content: content
      };
    } catch (error) {
      // If JSON parsing fails, treat as text
      return {
        type: 'text',
        content: content
      };
    }
  }

  private parseCsv(content: string): ParsedContent {
    const parsed = Papa.parse(content, {
      header: true,
      skipEmptyLines: true
    });

    if (parsed.errors.length > 0) {
      throw new Error(`CSV parsing error: ${parsed.errors[0].message}`);
    }

    // Convert to key-value format where each row becomes an object
    const result: { [key: string]: string } = {};
    parsed.data.forEach((row: any, index: number) => {
      Object.keys(row).forEach(key => {
        if (row[key]) {
          result[`row_${index}_${key}`] = row[key];
        }
      });
    });

    return {
      type: 'keyValue',
      content: result
    };
  }

  private parseTsv(content: string): ParsedContent {
    // TSV is similar to CSV but with tab delimiter
    const parsed = Papa.parse(content, {
      header: true,
      delimiter: '\t',
      skipEmptyLines: true
    });

    if (parsed.errors.length > 0) {
      throw new Error(`TSV parsing error: ${parsed.errors[0].message}`);
    }

    const result: { [key: string]: string } = {};
    parsed.data.forEach((row: any, index: number) => {
      Object.keys(row).forEach(key => {
        if (row[key]) {
          result[`row_${index}_${key}`] = row[key];
        }
      });
    });

    return {
      type: 'keyValue',
      content: result
    };
  }

  private formatTxt(parsedContent: ParsedContent): string {
    if (parsedContent.type === 'text') {
      return parsedContent.content as string;
    }
    return JSON.stringify(parsedContent.content, null, 2);
  }

  private formatJson(parsedContent: ParsedContent): string {
    if (parsedContent.type === 'keyValue') {
      const obj = parsedContent.content as { [key: string]: string };
      const unflattened = this.unflattenObject(obj);
      return JSON.stringify(unflattened, null, 2);
    }

    if (parsedContent.type === 'array') {
      return JSON.stringify(parsedContent.content, null, 2);
    }

    return parsedContent.content as string;
  }

  private formatCsv(parsedContent: ParsedContent): string {
    if (parsedContent.type !== 'keyValue') {
      throw new Error('CSV format requires key-value content');
    }

    const obj = parsedContent.content as { [key: string]: string };
    const rows: any[] = [];

    // Group by row index
    const rowMap: { [rowIndex: string]: any } = {};
    Object.keys(obj).forEach(key => {
      const parts = key.split('_');
      if (parts.length >= 3) {
        const rowIndex = parts[1];
        const columnName = parts.slice(2).join('_');

        if (!rowMap[rowIndex]) {
          rowMap[rowIndex] = {};
        }
        rowMap[rowIndex][columnName] = obj[key];
      }
    });

    // Convert to array
    Object.values(rowMap).forEach(row => rows.push(row));

    return Papa.unparse(rows);
  }

  private formatTsv(parsedContent: ParsedContent): string {
    if (parsedContent.type !== 'keyValue') {
      throw new Error('TSV format requires key-value content');
    }

    const obj = parsedContent.content as { [key: string]: string };
    const rows: any[] = [];

    const rowMap: { [rowIndex: string]: any } = {};
    Object.keys(obj).forEach(key => {
      const parts = key.split('_');
      if (parts.length >= 3) {
        const rowIndex = parts[1];
        const columnName = parts.slice(2).join('_');

        if (!rowMap[rowIndex]) {
          rowMap[rowIndex] = {};
        }
        rowMap[rowIndex][columnName] = obj[key];
      }
    });

    Object.values(rowMap).forEach(row => rows.push(row));

    return Papa.unparse(rows, { delimiter: '\t' });
  }

  private flattenObject(obj: any, prefix: string = ''): { [key: string]: string } {
    const result: { [key: string]: string } = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          Object.assign(result, this.flattenObject(obj[key], newKey));
        } else if (typeof obj[key] === 'string') {
          result[newKey] = obj[key];
        }
        // Skip non-string values
      }
    }

    return result;
  }

  private unflattenObject(flatObj: { [key: string]: string }): any {
    const result: any = {};

    for (const key in flatObj) {
      if (flatObj.hasOwnProperty(key)) {
        const keys = key.split('.');
        let current = result;

        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }

        current[keys[keys.length - 1]] = flatObj[key];
      }
    }

    return result;
  }
}