# 🚀 Game Text Translator - Hướng Dẫn Nhanh

## 1. Cài đặt Extension

### Từ GitHub Releases (Khuyến nghị):
1. Vào [Releases](https://github.com/levi-soft/Translation-Tool/releases)
2. Download file `.vsix` mới nhất
3. VSCode: Extensions → Install from VSIX → Chọn file

### Từ VSCode Marketplace (Sắp có):
1. Extensions → Tìm "Game Text Translator"
2. Install

## 2. Test Cơ Bản (Free)

### Dịch Text Nhanh:
1. **Tạo file** `test.txt`:
   ```
   Hello world!
   Welcome to the game.
   ```

2. **Chọn text** "Hello world!"
3. **Chuột phải** → **"Translate Selection"**
4. **Xem popup** → **Apply**

*✅ Sử dụng Google Translate miễn phí*

## 3. Nâng Cấp Chất Lượng (Premium AI)

### Bước 1: Chọn AI Provider
```
Settings → "game text translator" → "Translation Provider"
```
- **openRouter**: Khuyến nghị (nhiều models, giá rẻ)
- **openAI**: GPT chính thức
- **googleCloud**: Chất lượng cao

### Bước 2: Nhập API Key

#### OpenRouter (Dễ nhất):
1. [Đăng ký openrouter.ai](https://openrouter.ai)
2. Copy API key
3. VSCode Settings: `"Game Text Translator: OpenRouter Api Key"`

#### OpenAI:
1. [platform.openai.com](https://platform.openai.com)
2. API Keys → Create new
3. VSCode: `"Game Text Translator: OpenAI Api Key"`

### Bước 3: Test AI
1. Chọn text dài hơn
2. Dịch và so sánh chất lượng

## 4. Tùy Chỉnh Cho Game

### System Prompt (Phong cách dịch):
```
Settings → "Game Text Translator: System Prompt"

Ví dụ cho RPG:
"You are a Vietnamese game translator. Translate RPG dialogue naturally while maintaining epic fantasy tone. Use appropriate gaming terminology."
```

### Từ Điển Từ Vựng:
```
Settings → "Game Text Translator: Vocabulary"

{
  "Hero": "Anh Hùng",
  "Mana": "Năng Lượng",
  "Quest": "Nhiệm Vụ",
  "Boss": "Trùm Cuối"
}
```

## 5. Dịch Các Loại File

### 📄 Text File (.txt):
- Chọn text → Translate Selection
- Hoặc mở file → Translate File

### 📋 JSON File (.json):
```json
{
  "dialogue": "Hello adventurer!",
  "items": ["Sword", "Shield"]
}
```
→ Chỉ dịch values, giữ keys

### 📊 CSV/TSV Files:
```
Name,Description
Sword,A sharp blade
Shield,Protects you
```
→ Dịch cells, giữ headers

## 6. Workflow Phổ Biến

### 🎮 Game Developer Workflow:
1. **Setup**: OpenRouter + custom prompt cho thể loại game
2. **Vocabulary**: Thêm thuật ngữ game đặc trưng
3. **Batch**: Dịch toàn bộ thư mục text game
4. **Review**: Kiểm tra translations
5. **Export**: Sử dụng trong game

### 📱 Mobile Game Workflow:
1. **Setup**: Google Translate (nhanh, free)
2. **Files**: strings.json, ui.csv
3. **Quick**: Dịch từng file nhỏ

## 7. Troubleshooting

### Extension không hoạt động:
- Restart VSCode
- Check Developer Console (Help → Toggle Developer Tools)

### API key không hoạt động:
- Verify key chưa expired
- Check quota/limits
- Test với free provider

### File không dịch được:
- Check file encoding (UTF-8)
- Verify JSON/CSV format đúng
- Try smaller file trước

## 🎯 Tóm Tắt

**Bắt đầu**: Google Translate (free)
**Nâng cao**: OpenRouter + custom settings
**Pro**: Từ điển + system prompts

**Extension đã sẵn sàng sử dụng!** 🎉