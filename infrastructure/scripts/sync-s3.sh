#!/bin/bash

# Portfolio S3 Sync Script
# Syncs built portfolio files to S3 and invalidates CloudFront cache

set -e

STACK_NAME="portfolio"
REGION="${AWS_REGION:-eu-west-3}"
PROFILE="${AWS_PROFILE:-}"
DIST_DIR="dist"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Build AWS CLI args (profile optional for CI environments)
AWS_ARGS="--region $REGION"
if [ -n "$PROFILE" ]; then
    AWS_ARGS="$AWS_ARGS --profile $PROFILE"
fi

echo -e "${YELLOW}Portfolio S3 Sync${NC}"
echo "Stack: $STACK_NAME"
echo "Region: $REGION"
echo "Dist: $DIST_DIR"
echo ""

# Check if dist directory exists
if [ ! -d "$DIST_DIR" ]; then
    echo -e "${RED}Error: dist directory not found. Run 'npm run build' first${NC}"
    exit 1
fi

# Get bucket name from CloudFormation
echo -e "${YELLOW}Retrieving bucket name from CloudFormation...${NC}"
BUCKET=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    $AWS_ARGS \
    --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' \
    --output text 2>/dev/null)

if [ -z "$BUCKET" ]; then
    echo -e "${RED}Error: Could not retrieve bucket name. Stack may not exist.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Bucket: $BUCKET${NC}"

# Sync to S3
echo -e "${YELLOW}Syncing files to S3...${NC}"
aws s3 sync "$DIST_DIR/" "s3://$BUCKET" \
    $AWS_ARGS \
    --delete \
    --cache-control 'max-age=3600' \
    --exclude '.gitkeep'

echo -e "${GREEN}✓ S3 sync complete${NC}"

# Get distribution ID and invalidate cache
echo -e "${YELLOW}Invalidating CloudFront cache...${NC}"
DIST_ID=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    $AWS_ARGS \
    --query 'Stacks[0].Outputs[?OutputKey==`DistributionID`].OutputValue' \
    --output text 2>/dev/null)

if [ -z "$DIST_ID" ]; then
    echo -e "${YELLOW}⚠ Could not retrieve distribution ID. Skip cache invalidation.${NC}"
else
    INVALIDATION_ID=$(aws cloudfront create-invalidation \
        --distribution-id "$DIST_ID" \
        --paths '/*' \
        $AWS_ARGS \
        --query 'Invalidation.Id' \
        --output text)
    
    echo -e "${GREEN}✓ Cache invalidation initiated${NC}"
    echo "  Invalidation ID: $INVALIDATION_ID"
fi

echo ""
echo -e "${GREEN}✓ Deployment complete${NC}"
echo ""

# Get and display CloudFront URL
CLOUDFRONT_URL=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --profile "$PROFILE" \
    --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontURL`].OutputValue' \
    --output text 2>/dev/null)

if [ ! -z "$CLOUDFRONT_URL" ]; then
    echo "Portfolio accessible at:"
    echo "  ${GREEN}$CLOUDFRONT_URL${NC}"
fi
