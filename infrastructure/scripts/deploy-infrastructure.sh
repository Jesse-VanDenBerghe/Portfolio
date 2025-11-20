#!/bin/bash

# Portfolio CloudFormation Deployment Script
# Deploys S3 + CloudFront infrastructure to eu-west-3

set -e

STACK_NAME="portfolio"
REGION="${AWS_REGION:-eu-west-3}"
PROFILE="${AWS_PROFILE:-}"
TEMPLATE_FILE="infrastructure/cloudformation/portfolio-infrastructure.yaml"
PARAMETERS_FILE="infrastructure/cloudformation/parameters.json"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Portfolio CloudFormation Deployment${NC}"
echo "Stack: $STACK_NAME"
echo "Region: $REGION"
echo "Profile: ${PROFILE:-none (using environment credentials)}"
echo ""

# Build AWS CLI args (profile optional for CI environments)
AWS_ARGS="--region $REGION"
if [ -n "$PROFILE" ]; then
    AWS_ARGS="$AWS_ARGS --profile $PROFILE"
fi

# Check if template file exists
if [ ! -f "$TEMPLATE_FILE" ]; then
    echo -e "${RED}Error: Template file not found: $TEMPLATE_FILE${NC}"
    exit 1
fi

# Validate template
echo -e "${YELLOW}Validating CloudFormation template...${NC}"
echo "  Running: aws cloudformation validate-template"
if aws cloudformation validate-template \
    --template-body file://"$TEMPLATE_FILE" \
    --region "$REGION" \
    --profile "$PROFILE"; then
    echo -e "${GREEN}✓ Template validation passed${NC}"
else
    echo -e "${RED}✗ Template validation failed${NC}"
    exit 1
fi

# Check if stack exists
echo -e "${YELLOW}Checking if stack exists...${NC}"
echo "  Running: aws cloudformation describe-stacks --stack-name $STACK_NAME"
STACK_EXISTS=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    $AWS_ARGS \
    --query 'Stacks[0].StackStatus' \
    --output text 2>/dev/null || echo "DOES_NOT_EXIST")

if [ "$STACK_EXISTS" == "DOES_NOT_EXIST" ]; then
    # Create new stack
    echo -e "${YELLOW}Creating new CloudFormation stack...${NC}"
    echo "  Running: aws cloudformation create-stack --stack-name $STACK_NAME"
    STACK_ID=$(aws cloudformation create-stack \
        --stack-name "$STACK_NAME" \
        --template-body file://"$TEMPLATE_FILE" \
        --parameters file://"$PARAMETERS_FILE" \
        --capabilities CAPABILITY_NAMED_IAM \
        $AWS_ARGS \
        --tags Key=ManagedBy,Value=GitHubActions Key=Project,Value=Portfolio \
        --query 'StackId' \
        --output text)
    
    echo -e "${GREEN}✓ Stack creation initiated${NC}"
    echo "  Stack ID: $STACK_ID"
    
    # Wait for stack creation
    echo -e "${YELLOW}Waiting for stack creation to complete (this may take 5-10 minutes)...${NC}"
    aws cloudformation wait stack-create-complete \
        --stack-name "$STACK_NAME" \
        --region "$REGION" \
        --profile "$PROFILE"
    
    echo -e "${GREEN}✓ Stack created successfully${NC}"
else
    # Update existing stack
    echo -e "${YELLOW}Updating existing CloudFormation stack...${NC}"
    echo "  Current status: $STACK_EXISTS"
    echo "  Running: aws cloudformation update-stack --stack-name $STACK_NAME"
    aws cloudformation update-stack \
        --stack-name "$STACK_NAME" \
        --template-body file://"$TEMPLATE_FILE" \
        --parameters file://"$PARAMETERS_FILE" \
        --capabilities CAPABILITY_NAMED_IAM \
        $AWS_ARGS \
        --tags Key=ManagedBy,Value=GitHubActions Key=Project,Value=Portfolio 2>/dev/null || {
        echo -e "${YELLOW}⚠ No updates needed (template unchanged)${NC}"
    }
    
    echo -e "${GREEN}✓ Stack update initiated${NC}"
fi

# Get stack outputs
echo ""
echo -e "${YELLOW}Retrieving stack outputs...${NC}"
echo "  Running: aws cloudformation describe-stacks"
echo ""
aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    $AWS_ARGS \
    --query 'Stacks[0].Outputs[*].[OutputKey,OutputValue]' \
    --output table

echo ""
echo -e "${GREEN}✓ Deployment complete${NC}"
echo ""
echo "Next steps:"
echo "  1. Build: npm run build"
echo "  2. Deploy: aws s3 sync dist/ s3://\$(aws cloudformation describe-stacks --stack-name portfolio --region eu-west-3 --profile personal --query 'Stacks[0].Outputs[?OutputKey==\`BucketName\`].OutputValue' --output text)"
