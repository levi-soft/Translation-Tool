# Contributing to Game Text Translator

Thank you for your interest in contributing to Game Text Translator! This document provides guidelines for contributing to the project.

## Development Setup

1. Fork the repository on GitHub
2. Clone your fork: `git clone https://github.com/your-username/game-text-translator.git`
3. Install dependencies: `npm install`
4. Compile the extension: `npm run compile`
5. Open in VSCode and press F5 to test

## Code Style

- Use TypeScript for all new code
- Follow the existing code style (4 spaces indentation)
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

## Testing

- Test your changes thoroughly
- Run existing tests: `npm test`
- Add tests for new features
- Test with different file formats (.txt, .json, .csv, .tsv)

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test thoroughly
4. Update documentation if needed
5. Commit with clear messages: `git commit -m "Add: feature description"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Create a Pull Request on GitHub

## Adding New Translation Providers

To add a new translation provider:

1. Add the provider to the enum in `package.json` configuration
2. Implement the translation method in `TranslationService.ts`
3. Add API key configuration in settings
4. Update README.md with setup instructions
5. Add error handling for the new provider

## Reporting Issues

- Use GitHub Issues to report bugs
- Include VSCode version, OS, and steps to reproduce
- Attach sample files if relevant
- Check existing issues first

## Feature Requests

- Use GitHub Issues with "enhancement" label
- Describe the use case and benefits
- Consider implementation complexity

## License

By contributing, you agree that your contributions will be licensed under the MIT License.