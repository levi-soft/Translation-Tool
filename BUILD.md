# Building and Sharing Game Text Translator

Since you don't have a Microsoft Developer account yet, you can still build and share the extension locally.

## Prerequisites

Install Node.js 16+ from [nodejs.org](https://nodejs.org/)

## Build Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Compile TypeScript
```bash
npm run compile
```

### 3. Package Extension
```bash
npm run package
```
This creates `game-text-translator-0.0.1.vsix`

### 4. Test Locally
```bash
code --install-extension game-text-translator-0.0.1.vsix
```

## Sharing the Extension

### Option 1: Share .vsix File
- Send the `.vsix` file to others
- They can install it via VSCode: Extensions → Install from VSIX

### Option 2: GitHub Release
1. Create GitHub repository
2. Push code as shown in README
3. Create a release and upload the `.vsix` file
4. Others can download from releases

### Option 3: Direct Installation
Share this command for others to build themselves:
```bash
git clone https://github.com/your-username/game-text-translator.git
cd game-text-translator
npm install && npm run compile && npm run package
code --install-extension game-text-translator-0.0.1.vsix
```

## Development Workflow

### Watch Mode
```bash
npm run watch
```
Automatically recompiles on file changes.

### Debug Extension
- Press F5 in VSCode to launch Extension Development Host
- Test features in the new window
- Changes are hot-reloaded

## File Structure After Build

```
game-text-translator/
├── out/                    # Compiled JavaScript
│   ├── extension.js
│   ├── services/
│   └── parsers/
├── game-text-translator-0.0.1.vsix  # Installable package
├── node_modules/           # Dependencies
└── ...                     # Source files
```

## Troubleshooting

### Build Errors
- Ensure Node.js 16+ is installed
- Run `npm install` to get dependencies
- Check TypeScript errors in VSCode

### Installation Issues
- Close all VSCode windows before installing
- Use `code --install-extension` command
- Check VSCode version (requires 1.74.0+)

### Runtime Errors
- Check VSCode developer console (Help → Toggle Developer Tools)
- Verify API keys are configured for premium providers
- Test with free providers first (Google Translate)