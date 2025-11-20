## Feature: AWS Hosting Setup

**Branch**: feature/aws-hosting-setup  
**Created**: 2025-11-20  
**Author**: GitHub Copilot  
**Jira**: N/A

## Overview
Set up AWS infrastructure to host React/Vite portfolio using S3 + CloudFront, managed via CloudFormation templates, with automated CI/CD via GitHub Actions.

## Problem Statement
Portfolio currently runs only locally. Need production hosting on AWS with:
- Static site hosting (S3 + CloudFront)
- HTTPS by default
- Automated deployments on push to main
- Infrastructure as Code (CloudFormation)
- Cost-effective solution for low-traffic portfolio site

## Solution
Deploy portfolio to AWS using:
- **S3**: Static file storage (private bucket, CloudFront OAI access only)
- **CloudFormation**: IaC for all AWS resources
- **CloudFront**: CDN with HTTPS, SPA routing support
- **GitHub Actions**: CI/CD pipeline (build + deploy)
- **Region**: eu-west-3
- **Account**: 920373033350

## Implementation Plan

### Phase 1: CloudFormation Infrastructure Setup
Create CloudFormation templates for S3 + CloudFront hosting infrastructure.

- [X] Create `infrastructure/cloudformation/` directory structure
- [X] Create `portfolio-infrastructure.yaml` CloudFormation template with:
  - [X] S3 bucket (private, versioning enabled)
  - [X] S3 bucket policy for CloudFront OAI access
  - [X] CloudFront Origin Access Identity
  - [X] CloudFront distribution (HTTPS, HTTP→HTTPS redirect)
  - [X] Default root object: index.html
  - [X] Custom error response (404→index.html for SPA routing)
  - [X] Cache behaviors optimized for static assets
  - [X] Stack outputs: CloudFront URL, S3 bucket name, distribution ID
- [X] Create `parameters.json` for eu-west-3 deployment
- [X] Create `scripts/deploy-infrastructure.sh` deployment helper script
- [X] Test CloudFormation template validation
- [x] Document manual stack deployment steps in README

**Deliverable**: Working CloudFormation template ready for deployment

---

### Phase 2: GitHub Actions CI/CD Pipeline
Automate build and deployment process on push to main branch.

- [X] Create `.github/workflows/deploy.yml` workflow with:
  - [X] Trigger on push to main branch
  - [X] Node.js setup (v18+)
  - [X] Dependency installation (`npm ci`)
  - [X] Production build (`npm run build`)
  - [X] AWS credentials configuration (GitHub secrets)
  - [X] S3 sync of `dist/` directory
  - [X] CloudFront cache invalidation (/*) 
- [X] Document required GitHub secrets:
  - [X] `AWS_ACCESS_KEY_ID`
  - [X] `AWS_SECRET_ACCESS_KEY`
  - [X] `AWS_REGION` (eu-west-3)
  - [X] `AWS_ACCOUNT_ID` (920373033350)
  - [X] `S3_BUCKET_NAME` (from CloudFormation output)
  - [X] `CLOUDFRONT_DISTRIBUTION_ID` (from CloudFormation output)
  - [X] `GEMINI_API_KEY` (for build-time env var)
- [X] Add workflow permissions documentation
- [X] Test workflow on feature branch before merging

**Deliverable**: Automated deployment pipeline from GitHub to AWS

---

### Phase 3: Build Configuration & Environment Variables
Configure Vite for production deployment on CloudFront.

- [X] Update `vite.config.ts`:
  - [X] Configure base URL for CloudFront (root path)
  - [X] Verify build output directory (`dist`)
  - [X] Add production-specific optimizations
- [X] Create `.env.production` template file
- [X] Update `package.json` scripts if needed
- [X] Add CloudFormation error page configuration (404→index.html for SPA)
- [X] Test production build locally:
  - [X] Run `npm run build`
  - [X] Run `npm run preview`
  - [X] Verify routing and assets load correctly

**Deliverable**: Production-ready Vite build configuration

---

### Phase 4: Documentation & Monitoring
Create comprehensive operational documentation.

- [ ] Create `infrastructure/README.md` with:
  - [ ] Architecture overview (S3 + CloudFront + GitHub Actions)
  - [ ] ASCII/text architecture diagram
  - [ ] Initial CloudFormation deployment instructions
  - [ ] GitHub Actions setup guide
  - [ ] Manual deployment steps (if needed)
  - [ ] Troubleshooting common issues
  - [ ] CloudFormation stack management commands
  - [ ] Rollback procedures
  - [ ] Cost estimation breakdown
- [ ] Document IAM permissions needed for GitHub Actions
- [ ] Add CloudFormation stack deletion instructions
- [ ] Optional: Add CloudWatch alarms for 4xx/5xx errors
- [ ] Update main README.md with deployment info

**Deliverable**: Complete operational documentation

---

## Acceptance Criteria
- [ ] CloudFormation template successfully creates S3 bucket + CloudFront distribution
- [ ] Portfolio accessible via CloudFront HTTPS URL
- [ ] GitHub Actions workflow triggers on push to main
- [ ] Build completes in <5 minutes
- [ ] Deployment succeeds without manual intervention
- [ ] SPA routing works (no 404 errors on page refresh)
- [ ] Static assets (JS, CSS, images) load correctly
- [ ] CloudFront serves content with HTTPS
- [ ] CloudFront cache invalidation working after deployment
- [ ] S3 bucket NOT publicly accessible (CloudFront OAI only)
- [ ] Documentation includes all deployment steps
- [ ] Cost stays within $1-5/month estimate

## Side Notes

### Security Considerations
- S3 bucket is private (no public access)
- CloudFront accesses S3 via Origin Access Identity
- GEMINI_API_KEY embedded in browser bundle (known risk, accepted for Phase 1)
- IAM user for GitHub Actions should have minimal permissions
- Future enhancement: Lambda + API Gateway proxy for Gemini API

### File Structure
```
Portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── infrastructure/
│   ├── cloudformation/
│   │   ├── portfolio-infrastructure.yaml
│   │   └── parameters.json
│   ├── scripts/
│   │   └── deploy-infrastructure.sh
│   └── README.md
├── .env.production (template)
└── aws-hosting-setup.feature.md
```

### Cost Estimation (eu-west-3, low traffic)
- S3 storage: ~$0.02/month (<1GB)
- S3 requests: ~$0.01/month
- CloudFront data transfer: $0.085/GB + $0.01/10k requests
- **Estimated Total**: $1-5/month for typical portfolio traffic

### Future Enhancements (Out of Scope)
- Custom domain with Route53 + ACM certificate
- Lambda + API Gateway for secure Gemini API proxy
- CloudWatch dashboards and alarms
- WAF for DDoS protection
- Multi-environment setup (dev/staging/prod)
- Automated CloudFormation drift detection

### References
- CloudFormation S3: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html
- CloudFormation CloudFront: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-distribution.html
- GitHub Actions AWS: https://github.com/aws-actions
- Vite Build Guide: https://vitejs.dev/guide/build.html
