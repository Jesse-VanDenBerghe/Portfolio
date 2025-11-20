## Feature: Custom Domain with Route53

**Branch**: feature/custom-domain-route53  
**Created**: November 20, 2025  
**Author**: GitHub Copilot  
**Jira**: N/A

## Overview
Add custom domain support to portfolio using AWS Route53 for domain registration and DNS management, replacing CloudFront default URL with branded domain.

## Problem Statement
Portfolio currently uses CloudFront's auto-generated domain (e.g., `d123abc.cloudfront.net`), which:
- Looks unprofessional
- Hard to remember/share
- No brand recognition
- Can't customize for SEO

Need custom domain (e.g., `jessevandenberghe.dev`) with HTTPS for professional portfolio presence.

## Solution
Integrate Route53 domain registration and DNS with existing CloudFormation infrastructure:
- Register domain via Route53
- Auto-provision SSL cert via ACM
- Configure CloudFront with custom domain alias
- Set up Route53 DNS records pointing to CloudFront
- Make domain optional (backwards compatible)

## Implementation Plan

### Phase 1: Domain Research & Purchase
**Goal**: Find and register domain through Route53

- [x] Open Route53 console and search available domains
- [x] Compare pricing for different TLDs (.com, .dev, .io, .me, .tech)
- [x] Select domain and complete purchase through Route53
- [x] Verify domain registration initiated
- [x] Wait for registration confirmation (15min - 3 days depending on TLD)
- [x] Verify hosted zone auto-created in Route53

**Deliverable**: Registered domain in Route53 with hosted zone

---

### Phase 2: Infrastructure Updates
**Goal**: Update CloudFormation to support custom domain

- [x] Add `DomainName` parameter (optional, default empty)
- [x] Add `HasDomain` condition for conditional resources
- [x] Create ACM Certificate resource (us-east-1, DNS validation)
- [x] Update CloudFront distribution config:
  - [x] Add `Aliases` with domain name
  - [x] Update `ViewerCertificate` to use ACM cert
  - [x] Set `SslSupportMethod: sni-only`
  - [x] Set `MinimumProtocolVersion: TLSv1.2_2021`
- [x] Create Route53 A record (IPv4 alias to CloudFront)
- [x] Create Route53 AAAA record (IPv6 alias to CloudFront)
- [x] Add outputs for certificate ARN and validation records
- [x] Update parameters.json with domain (once purchased)
- [x] Test template validation locally

**Deliverable**: Updated CloudFormation template with domain support

---

### Phase 3: Certificate Validation
**Goal**: Deploy stack and validate SSL certificate

- [x] Deploy updated CloudFormation stack with domain parameter
- [x] Monitor stack creation (expect CREATE_IN_PROGRESS for cert)
- [x] Check ACM console for certificate status
- [x] Verify DNS validation records auto-created in Route53
- [x] Wait for certificate validation (5-30 minutes)
- [x] Verify certificate status shows "Issued"
- [x] Confirm stack reaches CREATE_COMPLETE

**Deliverable**: Valid SSL certificate for custom domain

---

### Phase 4: DNS Configuration & Testing
**Goal**: Verify domain resolves and portfolio works

- [x] Check Route53 A/AAAA records created correctly
- [x] Test DNS resolution: `dig +short yourdomain.com`
- [x] Wait for DNS propagation if needed (usually <30min)
- [x] Test HTTPS in browser: `https://yourdomain.com`
- [x] Verify certificate valid (no warnings)
- [ ] Test SPA routing (refresh on different routes)
- [ ] Test asset loading (images, fonts, JS bundles)
- [x] Verify CloudFront caching headers
- [x] Confirm old CloudFront URL still works
- [ ] Test on multiple browsers/devices
- [ ] Update README.md with new domain
- [ ] Update any hardcoded URLs in code (if any)

**Deliverable**: Live portfolio on custom domain with HTTPS

---

### Phase 5: Optional Subdomain Setup (www)
**Goal**: Configure www subdomain with redirect

- [ ] Decide: www → root or root → www redirect
- [ ] Option A: Add www as additional alias to CloudFront
  - [ ] Update CloudFront `Aliases` to include www subdomain
  - [ ] Update ACM certificate to cover `*.yourdomain.com`
  - [ ] Create Route53 CNAME for www → root
- [ ] Option B: Create S3 redirect bucket for www → root
  - [ ] Create S3 bucket for www redirect
  - [ ] Configure static website hosting with redirect
  - [ ] Create Route53 record for www → S3
- [ ] Test www subdomain access
- [ ] Test redirect behavior
- [ ] Update documentation

**Deliverable**: www subdomain configured (optional)

---

## Acceptance Criteria

- [x] Domain successfully registered in Route53
- [x] SSL certificate issued and valid (green lock in browser)
- [x] Portfolio accessible via `https://yourdomain.com`
- [x] HTTPS enforced (HTTP redirects to HTTPS)
- [ ] SPA routing works (no 404s on page refresh)
- [ ] All assets load correctly via custom domain
- [x] CloudFront caching behavior unchanged
- [x] Old CloudFront URL still functional
- [x] DNS propagation complete (resolves globally)
- [x] CloudFormation template backwards compatible (domain optional)
- [ ] Documentation updated with domain info
- [ ] No errors in browser console
- [x] No increase in AWS costs beyond domain registration

---

## Side Notes

**Cost Breakdown**:
- Domain registration: $12-$50/year (depends on TLD)
- Route53 hosted zone: $0.50/month
- ACM certificate: Free
- CloudFront: No additional cost
- **Total new cost**: ~$18-$56/year

**Important**:
- ACM cert MUST be in us-east-1 for CloudFront (even if stack in eu-west-3)
- DNS propagation can take 2-48 hours (usually <30min)
- Domain registration can take 15min - 3 days depending on TLD
- Keep domain parameter optional for backwards compatibility
- Route53 auto-creates hosted zone on domain purchase

**Resources**:
- [Route53 Domain Pricing](https://d32ze2gidvkk54.cloudfront.net/Amazon_Route_53_Domain_Registration_Pricing_20140731.pdf)
- [CloudFront Custom Domains](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/CNAMEs.html)
- [ACM DNS Validation](https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html)

**Rollback Plan**:
- Update stack with empty `DomainName` parameter → reverts to CloudFront default
- Delete Route53 records if needed
- Domain registration non-refundable (keep for future use)
