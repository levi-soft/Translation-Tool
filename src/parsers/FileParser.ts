import { ParsedContent } from '../services/TranslationService';

export class FileParser {
  parse(content: string, extension: string): ParsedContent {
    switch (extension.toLowerCase()) {
      case 'txt':
        return this.parseTxt(content);
      case 'json':
        return this.isLocalizationJson(content) ? this.parseLocalizationJson(content) : this.parseJson(content);
      case 'csv':
        return this.isLocalizationCsv(content) ? this.parseLocalizationCsv(content) : this.parseCsv(content);
      case 'tsv':
        return this.isLocalizationTsv(content) ? this.parseLocalizationTsv(content) : this.parseTsv(content);
      default:
        throw new Error(`Unsupported file extension: ${extension}`);
    }
  }

  isLocalizationFormat(content: string, extension: string): boolean {
    switch (extension.toLowerCase()) {
      case 'csv':
        return this.isLocalizationCsv(content);
      case 'tsv':
        return this.isLocalizationTsv(content);
      case 'json':
        return this.isLocalizationJson(content);
      default:
        return false;
    }
  }

  private isLocalizationCsv(content: string): boolean {
    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length < 2) return false;

    const headers = this.parseCsvLine(lines[0]);
    // Check if headers contain localization-related terms
    const headerText = headers.join(' ').toLowerCase();
    return (headers.length === 2 || headers.length === 3) &&
           (headerText.includes('text') || headerText.includes('source') ||
            headerText.includes('original') || headerText.includes('translation') ||
            headerText.includes('translated') || headerText.includes('target'));
  }

  private isLocalizationTsv(content: string): boolean {
    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length < 2) return false;

    const headers = this.parseTsvLine(lines[0]);
    // Check if headers contain localization-related terms
    const headerText = headers.join(' ').toLowerCase();
    return (headers.length === 2 || headers.length === 3) &&
           (headerText.includes('text') || headerText.includes('source') ||
            headerText.includes('original') || headerText.includes('translation') ||
            headerText.includes('translated') || headerText.includes('target'));
  }

  private isLocalizationJson(content: string): boolean {
    try {
      const parsed = JSON.parse(content);
      // Check if it's a localization object with string keys and string values
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        const keys = Object.keys(parsed);
        const values = Object.values(parsed);
        return keys.length > 0 &&
               keys.every(key => typeof key === 'string') &&
               values.every(value => typeof value === 'string');
      }
      return false;
    } catch {
      return false;
    }
  }

  format(parsedContent: ParsedContent, extension: string, originalContent?: string): string {
    // Check if original content was in localization format
    const isLocalization = originalContent ? this.isLocalizationFormat(originalContent, extension) : false;

    switch (extension.toLowerCase()) {
      case 'txt':
        return this.formatTxt(parsedContent);
      case 'json':
        return isLocalization ? this.formatLocalizationJson(parsedContent) : this.formatJson(parsedContent);
      case 'csv':
        return isLocalization ? this.formatLocalizationCsv(parsedContent, originalContent!) : this.formatCsv(parsedContent);
      case 'tsv':
        return isLocalization ? this.formatLocalizationTsv(parsedContent, originalContent!) : this.formatTsv(parsedContent);
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
    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      throw new Error('CSV must have at least header and one data row');
    }

    const headers = this.parseCsvLine(lines[0]);
    const result: { [key: string]: string } = {};

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCsvLine(lines[i]);
      headers.forEach((header, index) => {
        if (values[index]) {
          result[`row_${i - 1}_${header}`] = values[index];
        }
      });
    }

    return {
      type: 'keyValue',
      content: result
    };
  }

  private parseCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++; // skip next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  }

  private parseLocalizationCsv(content: string): ParsedContent {
    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      throw new Error('Localization CSV must have at least header and one data row');
    }

    const headers = this.parseCsvLine(lines[0]);
    if (headers.length < 2) {
      throw new Error('Localization CSV must have at least 2 columns');
    }

    const result: { [key: string]: string } = {};

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCsvLine(lines[i]);
      if (values.length >= 2 && values[0].trim()) {
        // Use first column as key, second column as existing translation
        const key = values[0].trim();
        result[key] = values[1] || ''; // Empty if no translation yet
      }
    }

    return {
      type: 'keyValue',
      content: result
    };
  }

  private parseLocalizationTsv(content: string): ParsedContent {
    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      throw new Error('Localization TSV must have at least header and one data row');
    }

    const headers = this.parseTsvLine(lines[0]);
    if (headers.length < 2) {
      throw new Error('Localization TSV must have at least 2 columns');
    }

    const result: { [key: string]: string } = {};

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseTsvLine(lines[i]);
      if (values.length >= 2 && values[0].trim()) {
        const key = values[0].trim();
        result[key] = values[1] || '';
      }
    }

    return {
      type: 'keyValue',
      content: result
    };
  }

  private parseLocalizationJson(content: string): ParsedContent {
    try {
      const parsed = JSON.parse(content);
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        return {
          type: 'keyValue',
          content: parsed as { [key: string]: string }
        };
      }
      throw new Error('Invalid localization JSON format');
    } catch (error) {
      throw new Error(`Failed to parse localization JSON: ${error}`);
    }
  }

  private parseTsv(content: string): ParsedContent {
    // TSV is similar to CSV but with tab delimiter
    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      throw new Error('TSV must have at least header and one data row');
    }

    const headers = this.parseTsvLine(lines[0]);
    const result: { [key: string]: string } = {};

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseTsvLine(lines[i]);
      headers.forEach((header, index) => {
        if (values[index]) {
          result[`row_${i - 1}_${header}`] = values[index];
        }
      });
    }

    return {
      type: 'keyValue',
      content: result
    };
  }

  private parseTsvLine(line: string): string[] {
    return line.split('\t');
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
    const rowMap: { [rowIndex: string]: any } = {};

    // Group by row index
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

    // Convert to CSV string
    const rows = Object.values(rowMap) as any[];
    if (rows.length === 0) return '';

    const headers = Object.keys(rows[0]);
    const csvLines = [headers.join(',')];

    rows.forEach(row => {
      const values = headers.map(header => {
        const value = row[header] || '';
        // Simple CSV escaping
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      csvLines.push(values.join(','));
    });

    return csvLines.join('\n');
  }

  private formatTsv(parsedContent: ParsedContent): string {
    if (parsedContent.type !== 'keyValue') {
      throw new Error('TSV format requires key-value content');
    }

    const obj = parsedContent.content as { [key: string]: string };
    const rowMap: { [rowIndex: string]: any } = {};

    // Group by row index
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

    // Convert to TSV string
    const rows = Object.values(rowMap) as any[];
    if (rows.length === 0) return '';

    const headers = Object.keys(rows[0]);
    const tsvLines = [headers.join('\t')];

    rows.forEach(row => {
      const values = headers.map(header => row[header] || '');
      tsvLines.push(values.join('\t'));
    });

    return tsvLines.join('\n');
  }

  private formatLocalizationJson(parsedContent: ParsedContent): string {
    if (parsedContent.type !== 'keyValue') {
      throw new Error('Localization JSON format requires key-value content');
    }

    // For localization JSON, just return the translated key-value pairs
    return JSON.stringify(parsedContent.content, null, 2);
  }

  private formatLocalizationCsv(parsedContent: ParsedContent, originalContent: string): string {
    if (parsedContent.type !== 'keyValue') {
      throw new Error('Localization CSV format requires key-value content');
    }

    const translatedObj = parsedContent.content as { [key: string]: string };

    // Parse original to get headers
    const lines = originalContent.split('\n').filter(line => line.trim());
    if (lines.length === 0) {
      throw new Error('Cannot determine CSV headers from original content');
    }

    const headers = this.parseCsvLine(lines[0]);
    const csvLines = [headers.join(',')]; // Keep original headers

    // Add translated data
    Object.keys(translatedObj).forEach(key => {
      const translation = translatedObj[key];
      const values = [key, translation];
      // CSV escape
      const escapedValues = values.map(value => {
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      csvLines.push(escapedValues.join(','));
    });

    return csvLines.join('\n');
  }

  private formatLocalizationTsv(parsedContent: ParsedContent, originalContent: string): string {
    if (parsedContent.type !== 'keyValue') {
      throw new Error('Localization TSV format requires key-value content');
    }

    const translatedObj = parsedContent.content as { [key: string]: string };

    // Parse original to get headers
    const lines = originalContent.split('\n').filter(line => line.trim());
    if (lines.length === 0) {
      throw new Error('Cannot determine TSV headers from original content');
    }

    const headers = this.parseTsvLine(lines[0]);
    const tsvLines = [headers.join('\t')]; // Keep original headers

    // Add translated data
    Object.keys(translatedObj).forEach(key => {
      const translation = translatedObj[key];
      const values = [key, translation];
      tsvLines.push(values.join('\t'));
    });

    return tsvLines.join('\n');
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