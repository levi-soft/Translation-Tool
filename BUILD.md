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

#### Node.js/npm Issues
**Error**: `'npm' is not recognized`
- **Solution**: Install Node.js from [nodejs.org](https://nodejs.org/) (version 16+)

**Error**: `File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled`
- **Solution**: Run PowerShell as Administrator and execute:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```
- Alternative: Use Command Prompt instead of PowerShell

#### TypeScript Compilation Errors
**Error**: `Could not find a declaration file for module 'papaparse'`
- **Solution**: Install type definitions:
  ```bash
  npm install --save-dev @types/papaparse
  ```

**Error**: `Cannot find module 'vscode'`
- **Solution**: Install VSCode types:
  ```bash
  npm install
  ```
- Ensure you're in the project directory

#### VSCE (Packaging) Errors
**Error**: `'vsce' is not recognized`
- **Solution**: Install VSCE globally:
  ```bash
  npm install -g vsce
  ```
- Or use npx: `npx vsce package`

### Installation Issues

#### Extension Installation Fails
- Close all VSCode windows before installing
- Use the command: `code --install-extension game-text-translator-0.0.1.vsix`
- Or manually: VSCode → Extensions → Install from VSIX → Select file

#### VSCode Version Issues
- Requires VSCode 1.74.0 or higher
- Update VSCode if you have an older version

### Runtime Errors

#### Translation Fails
- Check VSCode developer console: Help → Toggle Developer Tools → Console
- Verify API keys are configured for premium providers (OpenRouter, OpenAI, Google Cloud)
- Test with free providers first (Google Translate, LibreTranslate)

#### Network/API Errors
- Ensure internet connection is stable
- Check API key validity and quotas
- For Google Translate: No API key needed
- For others: Configure keys in VSCode Settings

### Development Issues

#### Extension Doesn't Load in Debug
- Press F5 in VSCode to launch Extension Development Host
- Check if compilation succeeded (no TypeScript errors)
- Verify package.json activation events

#### Hot Reload Not Working
- Save files to trigger recompilation
- Check if `npm run watch` is running in terminal
- Restart Extension Development Host

### Common Windows Issues

#### Path Too Long
- Move project to a shorter path (e.g., `C:\dev\` instead of `C:\Users\...\`)
- Or enable long paths in Windows

#### Permission Denied
- Run commands as Administrator
- Or use a different directory without permission restrictions

### Getting Help

If you encounter issues not covered here:
1. Check the [Issues](https://github.com/levi-soft/Translation-Tool/issues) page
2. Create a new issue with:
   - Your OS and VSCode version
   - Node.js version (`node --version`)
   - Full error message
   - Steps to reproduce