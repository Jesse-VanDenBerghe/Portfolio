# AI Coding Agent Instructions for Portfolio

## Project Overview

This is an AI-powered personal portfolio built with **React 19 + Vite + TypeScript**, deployed to **AWS S3 + CloudFront** with infrastructure-as-code (CloudFormation). The portfolio features an interactive AI chat agent powered by Google's Gemini API that represents the portfolio owner.

### Architecture at a Glance

```
Frontend (React)           Backend Services       Infrastructure
├─ App.tsx (layout)       ├─ geminiService.ts    ├─ CloudFormation
├─ components/            │  (Gemini API)        │  (S3 + CloudFront)
│  └─ AgentChat.tsx       └─ constants.ts        ├─ S3 sync script
│     (chat UI)              (CV_DATA)            └─ Deployment scripts
├─ constants.ts           
├─ types.ts
└─ vite.config.ts
```

## Key Architectural Patterns

### 1. **Content-as-Config via CV_DATA**
All portfolio content (skills, experience, projects, certifications) is centralized in `constants.ts` as a single `CVData` object exported from `types.ts`. This powers both the UI renders AND the Gemini system instruction context.

- **File**: `constants.ts` → `CV_DATA` constant
- **Type**: See `CVData` interface in `types.ts`
- **Why**: Single source of truth; AI agent learns from same data portfolio displays

### 2. **Service-Based Gemini Integration**
The Gemini API interaction is isolated in a dedicated service layer that maintains chat session state. All UI components requesting AI responses go through `sendMessageToGemini()`.

- **File**: `services/geminiService.ts`
- **Key Functions**:
  - `getChatSession()` - Returns or creates singleton chat session
  - `sendMessageToGemini(message)` - Core message exchange
- **System Instruction**: Built dynamically from `CV_DATA` context
- **Why**: Decoupled state management; reusable across components

### 3. **Environment Variable: GEMINI_API_KEY**
The Gemini API key is **only** injected via `process.env.API_KEY` (not from environment files at runtime).

- **Dev Setup**: Add `GEMINI_API_KEY` to `.env.local` (git-ignored)
- **Production**: Set via GitHub Secrets → GitHub Actions environment
- **Key Point**: No fallback; if missing, chat will fail gracefully

### 4. **Component Structure**
Each portfolio section (Hero, About, Skills, etc.) is a separate component. `AgentChat` is a floating chat widget with its own state and lifecycle.

- **Location**: `components/`
- **Pattern**: Functional components with React hooks
- **Styling**: Tailwind CSS classes (dark theme: slate-900/slate-200)
- **Animations**: Framer Motion for transitions/modals

### 5. **Build & Deployment Pipeline**

**Development**:
```bash
npm install      # Install dependencies
npm run dev      # Start Vite dev server (localhost:5173)
npm run build    # Production build to dist/
npm run preview  # Preview built bundle locally
```

**Infrastructure Deployment** (see `infrastructure/README.md` for details):
```bash
make deploy-infra  # Deploy CloudFormation stack (S3 + CloudFront + OIDC)
make sync-s3       # Sync dist/ to S3 + invalidate CloudFront cache
make build         # npm run build (shortcut)
```

**Automated Deployment** (GitHub Actions):
- Triggers on push to `main`
- Builds → Uploads to S3 → Invalidates CloudFront
- Uses OIDC role for AWS credentials (no long-lived keys)

## Common Developer Workflows

### Adding New Portfolio Content
1. Update `CV_DATA` in `constants.ts` (experience, projects, certifications, skills)
2. Ensure new fields match the corresponding interface in `types.ts`
3. The UI re-renders automatically; Gemini AI agent automatically learns about the new content from the system instruction
4. No additional code changes needed unless adding a new section component

### Adding a New Portfolio Section
1. Create new component in `components/` (e.g., `components/Awards.tsx`)
2. Import in `App.tsx` and add to JSX between other sections
3. Follow existing component patterns (export const, React.FC<>, Tailwind styling)
4. Add data to `CV_DATA` in `constants.ts` if needed

### Testing Gemini Chat Locally
1. Copy `.env.local.example` → `.env.local` (if it exists) or create `.env.local`
2. Add `GEMINI_API_KEY=your-api-key` (obtain from [Google AI Studio](https://aistudio.google.com))
3. Run `npm run dev` and click the chat widget
4. Check console for API errors if chat doesn't respond

### Deploying to AWS
**First time**:
```bash
# Validate CloudFormation template
aws cloudformation validate-template \
  --template-body file://infrastructure/cloudformation/portfolio-infrastructure.yaml \
  --region eu-west-3

# Deploy stack
make deploy-infra
# Provide: GitHub org, repo name, stack name when prompted
```

**Subsequent updates**:
```bash
npm run build        # Build production bundle
make sync-s3         # Sync to S3 + invalidate CloudFront cache
# OR just push to main branch → GitHub Actions handles it
```

## Project-Specific Conventions

### Naming
- Component files: PascalCase (e.g., `AgentChat.tsx`, `SectionHeader.tsx`)
- Services: camelCase with "Service" suffix (e.g., `geminiService.ts`)
- Constants: SCREAMING_SNAKE_CASE for configuration constants (e.g., `CV_DATA`)

### Styling
- **Framework**: Tailwind CSS only (no CSS-in-JS or separate CSS files)
- **Dark theme**: Base is `bg-slate-900` with `text-slate-200`
- **Accent color**: Emerald (`emerald-500`) for highlights and selections
- **Animations**: Use Framer Motion (`<motion.div>`, `<AnimatePresence>`) for UI transitions

### Type Safety
- All components are `React.FC<>` (functional components)
- All service functions have explicit return types (e.g., `: Promise<string>`)
- Use interfaces from `types.ts` for data structures; avoid loose `any` types

### Error Handling
- **Gemini API errors**: Caught and return graceful fallback messages (see `geminiService.ts`)
- **Missing root element**: Throws error in `index.tsx` (intentional)
- **Chat failures**: User sees "I seem to be having trouble..." message, not a crash

## Integration Points & Dependencies

### External Services
1. **Google Gemini API** (`@google/genai` package)
   - Singleton chat session in `geminiService.ts`
   - System instruction includes CV_DATA context
   - Model: `gemini-2.5-flash`

2. **AWS S3 + CloudFront** (infrastructure layer)
   - S3 bucket stores built portfolio files (private)
   - CloudFront serves via HTTPS with caching
   - SPA routing redirects `/*` → `index.html` (configured in CF distribution)

3. **GitHub Actions** (CI/CD)
   - Triggered on push to `main`
   - Uses OpenID Connect (OIDC) for AWS authentication
   - IAM role created by CloudFormation

### Build Tools
- **Vite**: Fast build tool and dev server
- **TypeScript**: All source files are `.ts` or `.tsx`
- **React 19**: Latest stable version with hooks
- **Framer Motion**: Animations and gesture handling
- **Lucide React**: Icon library (used in AgentChat, contact buttons, etc.)

## Critical Files Reference

| File | Purpose |
|------|---------|
| `App.tsx` | Main layout; imports all section components |
| `constants.ts` | Portfolio content (CV_DATA) |
| `types.ts` | TypeScript interfaces for CV_DATA and Chat |
| `services/geminiService.ts` | Gemini API integration; singleton session |
| `components/AgentChat.tsx` | Floating chat widget UI |
| `infrastructure/cloudformation/portfolio-infrastructure.yaml` | AWS stack definition |
| `infrastructure/scripts/deploy-infrastructure.sh` | CloudFormation deployment script |
| `infrastructure/scripts/sync-s3.sh` | S3 upload + CloudFront invalidation |
| `Makefile` | Developer convenience commands |

## Deployment Checklist

Before pushing to production or running `make deploy-infra`:
- [ ] Verify `CV_DATA` is complete and accurate in `constants.ts`
- [ ] Test locally: `npm run dev` → Open AgentChat, ask it something
- [ ] Run `npm run build` and verify no TypeScript errors
- [ ] If deploying infrastructure for first time, validate template: `make validate-workflow`
- [ ] After S3 sync, check CloudFront distribution ID matches in script
- [ ] For GitHub Actions, verify OIDC role is created by CloudFormation

## Known Patterns & Gotchas

1. **API Key Injection**: Use `process.env.API_KEY` only; no default fallback. Missing key causes graceful degradation.
2. **CloudFront Caching**: After `make sync-s3`, CloudFront cache is invalidated (path `/*`). Can take 1-2 min to propagate.
3. **SPA Routing**: CloudFront distribution is configured to serve `index.html` for 404 errors (SPA requirement).
4. **Component Imports**: Always import components with full paths (`./components/Hero`), not relative navigation.
5. **Tailwind JIT**: Tailwind watches files in `src/**`; ensure component class names are in content config in `vite.config.ts`.
