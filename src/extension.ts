import * as vscode from 'vscode';
import { TranslationService } from './services/TranslationService';

let translationService: TranslationService;

export function activate(context: vscode.ExtensionContext) {
  console.log('Game Text Translator extension is now active!');

  translationService = new TranslationService();

  // Register commands
  const translateSelectionCommand = vscode.commands.registerCommand('gameTextTranslator.translateSelection', async () => {
    await translateSelection();
  });

  context.subscriptions.push(translateSelectionCommand);
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
