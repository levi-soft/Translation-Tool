# Publishing Game Text Translator to VSCode Marketplace

This guide walks you through publishing the Game Text Translator extension to the VSCode Marketplace.

## Prerequisites

### 1. Microsoft Developer Account
- Go to [Microsoft Developer](https://developer.microsoft.com/en-us/microsoft-365/profile/)
- Sign in with your Microsoft account
- Complete the developer profile

### 2. Azure DevOps Personal Access Token
- Go to [Azure DevOps](https://dev.azure.com/)
- Sign in with your Microsoft account
- Go to User Settings → Personal Access Tokens
- Create new token with "Marketplace" scope (publish extensions)
- **Save the token securely** - you'll need it for publishing

### 3. Install VSCE
```bash
npm install -g vsce
```

## Step-by-Step Publishing

### Step 1: Prepare the Extension

1. **Update package.json** with publisher information:
   ```json
   {
     "publisher": "your-publisher-name",
     "name": "game-text-translator",
     "displayName": "Game Text Translator",
     "description": "Translate game text files with AI support",
     "version": "0.0.1",
     "repository": {
       "type": "git",
       "url": "https://github.com/your-username/game-text-translator.git"
     }
   }
   ```

2. **Compile the extension:**
   ```bash
   npm run compile
   ```

3. **Test the extension:**
   - Press F5 in VSCode to launch Extension Development Host
   - Test all features thoroughly

### Step 2: Package the Extension

```bash
vsce package
```

This creates a file like `game-text-translator-0.0.1.vsix`

### Step 3: Login to Marketplace

```bash
vsce login your-publisher-name
```

When prompted, enter your Personal Access Token.

### Step 4: Publish

```bash
vsce publish
```

Or publish a specific version:
```bash
vsce publish -p <pat>
```

### Step 5: Verify

- Go to [VSCode Marketplace](https://marketplace.visualstudio.com/)
- Search for "Game Text Translator"
- Your extension should appear in the results

## Alternative: Manual Upload

If you prefer not to use VSCE:

1. Go to [Publisher Portal](https://marketplace.visualstudio.com/manage/publishers/)
2. Create a publisher (if not already done)
3. Click "New Extension" → "Visual Studio Code"
4. Upload your `.vsix` file
5. Fill in the extension details
6. Publish

## Post-Publish Tasks

### Update GitHub Repository
```bash
git add .
git commit -m "Prepare for marketplace release"
git tag v0.0.1
git push origin main --tags
```

### Create GitHub Release
- Go to your GitHub repository
- Click "Releases" → "Create a new release"
- Tag: v0.0.1
- Title: Game Text Translator v0.0.1
- Description: Initial release with AI-powered game text translation
- Upload the `.vsix` file as an asset

## Troubleshooting

### Common Issues

**"Publisher not found"**
- Make sure your publisher name matches exactly
- Check that you have publisher permissions

**"Invalid token"**
- Regenerate your Personal Access Token
- Ensure it has "Marketplace" scope

**"Extension already exists"**
- If updating, use `vsce publish --packagePath <path-to-vsix>`
- Or increment version number in package.json

### Getting Help

- [VSCode Extension Publishing Docs](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [VSCode Marketplace Publisher Support](https://marketplace.visualstudio.com/manage/support)

## Next Steps

- Promote your extension on social media, forums
- Encourage users to leave reviews and ratings
- Plan for future updates and bug fixes
- Consider adding more translation providers or features