# 🚀 Game Text Translator - Quick Start Guide

## 1. Install Extension

### From GitHub Releases (Recommended):
1. Go to [Releases](https://github.com/levi-soft/Translation-Tool/releases)
2. Download the latest `.vsix` file
3. VSCode: Extensions → Install from VSIX → Select file

### From VSCode Marketplace (Coming Soon):
1. Extensions → Search "Game Text Translator"
2. Install

## 2. Basic Test (Free)

### Quick Text Translation:
1. **Create file** `test.txt`:
   ```
   Hello world!
   Welcome to the game.
   ```

2. **Select text** "Hello world!"
3. **Right-click** → **"Translate Selection"**
4. **View popup** → **Apply**

*✅ Uses free Google Translate*

## 3. Upgrade Quality (Premium AI)

### Step 1: Choose AI Provider
```
Settings → "game text translator" → "Translation Provider"
```
- **openRouter**: Recommended (many models, cheap)
- **openAI**: Official GPT
- **googleCloud**: High quality

### Step 2: Enter API Key

#### OpenRouter (Easiest):
1. [Sign up at openrouter.ai](https://openrouter.ai)
2. Copy API key
3. VSCode Settings: `"Game Text Translator: OpenRouter Api Key"`

#### OpenAI:
1. [platform.openai.com](https://platform.openai.com)
2. API Keys → Create new
3. VSCode: `"Game Text Translator: OpenAI Api Key"`

### Step 3: Test AI
1. Select longer text
2. Translate and compare quality

## 4. Customize for Game

### System Prompt (Translation Style):
```
Settings → "Game Text Translator: System Prompt"

Example for RPG:
"You are a Vietnamese game translator. Translate RPG dialogue naturally while maintaining epic fantasy tone. Use appropriate gaming terminology."
```

### Vocabulary Dictionary:
```
Settings → "Game Text Translator: Vocabulary"

{
  "Hero": "Anh Hùng",
  "Mana": "Năng Lượng",
  "Quest": "Nhiệm Vụ",
  "Boss": "Trùm Cuối"
}
```

## 5. Translate Different File Types

### 📄 Text File (.txt):
- Select text → Translate Selection
- Or open file → Translate File

### 📋 JSON File (.json):
```json
{
  "dialogue": "Hello adventurer!",
  "items": ["Sword", "Shield"]
}
```
→ Translates only values, preserves keys

### 📊 CSV/TSV Files:
```
Name,Description
Sword,A sharp blade
Shield,Protects you
```
→ Translates cells, preserves headers

## 6. Common Workflows

### 🎮 Game Developer Workflow:
1. **Setup**: OpenRouter + custom prompt for game genre
2. **Vocabulary**: Add specific game terms
3. **Batch**: Translate entire game text folder
4. **Review**: Check translations
5. **Export**: Use in game

### 📱 Mobile Game Workflow:
1. **Setup**: Google Translate (fast, free)
2. **Files**: strings.json, ui.csv
3. **Quick**: Translate individual small files

## 7. Troubleshooting

### Extension not working:
- Restart VSCode
- Check Developer Console (Help → Toggle Developer Tools)

### API key not working:
- Verify key not expired
- Check quota/limits
- Test with free provider

### File not translatable:
- Check file encoding (UTF-8)
- Verify JSON/CSV format is correct
- Try smaller file first

## 🎯 Summary

**Start**: Google Translate (free)
**Advanced**: OpenRouter + custom settings
**Pro**: Dictionary + system prompts

**Extension ready to use!** 🎉