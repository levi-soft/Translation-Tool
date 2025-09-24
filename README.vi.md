# Game Text Translator

[![VSCode Extension](https://img.shields.io/badge/VSCode-Extension-blue)](https://marketplace.visualstudio.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Công cụ mở rộng VSCode để dịch văn bản game với hỗ trợ AI. Hỗ trợ nhiều định dạng file (.txt, .json, .csv, .tsv) và các nhà cung cấp dịch thuật khác nhau bao gồm OpenRouter, OpenAI và các lựa chọn miễn phí.

## Tính năng

- **Nhiều Nhà Cung Cấp Dịch Thuật**: Google Translate (miễn phí), LibreTranslate, OpenRouter, OpenAI, Google Cloud Translation
- **Hỗ Trợ Định Dạng File**: .txt, .json, .csv, .tsv
- **Dịch Thông Minh**: Áp dụng từ điển tùy chỉnh trước khi dịch
- **Xử Lý Hàng Loạt**: Dịch toàn bộ file với thanh tiến trình
- **System Prompts**: Tùy chỉnh hành vi AI cho nội dung game cụ thể
- **Chế Độ Xem Trước**: Xem lại bản dịch trước khi áp dụng

## Cài đặt

### Tùy chọn 1: Từ VSCode Marketplace (Khuyến nghị)
Tìm kiếm "Game Text Translator" trong Extensions của VSCode và cài đặt.

### Tùy chọn 2: Từ GitHub Releases
1. Truy cập [Releases](https://github.com/levi-soft/Translation-Tool/releases)
2. Download file `.vsix` mới nhất
3. Trong VSCode: Extensions → Install from VSIX...
4. Chọn file đã download

### Tùy chọn 3: Build từ Source
```bash
git clone https://github.com/levi-soft/Translation-Tool.git
cd game-text-translator
npm install
npm run compile
code --install-extension game-text-translator-0.0.1.vsix
```

## Cấu hình

### Setup Cơ Bản

1. **Mở Settings**: File → Preferences → Settings (hoặc `Ctrl+,`)
2. **Tìm kiếm**: "game text translator"
3. **Cấu hình tùy chọn cơ bản**:

### Translation Provider (Chọn AI dịch)

Extension hỗ trợ 5 AI providers với chất lượng và giá khác nhau:

#### **Free Providers (Không cần API key):**
- **googleTranslate**: Google Translate miễn phí
  - Ưu: Nhanh, miễn phí
  - Nhược: Chất lượng cơ bản
- **libreTranslate**: Open-source AI
  - Ưu: Privacy, miễn phí
  - Nhược: Chất lượng trung bình

#### **Premium Providers (Cần API key):**
- **openRouter**: Truy cập nhiều AI model
  - Models: Claude-3.5, GPT-4, Gemini, etc.
  - Giá: Từ $0.001/1K tokens
- **openAI**: GPT models chính thức
  - Models: GPT-3.5, GPT-4, GPT-4o
  - Giá: Từ $0.002/1K tokens
- **googleCloud**: Google Cloud Translation
  - Ưu: Chất lượng cao cho ngôn ngữ châu Á
  - Giá: $20/1M characters

### Language Settings (Cài đặt ngôn ngữ)

- **Source Language**: Ngôn ngữ gốc (en, ja, zh, ko, vi, etc.)
- **Target Language**: Ngôn ngữ đích (vi, en, zh, ja, etc.)

**Ví dụ:**
- Game tiếng Anh → Tiếng Việt: `en` → `vi`
- Game tiếng Nhật → Tiếng Việt: `ja` → `vi`
- Game tiếng Trung → Tiếng Việt: `zh` → `vi`

### API Keys Setup (Cấu hình API key)

#### **OpenRouter (Khuyến nghị):**
1. **Đăng ký**: [openrouter.ai](https://openrouter.ai)
2. **Lấy API key**: Dashboard → API Keys
3. **VSCode Setting**: `"Game Text Translator: OpenRouter Api Key"`
4. **Model**: Extension tự động chọn model tốt nhất

#### **OpenAI:**
1. **Đăng ký**: [platform.openai.com](https://platform.openai.com)
2. **Lấy API key**: API Keys section
3. **VSCode Setting**: `"Game Text Translator: OpenAI Api Key"`

#### **Google Cloud:**
1. **Tạo project**: [Google Cloud Console](https://console.cloud.google.com)
2. **Enable Translation API**
3. **Tạo API key**: APIs & Services → Credentials
4. **VSCode Setting**: `"Game Text Translator: Google Cloud Api Key"`

### Advanced Configuration (Cấu hình nâng cao)

#### **System Prompt (Hướng dẫn AI):**
Tùy chỉnh cách AI dịch để phù hợp với game. System prompt giờ được nhập trong khung text nhiều dòng để dễ đọc và chỉnh sửa.

**System Prompt Mặc định:**
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

**Ví dụ cho từng thể loại game:**

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

**Game Kinh Dị:**
```text
You are a professional Vietnamese game translator specializing in horror games.

Guidelines:
- Maintain suspense and fear in the translation
- Use tense Vietnamese that creates unease
- Keep the atmosphere of dread and tension
- Translate jump scares and horror elements effectively

Translate the following horror game text:
```

**Game Mobile:**
```text
You are a professional Vietnamese game translator specializing in casual mobile games.

Guidelines:
- Keep fun, light tone throughout
- Use simple Vietnamese suitable for all ages
- Make translations engaging and accessible
- Consider short attention spans in mobile gaming

Translate the following mobile game text:
```

#### **Vocabulary Dictionary (Từ điển từ vựng):**
Đảm bảo dịch nhất quán các thuật ngữ đặc biệt:

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
- Thêm tên nhân vật, địa danh đặc biệt
- Sử dụng cùng một từ cho cùng concept
- Update từ điển khi gặp thuật ngữ mới

## Sử dụng

### Quick Start (Bắt đầu nhanh)

#### **Dịch Text Selection:**
1. **Mở file text** bất kỳ
2. **Chọn text** cần dịch (có thể chọn nhiều dòng)
3. **Chuột phải** → **"Translate Selection"**
4. **Xem preview** và **Apply**

*Provider mặc định: Google Translate (free)*

### Advanced Usage (Sử dụng nâng cao)

#### **Chuyển đổi AI Provider:**
1. **Settings** → Tìm "translation provider"
2. **Chọn provider** mong muốn
3. **Nhập API key** nếu cần (cho premium providers)
4. **Test dịch** để so sánh chất lượng

#### **Tùy chỉnh cho Game cụ thể:**
1. **Settings** → "system prompt"
2. **Viết prompt** phù hợp với thể loại game
3. **Settings** → "vocabulary"
4. **Thêm từ điển** thuật ngữ game


### Workflow Examples (Ví dụ quy trình làm việc)

#### **🎮 Dịch Game RPG:**
1. **Setup provider**: OpenRouter (cho chất lượng cao)
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
4. **Dịch text selections** từ game scripts và dialogue

#### **📱 Dịch Game Mobile:**
1. **Setup provider**: Google Translate (free, nhanh)
2. **System prompt**:
   ```
   Translate casual mobile game. Keep fun, simple tone.
   Use easy Vietnamese for all ages.
   ```
3. **Dịch text selections** từ UI strings và messages

#### **👻 Dịch Game Horror:**
1. **Setup provider**: OpenRouter với Claude
2. **System prompt**:
   ```
   Translate horror game text. Maintain suspense and fear.
   Use tense Vietnamese that creates unease.
   ```
3. **Vocabulary**: Thuật ngữ horror đặc trưng
4. **Dịch text selections** từ scary dialogue và descriptions

### Troubleshooting Usage

#### **Dịch không hoạt động:**
- Check Developer Console có lỗi
- Verify API key cho premium providers
- Test với Google Translate trước

#### **JSON dịch sai:**
- Đảm bảo JSON format đúng
- Check nested objects được xử lý
- Review translated JSON có valid không

#### **CSV/TSV lỗi:**
- Đảm bảo có header row
- Check delimiter (comma cho CSV, tab cho TSV)
- Verify encoding UTF-8

## Phát triển

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