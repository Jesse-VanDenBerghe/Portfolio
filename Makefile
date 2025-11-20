.PHONY: help deploy-infra sync-s3 build preview dev clean validate-workflow

help:
	@echo "Portfolio Makefile Commands"
	@echo ""
	@echo "Infrastructure:"
	@echo "  make deploy-infra       Deploy CloudFormation stack to AWS"
	@echo "  make sync-s3            Sync dist/ to S3 and invalidate CloudFront cache"
	@echo ""
	@echo "Build & Run:"
	@echo "  make build              Build production bundle (npm run build)"
	@echo "  make preview            Preview production build locally (npm run preview)"
	@echo "  make dev                Start dev server (npm run dev)"
	@echo ""
	@echo "Cleanup:"
	@echo "  make clean              Remove dist/ build directory"

deploy-infra:
	@bash infrastructure/scripts/deploy-infrastructure.sh

sync-s3:
	@bash infrastructure/scripts/sync-s3.sh

build:
	npm run build

preview:
	npm run preview

dev:
	npm run dev

clean:
	rm -rf dist/
	@echo "Cleaned dist/"
