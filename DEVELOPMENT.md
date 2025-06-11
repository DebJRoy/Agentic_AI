# Development Guide

This guide provides instructions for developers working on the Agentic AI repository.

## 🚀 Quick Start for New Developers

### 1. Clone and Setup
```bash
git clone https://github.com/DebJRoy/Agentic_AI.git
cd Agentic_AI
```

### 2. Setup IAM Validation Assistant
```bash
cd iam-nextjs
npm install
npm run dev
```

The application will be available at `http://localhost:3003`

## 🛠️ Development Workflow

### Branch Strategy
- `main` - Production ready code
- `develop` - Development branch for integration
- `feature/[feature-name]` - Feature development branches
- `bugfix/[bug-name]` - Bug fix branches

### Making Changes
1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test thoroughly

3. Commit with descriptive messages:
   ```bash
   git add .
   git commit -m "feat: add new validation component for service accounts"
   ```

4. Push and create a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

## 📋 Code Standards

### TypeScript
- Use strict TypeScript settings
- Define proper interfaces and types
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### React Components
- Use functional components with hooks
- Implement proper error boundaries
- Follow accessibility guidelines (ARIA labels, semantic HTML)
- Use Bootstrap classes for styling

### Git Commit Convention
Follow the conventional commits specification:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## 🧪 Testing

### Running Tests
```bash
cd iam-nextjs
npm run test
```

### Testing Guidelines
- Write unit tests for utility functions
- Add integration tests for React components
- Test accessibility features
- Verify responsive design on different screen sizes

## 🏗️ Architecture

### IAM Validation Assistant Structure
```
iam-nextjs/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx         # Application header
│   ├── InputPanel.tsx     # Validation input form
│   ├── ResultPanel.tsx    # Validation results
│   ├── EvidenceViewer.tsx # Evidence display
│   ├── ActionPanel.tsx    # Remediation actions
│   └── Chatbot.tsx        # AI assistant
├── data/                  # Mock data and configurations
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

## 🔧 Common Development Tasks

### Adding New Components
1. Create component in `iam-nextjs/components/`
2. Define TypeScript interfaces in `iam-nextjs/types/`
3. Add appropriate styling with Bootstrap classes
4. Export from appropriate index files

### Updating Styles
- Use Bootstrap utility classes when possible
- Add custom CSS to `globals.css` for Wells Fargo theming
- Ensure responsive design principles

### Adding New Features
1. Plan the feature architecture
2. Create necessary types and interfaces
3. Implement components with proper error handling
4. Add documentation and examples
5. Test thoroughly across different browsers

## 🚀 Deployment

### Build for Production
```bash
cd iam-nextjs
npm run build
npm run start
```

### Environment Variables
Create `.env.local` for local development:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)
- [React Accessibility Guide](https://reactjs.org/docs/accessibility.html)

## 🤝 Getting Help

- Check existing issues on GitHub
- Create new issues for bugs or feature requests
- Join development discussions in pull requests
- Contact maintainers for architectural questions 