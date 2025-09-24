# Changelog

All notable changes to Game Text Translator will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2025-01-XX

### Added
- Initial release of Game Text Translator VSCode extension
- Support for multiple file formats: .txt, .json, .csv, .tsv
- Multiple translation providers:
  - Google Translate (free)
  - LibreTranslate (free)
  - OpenRouter (premium)
  - OpenAI (premium)
  - Google Cloud Translation (premium)
- Custom vocabulary dictionary
- System prompts for AI translation
- Translate selection with preview
- Translate entire files with progress tracking
- Configurable source and target languages
- VSCode settings integration
- Command palette and context menu integration

### Technical
- TypeScript implementation
- Modular architecture with services and parsers
- VSCode Extension API compliance
- Error handling and cancellation support
- Progress reporting for long operations

## [Unreleased]

### Planned
- Unit and integration tests
- Additional file format support
- Batch file processing
- Translation memory
- Keyboard shortcuts
- Localization support
- Performance optimizations