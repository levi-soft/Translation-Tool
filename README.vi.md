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
Tùy chỉnh cách AI dịch để phù hợp với game:

```text
You are a professional Vietnamese game translator. Translate naturally while maintaining the game's tone and style. Use appropriate gaming terminology and keep cultural context in mind.
```

**Ví dụ cho từng thể loại:**

**RPG Fantasy:**
```
Translate fantasy RPG text. Keep epic tone. Use "Anh Hùng" for Hero, "Phép Thuật" for Magic, "Rồng" for Dragon.
```

**Horror Game:**
```
Translate horror game text. Maintain suspense and fear. Use tense Vietnamese that creates unease.
```

**Mobile Game:**
```
Translate casual mobile game. Keep fun, light tone. Use simple Vietnamese suitable for all ages.
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

#### **1. Dịch Text Đơn Giản (Free):**
1. **Mở file text** bất kỳ
2. **Chọn text** cần dịch
3. **Chuột phải** → **"Translate Selection"**
4. **Xem preview** và **Apply**

*Provider mặc định: Google Translate (free)*

#### **2. Dịch Toàn Bộ File:**
1. **Mở file** .txt, .json, .csv, .tsv
2. **Ctrl+Shift+P** → **"Translate File"**
3. **Xem progress bar** và chờ hoàn thành

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

### File Format Guide (Hướng dẫn theo định dạng file)

#### **📄 .txt Files (File text thuần):**
```
Welcome to the Adventure Game!
Hello, brave adventurer!
```

**Cách dịch:**
- Chọn toàn bộ file hoặc từng đoạn
- Dịch như text bình thường
- Giữ nguyên format và xuống dòng

#### **📋 .json Files (File cấu hình game):**

**Định dạng tiêu chuẩn:**
```json
{
  "welcome": "Welcome to the game!",
  "character": {
    "name": "Hero",
    "class": "Warrior"
  },
  "items": ["Sword", "Shield", "Potion"]
}
```

**Cách dịch:**
- Extension tự động parse JSON
- Chỉ dịch **string values**, giữ nguyên **keys**
- Giữ nguyên cấu trúc JSON
- Xử lý nested objects và arrays

**Kết quả:**
```json
{
  "welcome": "Chào mừng đến với game!",
  "character": {
    "name": "Anh Hùng",
    "class": "Chiến Binh"
  },
  "items": ["Kiếm", "Khiên", "Thuốc"]
}
```

**🎯 Định dạng Localization (Khuyến nghị cho quy trình dịch):**
```json
{
  "hello": "",
  "hero": "",
  "sword": "",
  "shield": "",
  "potion": ""
}
```

**Cách dịch:**
- Tự động phát hiện định dạng localization (key-value với giá trị rỗng)
- Dịch keys như text gốc
- Điền values với bản dịch

**Kết quả:**
```json
{
  "hello": "xin chào",
  "hero": "anh hùng",
  "sword": "kiếm",
  "shield": "khiên",
  "potion": "thuốc"
}
```

#### **📊 .csv Files (Bảng dữ liệu game):**

**Định dạng tiêu chuẩn:**
```csv
ID,Name,Description
1,Sword,A sharp blade
2,Shield,Protects from attacks
3,Potion,Restores health
```

**Cách dịch:**
- Parse theo hàng và cột
- Dịch nội dung cells (không dịch headers)
- Giữ nguyên cấu trúc bảng

**Kết quả:**
```csv
ID,Name,Description
1,Kiếm,Lưỡi kiếm sắc nhọn
2,Khien,Bảo vệ khỏi tấn công
3,Thuoc,Phục hồi máu
```

**🎯 Định dạng Localization (Khuyến nghị cho quy trình dịch):**
```csv
Text,Translation
hello,
hero,
sword,
shield,
potion,
```

**Cách dịch:**
- Tự động phát hiện định dạng localization theo headers
- Dịch cột đầu (text gốc)
- Điền cột thứ 2 (bản dịch)
- Giữ cấu trúc 2 cột

**Kết quả:**
```csv
Text,Translation
hello,xin chào
hero,anh hùng
sword,kiếm
shield,khiên
potion,thuốc
```

#### **📈 .tsv Files (Tab-separated values):**
Giống CSV nhưng dùng tab thay vì comma.

**Định dạng tiêu chuẩn:**
```
ID	Name	Description
1	Sword	A sharp blade
```

**Dịch tương tự CSV.**

**🎯 Định dạng Localization (Khuyến nghị):**
```
Text	Translation
hello
hero
sword
```

**Kết quả:**
```
Text	Translation
hello	xin chào
hero	anh hùng
sword	kiếm
```

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
4. **Dịch file**: dialogue.json, quests.json, items.csv

#### **📱 Dịch Game Mobile:**
1. **Setup provider**: Google Translate (free, nhanh)
2. **System prompt**:
   ```
   Translate casual mobile game. Keep fun, simple tone.
   Use easy Vietnamese for all ages.
   ```
3. **Dịch file**: strings.txt, ui.json

#### **👻 Dịch Game Horror:**
1. **Setup provider**: OpenRouter với Claude
2. **System prompt**:
   ```
   Translate horror game text. Maintain suspense and fear.
   Use tense Vietnamese that creates unease.
   ```
4. **Vocabulary**: Thuật ngữ horror đặc trưng

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