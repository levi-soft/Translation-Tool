# Game Text Translator

[![VSCode Extension](https://img.shields.io/badge/VSCode-Extension-blue)](https://marketplace.visualstudio.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A VSCode extension for translating game text files with AI support. Supports multiple file formats (.txt, .json, .csv, .tsv) and various translation providers including OpenRouter, OpenAI, and free alternatives.

## Features

- **Multiple Translation Providers**: Google Translate (free), LibreTranslate, OpenRouter, OpenAI, Google Cloud Translation
- **File Format Support**: .txt, .json, .csv, .tsv
- **Smart Translation**: Apply custom vocabulary before translation
- **Batch Processing**: Translate entire files with progress tracking
- **System Prompts**: Customize AI behavior for game-specific translations
- **Preview Mode**: Review translations before applying

## Installation

### Option 1: From VSCode Marketplace (Recommended)
Search for "Game Text Translator" in VSCode Extensions and install.

### Option 2: From GitHub Releases
1. Go to [Releases](https://github.com/your-username/game-text-translator/releases)
2. Download the latest `.vsix` file
3. In VSCode: Extensions → Install from VSIX...
4. Select the downloaded file

### Option 3: Build from Source
```bash
git clone https://github.com/your-username/game-text-translator.git
cd game-text-translator
npm install
npm run compile
code --install-extension game-text-translator-0.0.1.vsix
```

## Configuration

Open VSCode Settings and search for "Game Text Translator":

- **Translation Provider**: Choose your preferred translation service
- **Source Language**: Language code of source text (e.g., en, ja, zh)
- **Target Language**: Language code for translation (e.g., vi, en, zh)
- **System Prompt**: Custom prompt for AI translations
- **Vocabulary**: JSON object with custom term mappings

### API Keys

For premium providers, configure API keys in settings:

- **OpenRouter API Key**: Get from [openrouter.ai](https://openrouter.ai)
- **OpenAI API Key**: Get from [platform.openai.com](https://platform.openai.com)
- **Google Cloud API Key**: Get from [Google Cloud Console](https://console.cloud.google.com)

## Usage

### Translate Selection
1. Select text in editor
2. Right-click → "Translate Selection" or Ctrl+Shift+P → "Translate Selection"
3. Review translation in popup
4. Click "Apply" to replace

### Translate File
1. Open a supported file (.txt, .json, .csv, .tsv)
2. Ctrl+Shift+P → "Translate File"
3. Wait for batch processing to complete

## Supported File Formats

### .txt
Plain text files are translated as-is.

### .json
- Objects: Translates string values, preserves keys
- Arrays: Translates string elements
- Nested objects: Flattened and reconstructed

### .csv / .tsv
- Translates cell values
- Preserves headers and structure

## Development

### Prerequisites
- Node.js 16+
- Git

### Setup
```bash
git clone https://github.com/your-username/game-text-translator.git
cd game-text-translator
npm install
npm run compile
```

### Development Workflow
```bash
npm run watch    # Watch for changes and compile
```
Press F5 in VSCode to launch extension development host.

### Building for Production
```bash
npm run compile
npx vsce package  # Creates .vsix file
```

### Publishing to VSCode Marketplace

#### Prerequisites
1. Create a [Microsoft Developer Account](https://developer.microsoft.com/)
2. Install VSCE: `npm install -g vsce`
3. Create a Personal Access Token (PAT) for Azure DevOps

#### Steps
1. **Package the extension:**
   ```bash
   npm run compile
   vsce package
   ```
   This creates a `.vsix` file

2. **Login to marketplace:**
   ```bash
   vsce login <publisher-name>
   ```
   Enter your Personal Access Token when prompted

3. **Publish:**
   ```bash
   vsce publish
   ```

#### Alternative: Manual Upload
- Go to [VSCode Marketplace Publisher Portal](https://marketplace.visualstudio.com/manage)
- Upload the `.vsix` file directly

#### Publisher Configuration
Update `package.json` with your publisher info:
```json
{
  "publisher": "your-publisher-name",
  "name": "game-text-translator",
  "displayName": "Game Text Translator"
}
```

## GitHub Setup

### 1. Create Repository
1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it `game-text-translator` or similar
3. Don't initialize with README (we already have one)

### 2. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Game Text Translator VSCode extension"
git branch -M main
git remote add origin https://github.com/your-username/game-text-translator.git
git push -u origin main
```

### 3. Repository Structure
```
game-text-translator/
├── src/
│   ├── extension.ts           # Main extension file
│   ├── services/
│   │   └── TranslationService.ts
│   └── parsers/
│       └── FileParser.ts
├── .vscode/
│   ├── launch.json
│   └── tasks.json
├── out/                      # Compiled JS (generated)
├── node_modules/             # Dependencies (generated)
├── package.json
├── tsconfig.json
├── README.md
├── .gitignore
├── .vscodeignore
└── game-text-sample.json     # Sample file
```

## Troubleshooting

### Common Installation/Build Issues

#### PowerShell Execution Policy Error
**Error**: `running scripts is disabled on this system`
**Solution**: Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Node.js/npm Not Found
**Error**: `'npm' is not recognized`
**Solution**: Install Node.js 16+ from [nodejs.org](https://nodejs.org/)

#### TypeScript Compilation Errors
**Error**: `Could not find a declaration file for module 'papaparse'`
**Solution**: Install type definitions:
```bash
npm install --save-dev @types/papaparse
```

#### VSCE Not Found
**Error**: `'vsce' is not recognized`
**Solution**: Install VSCE globally:
```bash
npm install -g vsce
```

### Extension Installation Issues

#### Extension Won't Install
- Close all VSCode windows before installing
- Use command: `code --install-extension game-text-translator-0.0.1.vsix`
- Or manually: VSCode → Extensions → Install from VSIX

#### VSCode Version Too Old
- Requires VSCode 1.74.0 or higher
- Update VSCode to latest version

### Runtime Errors

#### Translation Fails
- Check VSCode Console: Help → Toggle Developer Tools → Console
- Verify API keys for premium providers (OpenRouter, OpenAI, Google Cloud)
- Test with free providers first (Google Translate, LibreTranslate)

#### Network/API Errors
- Ensure stable internet connection
- Check API key validity and quotas
- Google Translate: No API key needed
- Others: Configure keys in VSCode Settings

See [`BUILD.md`](BUILD.md) for comprehensive troubleshooting guide.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details