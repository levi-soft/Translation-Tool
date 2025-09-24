# Ý Tưởng Công Cụ Dịch Text Game Trên VSCode

## Tóm Tắt Ý Tưởng
Công cụ là một VSCode extension TypeScript để dịch text game (.txt, .json, .csv, .tsv) từ nhiều ngôn ngữ, hỗ trợ đa API (free: Google Translate, LibreTranslate; premium: OpenRouter, OpenAI, Google Cloud), system prompt tùy chỉnh, từ điển từ vựng, và UX tinh chỉnh (preview, progress bar, smart selection). Khả thi cao, triển khai qua GitHub/Marketplace, chạy client-side.

## Tổng Quan
Tạo một VSCode extension để dịch văn bản game từ tiếng Anh sang tiếng Việt. Extension này giúp nhà phát triển game Việt Nam dịch nhanh chóng các file text game như dialogue, description, v.v.

## Yêu Cầu Chính
- **Ngôn ngữ dịch**: Có thể chọn ngôn ngữ gốc và ngôn ngữ đích (không chỉ Anh-Việt).
- **Tích hợp**: VSCode extension để dịch trực tiếp trong editor.
- **Định dạng file hỗ trợ**: .txt, .json, .csv, .tsv.

## Tính Năng Chính
- Dịch text được chọn trong editor (có thể chọn nhiều dòng để tránh timeout AI).
- Dịch toàn bộ file.
- Batch dịch nhiều file.
- Tích hợp đa API dịch: miễn phí (Google Translate free tier, LibreTranslate) và nâng cao (OpenRouter, OpenAI, Google Cloud Translation) để linh hoạt theo nhu cầu.
- Từ điển từ vựng có thể cấu hình để tránh dịch sai nghĩa (ví dụ: tên nhân vật, thuật ngữ game).
- Chọn ngôn ngữ gốc và ngôn ngữ đích trong settings.
- Giao diện thân thiện: Command palette, context menu, settings.

## Kiến Trúc Extension
- Sử dụng VSCode Extension API (TypeScript).
- Module chính:
  - Parser cho từng định dạng file.
  - Translation service: hỗ trợ đa provider (free: Google Translate, LibreTranslate; premium: OpenRouter, OpenAI, Google Cloud) với system prompt và từ điển.
  - Vocabulary manager để quản lý từ điển từ vựng.
  - UI components cho commands và menus.
- Cấu trúc file:
  - src/extension.ts: Entry point.
  - src/parsers/: Các parser cho .txt, .json, v.v.
  - src/services/: Translation service và vocabulary manager.
  - src/ui/: Commands và menus.
  - config/: System prompts và từ điển mặc định.

## Kế Hoạch Triển Khai
1. Nghiên cứu VSCode Extension API và yêu cầu phát triển extension.
2. Thiết kế kiến trúc extension: cấu trúc file, module chính (dịch, parse file, từ điển).
3. Phát triển translation service hỗ trợ đa provider: free (Google Translate, LibreTranslate) và premium (OpenRouter, OpenAI, Google Cloud).
4. Phát triển vocabulary manager để quản lý từ điển từ vựng.
5. Phát triển parser cho các format file (.txt, .json, .csv, .tsv).
6. Tạo logic dịch: dịch text được chọn, toàn bộ file, hoặc batch với áp dụng từ điển.
7. Thiết kế giao diện người dùng: command palette, context menu, settings cho system prompt và từ điển.
8. Triển khai tính năng dịch với xử lý lỗi và tối ưu hiệu suất.
9. Viết unit tests và integration tests.
10. Test extension trên các file game mẫu.
11. Package extension và chuẩn bị cho publish trên VSCode Marketplace.

## Đánh Giá Khả Thi và Tinh Chỉnh

### Khả Thi
- **VSCode Extension API**: Hỗ trợ đầy đủ cho việc tạo extension với commands, menus, settings. Có thể tích hợp dễ dàng với editor.
- **OpenRouter API**: API có sẵn, hỗ trợ nhiều model AI, có thể gửi system prompt và user prompt riêng biệt.
- **Parsers**: Các format .txt, .json, .csv, .tsv đều có thư viện parse sẵn trong Node.js/TypeScript.
- **Từ điển và System Prompt**: Có thể lưu trong settings hoặc file config, dễ quản lý.
- **Ngôn ngữ**: OpenRouter hỗ trợ đa ngôn ngữ, có thể detect ngôn ngữ tự động.

### Tinh Chỉnh Cho Logic Dễ Sử Dụng
- **Workflow Setup**: Thêm wizard khi cài extension để chọn ngôn ngữ mặc định, nhập system prompt mẫu, import từ điển cơ bản.
- **Preview Dịch**: Trước khi áp dụng, hiển thị popup preview với text gốc và dịch, cho phép edit trước khi replace.
- **Progress Bar**: Cho batch dịch, hiển thị tiến độ và thời gian ước tính.
- **Smart Selection**: Tự động detect nếu selection là key-value pair (JSON) để dịch chỉ value, giữ key nguyên.
- **Error Handling**: Hiển thị lỗi rõ ràng, gợi ý khắc phục (ví dụ: kiểm tra API key, network).
- **Keyboard Shortcuts**: Gán shortcut mặc định cho translate selection (Ctrl+Shift+T).
- **Context Menu**: Thêm options như "Translate to Vietnamese", "Translate to English" dựa trên ngôn ngữ hiện tại.

## Prompt Để Tạo Công Cụ
Sử dụng prompt này để yêu cầu AI tạo extension:

"Tạo một VSCode extension bằng TypeScript để dịch text game. Extension cần hỗ trợ các định dạng file .txt, .json, .csv, .tsv. Tính năng: dịch text được chọn (có thể chọn nhiều dòng để tránh timeout AI), dịch toàn bộ file, batch dịch. Tích hợp đa API dịch: miễn phí (Google Translate, LibreTranslate) và nâng cao (OpenRouter, OpenAI, Google Cloud) với system prompt tùy chỉnh để dịch theo tiêu chuẩn game riêng. Bao gồm từ điển từ vựng có thể cấu hình để tránh dịch sai nghĩa. Cho phép chọn ngôn ngữ gốc và ngôn ngữ đích trong settings. Giao diện: command palette 'Translate Selection', context menu 'Translate File', settings cho system prompt, từ điển, ngôn ngữ và provider dịch. Xử lý lỗi và tối ưu hiệu suất. Bao gồm unit tests."

## Triển Khai và Sử Dụng

### Lưu Trữ và Phân Phối
- **GitHub**: Code extension có thể lưu trữ trên GitHub repository public để chia sẻ và collaboration.
- **VSCode Marketplace**: Publish extension lên marketplace để người dùng cài đặt dễ dàng qua "Extensions" tab trong VSCode, không cần build manual.
- **Không chạy trên máy chủ**: Extension chạy client-side trên máy người dùng, tích hợp trực tiếp với VSCode editor. Không thể chạy remote như web app vì cần access editor APIs.

### Sử Dụng Trên Nhiều Máy
- Cài đặt extension từ marketplace trên mỗi máy VSCode.
- Settings (system prompt, từ điển, API key) lưu local trên mỗi máy, có thể export/import để đồng bộ.
- Nếu cần sync settings, sử dụng VSCode Settings Sync hoặc lưu từ điển trên cloud storage (Google Drive, Dropbox) và import thủ công.

## Lưu Ý Thêm
- Đảm bảo extension tuân thủ VSCode Marketplace guidelines.
- Xem xét bảo mật API key (sử dụng settings để lưu trữ).
- Hỗ trợ undo/redo cho các thay đổi dịch.