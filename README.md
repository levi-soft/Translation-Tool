# Game Text Translator

[![VSCode Extension](https://img.shields.io/badge/VSCode-Extension-blue)](https://marketplace.visualstudio.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A VSCode extension for translating game text files with AI support. Supports multiple file formats (.txt, .json, .csv, .tsv) and various translation providers including OpenRouter, OpenAI, and free alternatives.

📖 **Documentation**: [English](README.md) | [Tiếng Việt](README.vi.md)
🚀 **Quick Start**: [English](QUICKSTART.md) | [Tiếng Việt](QUICKSTART.vi.md)

## Features

- **Multiple Translation Providers**: Google Translate (free), LibreTranslate, OpenRouter, OpenAI, Google Cloud Translation
- **Smart Translation**: Apply custom vocabulary before translation
- **System Prompts**: Customize AI behavior for game-specific translations
- **Preview Mode**: Review translations before applying
- **Multi-line Support**: Translate multiple lines of selected text

## Installation

### Option 1: From VSCode Marketplace (Recommended)
Search for "Game Text Translator" in VSCode Extensions and install.

### Option 2: From GitHub Releases
1. Go to [Releases](https://github.com/levi-soft/Translation-Tool/releases)
2. Download the latest `.vsix` file
3. In VSCode: Extensions → Install from VSIX...
4. Select the downloaded file

### Option 3: Build from Source
```bash
git clone https://github.com/levi-soft/Translation-Tool.git
cd game-text-translator
npm install
npm run compile
code --install-extension game-text-translator-0.0.1.vsix
```

## Configuration

### Basic Setup

1. **Open Settings**: File → Preferences → Settings (or `Ctrl+,`)
2. **Search**: "game text translator"
3. **Configure basic options**:

### Translation Provider

Extension supports 5 AI providers with different quality and pricing:

#### **Free Providers (No API key required):**
- **googleTranslate**: Google Translate (free)
  - Pros: Fast, free
  - Cons: Basic quality
- **libreTranslate**: Open-source AI
  - Pros: Privacy-focused, free
  - Cons: Average quality

#### **Premium Providers (API key required):**
- **openRouter**: Access to multiple AI models
  - Models: Claude-3.5, GPT-4, Gemini, etc.
  - Pricing: From $0.001/1K tokens
- **openAI**: Official GPT models
  - Models: GPT-3.5, GPT-4, GPT-4o
  - Pricing: From $0.002/1K tokens
- **googleCloud**: Google Cloud Translation
  - Pros: High quality for Asian languages
  - Pricing: $20/1M characters

### Language Settings

- **Source Language**: Source language code (en, ja, zh, ko, vi, etc.)
- **Target Language**: Target language code (vi, en, zh, ja, etc.)

**Examples:**
- English → Vietnamese: `en` → `vi`
- Japanese → Vietnamese: `ja` → `vi`
- Chinese → Vietnamese: `zh` → `vi`

### API Keys Setup

#### **OpenRouter (Recommended):**
1. **Sign up**: [openrouter.ai](https://openrouter.ai)
2. **Get API key**: Dashboard → API Keys
3. **VSCode Setting**: `"Game Text Translator: OpenRouter Api Key"`
4. **Choose Model**: Select your preferred AI model in settings

**Available Models:**
- **Claude 3 Haiku** (default): Fast, cost-effective for game text
- **Claude 3 Sonnet**: Better quality for complex translations
- **Claude 3 Opus**: Highest quality, more expensive
- **GPT-4o**: Excellent quality for creative text
- **GPT-4o Mini**: Fast and affordable
- **GPT-4 Turbo**: Good balance of quality and speed
- **GPT-4.1**: Latest GPT-4.1 model with improved capabilities
- **GPT-4.1 Mini**: Compact version of GPT-4.1, faster and cheaper
- **GPT-5**: Most advanced GPT model (if available)
- **GPT-5 Mini**: Compact GPT-5 for efficiency
- **GPT-3.5 Turbo**: Reliable baseline model
- **Gemini Pro/Flash**: Google's models, good for technical text
- **Llama 3**: Open-source alternatives

#### **OpenAI:**
1. **Sign up**: [platform.openai.com](https://platform.openai.com)
2. **Get API key**: API Keys section
3. **VSCode Setting**: `"Game Text Translator: OpenAI Api Key"`

#### **Google Cloud:**
1. **Create project**: [Google Cloud Console](https://console.cloud.google.com)
2. **Enable Translation API**
3. **Create API key**: APIs & Services → Credentials
4. **VSCode Setting**: `"Game Text Translator: Google Cloud Api Key"`

### Advanced Configuration

#### **System Prompt:**
Customize AI translation behavior for game-specific content. The system prompt is now entered in a multiline text area for better readability and editing.

**Default System Prompt:**
```text
You are a professional Vietnamese game translator specializing in video game localization.

Your task is to translate game text from English to Vietnamese naturally and accurately.

Guidelines:
- Maintain the original tone and style of the game text
- Use appropriate gaming terminology and slang
- Keep cultural references intact when possible
- Ensure translations fit the character limit if specified
- Preserve any special formatting or placeholders
- Make translations sound natural to Vietnamese gamers

Translate the following text:
```

**Examples by game genre:**

**RPG Fantasy:**
```text
You are a professional Vietnamese game translator specializing in fantasy RPG games.

Guidelines:
- Maintain epic, heroic tone throughout
- Use "Anh Hùng" for Hero, "Phép Thuật" for Magic, "Rồng" for Dragon
- Keep fantasy terminology consistent
- Preserve the sense of adventure and wonder

Translate the following fantasy RPG text:
```

**Horror Game:**
```text
You are a professional Vietnamese game translator specializing in horror games.

Guidelines:
- Maintain suspense and fear in the translation
- Use tense Vietnamese that creates unease
- Keep the atmosphere of dread and tension
- Translate jump scares and horror elements effectively

Translate the following horror game text:
```

**Mobile Game:**
```text
You are a professional Vietnamese game translator specializing in casual mobile games.

Guidelines:
- Keep fun, light tone throughout
- Use simple Vietnamese suitable for all ages
- Make translations engaging and accessible
- Consider short attention spans in mobile gaming

Translate the following mobile game text:
```

#### **Vocabulary Dictionary:**
Ensure consistent translation of special terms:

```json
{
  "Hero": "Anh Hùng",
  "Mana": "Năng Lượng",
  "Quest": "Nhiệm Vụ",
  "Inventory": "Túi Đồ",
  "Level Up": "Lên Cấp",
  "Boss": "Trùm Cuối",
  "Dungeon": "Ngục Ngầm",
  "Spell": "Phép Thuật",
  "Potion": "Thuốc Phục Hồi",
  "Guild": "Bang Hội",
  "Critical Hit": "Đòn Chí Mạng",
  "Experience": "Kinh Nghiệm"
}
```

**Tips:**
- Add character names, location names
- Use same term for same concept
- Update dictionary when encountering new terms

## Usage

### Quick Start

#### **Translate Text Selection:**
1. **Open any text file**
2. **Select text** to translate (can select multiple lines)
3. **Right-click** → **"Translate Selection"**
4. **View preview** and **Apply**

*Default provider: Google Translate (free)*

### Advanced Usage

#### **Switch AI Provider:**
1. **Settings** → Search "translation provider"
2. **Select desired provider**
3. **Enter API key** if needed (for premium providers)
4. **Test translation** to compare quality

#### **Customize for Specific Game:**
1. **Settings** → "system prompt"
2. **Write prompt** suitable for game genre
3. **Settings** → "vocabulary"
4. **Add dictionary** for game terms


### Workflow Examples

#### **🎮 RPG Game Translation:**
1. **Setup provider**: OpenRouter (for high quality)
2. **System prompt**:
   ```
   Translate RPG game text. Maintain epic fantasy tone.
   Use "Anh Hùng" for Hero, "Phép Thuật" for Magic.
   ```
3. **Vocabulary**:
   ```json
   {
     "Mana": "Năng Lượng",
     "Quest": "Nhiệm Vụ",
     "Level": "Cấp Độ"
   }
   ```
4. **Translate text selections** from game scripts and dialogue

#### **📱 Mobile Game Translation:**
1. **Setup provider**: Google Translate (free, fast)
2. **System prompt**:
   ```
   Translate casual mobile game. Keep fun, simple tone.
   Use easy Vietnamese for all ages.
   ```
3. **Translate text selections** from UI strings and messages

#### **👻 Horror Game Translation:**
1. **Setup provider**: OpenRouter with Claude
2. **System prompt**:
   ```
   Translate horror game text. Maintain suspense and fear.
   Use tense Vietnamese that creates unease.
   ```
3. **Vocabulary**: Horror-specific terms
4. **Translate text selections** from scary dialogue and descriptions

### Troubleshooting Usage

#### **Translation not working:**
- Check Developer Console for errors
- Verify API keys for premium providers
- Test with Google Translate first

#### **JSON translation incorrect:**
- Ensure valid JSON format
- Check nested objects are processed
- Review translated JSON validity

#### **CSV/TSV errors:**
- Ensure header row exists
- Check delimiter (comma for CSV, tab for TSV)
- Verify UTF-8 encoding

## Development

### Prerequisites
- Node.js 16+
- Git

### Setup
```bash
git clone https://github.com/levi-soft/Translation-Tool.git
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
2. Name it `Translation-Tool` or similar
3. Don't initialize with README (we already have one)

### 2. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Game Text Translator VSCode extension"
git branch -M main
git remote add origin https://github.com/levi-soft/Translation-Tool.git
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