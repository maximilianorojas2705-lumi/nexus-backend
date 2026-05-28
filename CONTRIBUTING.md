# Contributing to Nexus Backend

Thank you for your interest in contributing to the Nexus Backend project! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Report inappropriate behavior to maintainers

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear, descriptive title
   - Detailed description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment information (Node version, OS, etc.)

### Suggesting Enhancements

1. Use Issues to suggest new features
2. Provide:
   - Clear description of the enhancement
   - Use cases and benefits
   - Possible implementation approach

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes following code standards
4. Write or update tests
5. Run tests locally: `npm test`
6. Lint your code: `npm run lint`
7. Commit with descriptive message: `git commit -m "feat: description"`
8. Push to your fork: `git push origin feature/your-feature`
9. Open a Pull Request with detailed description

### Pull Request Guidelines

- Keep changes focused and atomic
- Include relevant issue numbers (e.g., Closes #123)
- Update documentation if needed
- Ensure all tests pass
- Request review from maintainers

## Development Setup

```bash
# Clone the repository
git clone https://github.com/maximilianorojas2705-lumi/nexus-backend.git
cd nexus-backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure .env with your settings

# Run development server
npm run dev

# Run tests
npm test

# Run linter
npm run lint
```

## Code Standards

### Naming Conventions
- Files: `camelCase` or `PascalCase`
- Classes: `PascalCase`
- Functions/Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Interfaces: `IPascalCase`

### Best Practices
- Write meaningful commit messages
- Keep functions small and focused
- Add comments for complex logic
- Use async/await over callbacks
- Handle errors appropriately
- Write tests for new features

### File Organization
- Controllers handle HTTP requests
- Services contain business logic
- Models define data schemas
- Middlewares intercept requests
- Validators ensure data integrity

## Testing

- Write unit tests for services
- Write integration tests for API endpoints
- Aim for 80%+ code coverage
- Test both success and failure cases

```bash
npm test                 # Run all tests
npm run test:watch      # Run tests in watch mode
```

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat` - A new feature
- `fix` - A bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring without feature changes
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Build process, dependencies, etc.

### Example
```
feat(auth): add password reset functionality

Implement email-based password reset with token validation
and expiration. Includes secure token generation and
proper error handling.

Closes #456
```

## Documentation

- Update README.md for significant changes
- Document new API endpoints
- Add inline comments for complex code
- Update DEVELOPMENT.md if process changes
- Maintain CHANGELOG.md

## Questions?

- Open an issue with your question
- Check existing documentation
- Review similar implementations

---

Thank you for contributing! 🙏
