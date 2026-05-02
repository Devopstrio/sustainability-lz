.PHONY: help build up down test lint migrate analyze-resources optimize-scheduling enforce-policies

help:
	@echo "Sustainability Landing Zone - Management Commands"
	@echo "-----------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Integration)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "analyze-resources  : Trigger sustainability resource analysis"
	@echo "optimize-scheduling: Run carbon-aware workload scheduler"
	@echo "enforce-policies   : Run sustainability policy compliance engine"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/unit tests/integration
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker core
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

analyze-resources:
	docker-compose exec api python scripts/analyze/run.py

optimize-scheduling:
	docker-compose exec api python scripts/schedule/run.py

enforce-policies:
	docker-compose exec api python scripts/optimize/policy.py
