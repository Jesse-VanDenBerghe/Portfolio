# Portfolio

AI-powered portfolio with React + Vite, hosted on AWS S3 + CloudFront.

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies: `npm install`
2. Set `GEMINI_API_KEY` in [.env.local](.env.local)
3. Run: `npm run dev`

## Deployment

Portfolio auto-deploys to AWS on push to `main` via GitHub Actions.

**Infrastructure**: See [infrastructure/README.md](infrastructure/README.md) for:
- CloudFormation stack details
- Manual deployment steps
- CloudFront cache invalidation
- Troubleshooting & cost breakdown
- IAM permissions & rollback procedures

**Live URL**: Check CloudFormation stack outputs for CloudFront domain
