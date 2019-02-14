CIRCLE_BUILD_NUM ?= 0
TAG ?= 0.0.$(CIRCLE_BUILD_NUM)-$(shell git rev-parse --short HEAD)
REGISTRY_ID ?= 485758728177
REPOSITORY_REGION ?= eu-central-1
REPO_NAME = $(REGISTRY_ID).dkr.ecr.$(REPOSITORY_REGION).amazonaws.com/maf-poc

.PHONY: run
run:
	docker-compose up --build

.PHONY: test
test: lint test-unit run test-integration

.PHONY: docker-build-push
docker-build-push:
	eval $$(aws ecr get-login --registry-id $(REGISTRY_ID) --region $(REPOSITORY_REGION) --no-include-email)
	docker build -t $(REPO_NAME)/db:$(TAG) -f docker/Dockerfile.db .
	docker build -t $(REPO_NAME)/api:$(TAG) -f docker/Dockerfile.api .
	docker build -t $(REPO_NAME)/static:$(TAG) -f docker/Dockerfile.static --build-arg API_ROOT=$$API_ROOT .
	docker push $(REPO_NAME)/db:$(TAG)
	docker push $(REPO_NAME)/api:$(TAG)
	docker push $(REPO_NAME)/static:$(TAG)

.PHONY: install
install:
	$(MAKE) -C backend install
	$(MAKE) -C frontend install

.PHONY: test-unit
test-unit:
	$(MAKE) -C backend test
	$(MAKE) -C frontend test

.PHONY: test-integration
test-integration:
	$(MAKE) -C integration-tests

.PHONY: lint
lint:
	$(MAKE) -C backend lint
	$(MAKE) -C frontend lint

.PHONY: coverage
coverage:
	$(MAKE) -C backend test coverage
	$(MAKE) -C frontend test coverage

.PHONY: clean
clean:
	$(MAKE) -C backend clean
	$(MAKE) -C frontend clean
