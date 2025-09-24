import * as vscode from 'vscode';
import { TranslationService } from './services/TranslationService';
import { FileParser } from './parsers/FileParser';

let translationService: TranslationService;

export function activate(context: vscode.ExtensionContext) {
  console.log('Game Text Translator extension is now active!');

  translationService = new TranslationService();

  // Register commands
  const translateSelectionCommand = vscode.commands.registerCommand('gameTextTranslator.translateSelection', async () => {
    await translateSelection();
  });

  const translateFileCommand = vscode.commands.registerCommand('gameTextTranslator.translateFile', async () => {
    await translateFile();
  });

  context.subscriptions.push(translateSelectionCommand, translateFileCommand);
}

export function deactivate() {}

async function translateSelection() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('No active editor found.');
    return;
  }

  const selection = editor.selection;
  if (selection.isEmpty) {
    vscode.window.showErrorMessage('No text selected.');
    return;
  }

  const selectedText = editor.document.getText(selection);
  if (!selectedText.trim()) {
    vscode.window.showErrorMessage('Selected text is empty.');
    return;
  }

  try {
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Translating...',
      cancellable: false
    }, async (progress) => {
      progress.report({ increment: 0, message: 'Translating selection...' });

      const translatedText = await translationService.translateText(selectedText);

      progress.report({ increment: 100, message: 'Translation complete!' });

      // Show preview dialog
      const result = await vscode.window.showInformationMessage(
        `Original: ${selectedText}\nTranslated: ${translatedText}`,
        'Apply', 'Cancel'
      );

      if (result === 'Apply') {
        editor.edit(editBuilder => {
          editBuilder.replace(selection, translatedText);
        });
      }
    });
  } catch (error) {
    vscode.window.showErrorMessage(`Translation failed: ${error}`);
  }
}

async function translateFile() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('No active editor found.');
    return;
  }

  const document = editor.document;
  const fileExtension = document.fileName.split('.').pop()?.toLowerCase();

  if (!['txt', 'json', 'csv', 'tsv'].includes(fileExtension || '')) {
    vscode.window.showErrorMessage('Unsupported file type. Supported: .txt, .json, .csv, .tsv');
    return;
  }

  try {
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Translating file...',
      cancellable: true
    }, async (progress, token) => {
      const fileParser = new FileParser();
      const content = document.getText();

      progress.report({ increment: 10, message: 'Parsing file...' });

      const parsedContent = fileParser.parse(content, fileExtension!);

      progress.report({ increment: 30, message: 'Translating content...' });

      const translatedContent = await translationService.translateParsedContent(parsedContent, (current, total) => {
        progress.report({ increment: 30 + (current / total) * 60, message: `Translating ${current}/${total}...` });
      }, token);

      if (token.isCancellationRequested) {
        return;
      }

      progress.report({ increment: 90, message: 'Formatting output...' });

      const outputContent = fileParser.format(translatedContent, fileExtension!, content);

      progress.report({ increment: 100, message: 'Translation complete!' });

      // Replace entire document content
      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(document.getText().length)
      );

      editor.edit(editBuilder => {
        editBuilder.replace(fullRange, outputContent);
      });
    });
  } catch (error) {
    vscode.window.showErrorMessage(`File translation failed: ${error}`);
  }
}