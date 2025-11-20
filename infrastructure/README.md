# Portfolio AWS Infrastructure

AWS hosting infrastructure for React/Vite portfolio using S3 + CloudFront.

## Architecture

```
GitHub Actions (Deploy trigger)
           ↓
    npm run build
           ↓
    AWS CLI: S3 sync
           ↓
    S3 Bucket (Private)
           ↓
    CloudFront Distribution (CDN + HTTPS)
           ↓
    CloudFront Invalidation (/*) 
           ↓
    User: https://cloudfront-domain.net
```

### Components
- **S3 Bucket**: Private storage for built portfolio files
- **CloudFront OAI**: Origin Access Identity (S3 access only)
- **CloudFront Distribution**: CDN with HTTPS, SPA routing, caching
- **CloudFront Logs**: Bucket for access logs
- **GitHub Actions**: CI/CD automation

## Initial Deployment

### Prerequisites
- AWS CLI v2 installed & configured
- AWS account with eu-west-3 region access
- IAM user with CloudFormation permissions
- AWS credentials in shell (`aws configure` or environment variables)

### Manual Deployment

1. **Authenticate to AWS**:
   ```bash
   aws sso login --profile your-profile
   # OR
   export AWS_ACCESS_KEY_ID=xxx
   export AWS_SECRET_ACCESS_KEY=xxx
   export AWS_DEFAULT_REGION=eu-west-3
   ```

2. **Validate template**:
   ```bash
   aws cloudformation validate-template \
     --template-body file://infrastructure/cloudformation/portfolio-infrastructure.yaml \
     --region eu-west-3
   ```

3. **Deploy stack**:
   ```bash
   bash infrastructure/scripts/deploy-infrastructure.sh
   ```

4. **Get outputs** (bucket name, CloudFront URL, distribution ID):
   ```bash
   aws cloudformation describe-stacks \
     --stack-name portfolio \
     --region eu-west-3 \
     --query 'Stacks[0].Outputs' \
     --output table
   ```

### Automated Deployment (GitHub Actions)
See Phase 2: GitHub Actions CI/CD Pipeline

## CloudFormation Stack Management

### View stack status
```bash
aws cloudformation describe-stacks \
  --stack-name portfolio \
  --region eu-west-3 \
  --query 'Stacks[0].[StackStatus,CreationTime]' \
  --output table
```

### View stack resources
```bash
aws cloudformation list-stack-resources \
  --stack-name portfolio \
  --region eu-west-3 \
  --output table
```

### View stack events (troubleshooting)
```bash
aws cloudformation describe-stack-events \
  --stack-name portfolio \
  --region eu-west-3 \
  --query 'StackEvents[].[Timestamp,ResourceStatus,ResourceType,LogicalResourceId,ResourceStatusReason]' \
  --output table | head -20
```

## Manual S3 Sync (One-time or testing)

After CloudFormation creates resources:

```bash
# Get bucket name from outputs
BUCKET=$(aws cloudformation describe-stacks \
  --stack-name portfolio \
  --region eu-west-3 \
  --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' \
  --output text)

# Sync build output to S3
aws s3 sync dist/ s3://$BUCKET \
  --region eu-west-3 \
  --delete \
  --cache-control 'max-age=3600' \
  --exclude '.gitkeep'
```

## CloudFront Cache Invalidation

After deploying new files, invalidate CloudFront cache:

```bash
# Get distribution ID from outputs
DIST_ID=$(aws cloudformation describe-stacks \
  --stack-name portfolio \
  --region eu-west-3 \
  --query 'Stacks[0].Outputs[?OutputKey==`DistributionID`].OutputValue' \
  --output text)

# Invalidate all files
aws cloudfront create-invalidation \
  --distribution-id $DIST_ID \
  --paths '/*' \
  --region eu-west-3
```

## Rollback / Stack Deletion

### Rollback to previous stack version
```bash
# CloudFormation tracks stack history; to rollback:
aws cloudformation continue-update-rollback \
  --stack-name portfolio \
  --region eu-west-3
```

### Delete entire stack (⚠️ Destructive)
```bash
# First, empty S3 bucket
BUCKET=$(aws cloudformation describe-stacks \
  --stack-name portfolio \
  --region eu-west-3 \
  --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' \
  --output text)

aws s3 rm s3://$BUCKET --recursive --region eu-west-3

# Then delete stack
aws cloudformation delete-stack \
  --stack-name portfolio \
  --region eu-west-3

# Monitor deletion
aws cloudformation wait stack-delete-complete \
  --stack-name portfolio \
  --region eu-west-3
```

## IAM Permissions for GitHub Actions

GitHub Actions user needs minimal permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::portfolio-hosting-*",
        "arn:aws:s3:::portfolio-hosting-*/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::920373033350:distribution/*"
    }
  ]
}
```

## Troubleshooting

### Stack creation failed
- Check CloudFormation events: `aws cloudformation describe-stack-events --stack-name portfolio`
- Verify AWS credentials and region: `aws sts get-caller-identity`
- Ensure bucket name is globally unique (append random suffix if needed)

### CloudFront showing 403 Forbidden
- Verify S3 bucket policy allows OAI access
- Check CloudFront distribution origin points to S3 bucket
- Ensure files uploaded to bucket with correct permissions

### SPA routing not working (404 on refresh)
- Verify custom error response in CloudFront (404→index.html)
- Check distribution is deployed (can take 5-10 mins)
- Clear browser cache or test in incognito

### High cache hit ratio
- Monitor CloudFront cache stats: `aws cloudfront get-distribution-statistics --distribution-id $DIST_ID`
- Ensure cache behaviors configured with appropriate TTL values
- For static assets (js/css), use longer TTL (31536000 = 1 year)

## Cost Estimation (eu-west-3, low traffic)

| Component | Estimate |
|-----------|----------|
| S3 storage (<1GB) | $0.02/month |
| S3 requests | $0.01/month |
| CloudFront data transfer | $0.085/GB + request fees |
| CloudFront cache invalidations | ~$0.005/month (5 invalidations) |
| **Total** | **$1-5/month** |

## Resources

- [CloudFormation S3 Bucket](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html)
- [CloudFormation CloudFront](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-distribution.html)
- [CloudFront Origin Access Identity](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)
- [CloudFront SPA Routing](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/custom-error-pages.html)
- [AWS CLI CloudFormation](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/)
