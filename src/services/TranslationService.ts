import * as vscode from 'vscode';
import axios from 'axios';

export interface ParsedContent {
  type: 'text' | 'keyValue' | 'array';
  content: string | { [key: string]: string } | string[];
}

export class TranslationService {
  private config = vscode.workspace.getConfiguration('gameTextTranslator');

  async translateText(text: string): Promise<string> {
    const provider = this.config.get<string>('translationProvider', 'googleTranslate');
    const sourceLang = this.config.get<string>('sourceLanguage', 'en');
    const targetLang = this.config.get<string>('targetLanguage', 'vi');
    const systemPrompt = this.config.get<string>('systemPrompt', '');
    const vocabulary = this.config.get<{ [key: string]: string }>('vocabulary', {});

    // Apply vocabulary first
    let processedText = this.applyVocabulary(text, vocabulary);

    // Translate using selected provider
    let translatedText: string;
    switch (provider) {
      case 'googleTranslate':
        translatedText = await this.translateWithGoogle(processedText, sourceLang, targetLang);
        break;
      case 'libreTranslate':
        translatedText = await this.translateWithLibre(processedText, sourceLang, targetLang);
        break;
      case 'openRouter':
        translatedText = await this.translateWithOpenRouter(processedText, sourceLang, targetLang, systemPrompt);
        break;
      case 'openAI':
        translatedText = await this.translateWithOpenAI(processedText, sourceLang, targetLang, systemPrompt);
        break;
      case 'googleCloud':
        translatedText = await this.translateWithGoogleCloud(processedText, sourceLang, targetLang);
        break;
      default:
        throw new Error(`Unsupported translation provider: ${provider}`);
    }

    return translatedText;
  }

  async translateParsedContent(
    parsedContent: ParsedContent,
    progressCallback?: (current: number, total: number) => void,
    cancellationToken?: vscode.CancellationToken
  ): Promise<ParsedContent> {
    if (parsedContent.type === 'text') {
      const translated = await this.translateText(parsedContent.content as string);
      return { ...parsedContent, content: translated };
    }

    if (parsedContent.type === 'keyValue') {
      const obj = parsedContent.content as { [key: string]: string };
      const keys = Object.keys(obj);
      const translatedObj: { [key: string]: string } = {};

      for (let i = 0; i < keys.length; i++) {
        if (cancellationToken?.isCancellationRequested) {
          throw new Error('Translation cancelled');
        }

        const key = keys[i];
        const value = obj[key];

        // Only translate string values, keep keys as-is
        if (typeof value === 'string') {
          translatedObj[key] = await this.translateText(value);
        } else {
          translatedObj[key] = value;
        }

        progressCallback?.(i + 1, keys.length);
      }

      return { ...parsedContent, content: translatedObj };
    }

    if (parsedContent.type === 'array') {
      const arr = parsedContent.content as string[];
      const translatedArr: string[] = [];

      for (let i = 0; i < arr.length; i++) {
        if (cancellationToken?.isCancellationRequested) {
          throw new Error('Translation cancelled');
        }

        translatedArr.push(await this.translateText(arr[i]));
        progressCallback?.(i + 1, arr.length);
      }

      return { ...parsedContent, content: translatedArr };
    }

    return parsedContent;
  }

  private applyVocabulary(text: string, vocabulary: { [key: string]: string }): string {
    let result = text;
    for (const [original, translation] of Object.entries(vocabulary)) {
      // Use word boundaries to avoid partial matches
      const regex = new RegExp(`\\b${this.escapeRegExp(original)}\\b`, 'gi');
      result = result.replace(regex, translation);
    }
    return result;
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private async translateWithGoogle(text: string, from: string, to: string): Promise<string> {
    try {
      const response = await axios.get('https://translate.googleapis.com/translate_a/single', {
        params: {
          client: 'gtx',
          sl: from,
          tl: to,
          dt: 't',
          q: text
        }
      });

      if (response.data && response.data[0]) {
        return response.data[0].map((item: any[]) => item[0]).join('');
      }
      throw new Error('Invalid response from Google Translate');
    } catch (error) {
      throw new Error(`Google Translate failed: ${error}`);
    }
  }

  private async translateWithLibre(text: string, from: string, to: string): Promise<string> {
    // LibreTranslate typically runs on localhost:5000 or a public instance
    const libreUrl = 'https://libretranslate.com/translate'; // Public instance

    try {
      const response = await axios.post(libreUrl, {
        q: text,
        source: from,
        target: to
      });

      if (response.data && response.data.translatedText) {
        return response.data.translatedText;
      }
      throw new Error('Invalid response from LibreTranslate');
    } catch (error) {
      throw new Error(`LibreTranslate failed: ${error}`);
    }
  }

  private async translateWithOpenRouter(text: string, from: string, to: string, systemPrompt: string): Promise<string> {
    const apiKey = this.config.get<string>('openRouterApiKey');
    if (!apiKey) {
      throw new Error('OpenRouter API key not configured');
    }

    try {
      const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'system',
            content: systemPrompt || 'You are a professional translator. Translate the following text accurately.'
          },
          {
            role: 'user',
            content: `Translate from ${from} to ${to}: ${text}`
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.choices && response.data.choices[0]) {
        return response.data.choices[0].message.content.trim();
      }
      throw new Error('Invalid response from OpenRouter');
    } catch (error) {
      throw new Error(`OpenRouter translation failed: ${error}`);
    }
  }

  private async translateWithOpenAI(text: string, from: string, to: string, systemPrompt: string): Promise<string> {
    const apiKey = this.config.get<string>('openAIApiKey');
    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt || 'You are a professional translator. Translate the following text accurately.'
          },
          {
            role: 'user',
            content: `Translate from ${from} to ${to}: ${text}`
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.choices && response.data.choices[0]) {
        return response.data.choices[0].message.content.trim();
      }
      throw new Error('Invalid response from OpenAI');
    } catch (error) {
      throw new Error(`OpenAI translation failed: ${error}`);
    }
  }

  private async translateWithGoogleCloud(text: string, from: string, to: string): Promise<string> {
    const apiKey = this.config.get<string>('googleCloudApiKey');
    if (!apiKey) {
      throw new Error('Google Cloud API key not configured');
    }

    try {
      const response = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
        q: text,
        source: from,
        target: to
      });

      if (response.data && response.data.data && response.data.data.translations) {
        return response.data.data.translations[0].translatedText;
      }
      throw new Error('Invalid response from Google Cloud Translation');
    } catch (error) {
      throw new Error(`Google Cloud Translation failed: ${error}`);
    }
  }
}