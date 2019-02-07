CIRCLE_BUILD_NUM ?= 0
TAG = 0.0.$(CIRCLE_BUILD_NUM)-$(shell git rev-parse --short HEAD)
REGISTRY_ID ?= 137007403666
REPOSITORY_REGION ?= eu-central-1
IMAGE_NAME = $(REGISTRY_ID).dkr.ecr.$(REPOSITORY_REGION).amazonaws.com/maf-poc

.PHONY: run
run:
	docker-compose up --build

.PHONY: test
test: lint test-unit run test-integration

.PHONY: docker-login
docker-login:
	eval $$(aws ecr get-login --registry-id $(REGISTRY_ID) --region $(REPOSITORY_REGION) --no-include-email)

.PHONY: docker-build
docker-build:
	docker build -t $(IMAGE_NAME)-api:$(TAG) -f docker/Dockerfile.api .
#	docker build -t $(IMAGE_NAME)-static:$(TAG) -f docker/Dockerfile.static .
#	docker build -t $(IMAGE_NAME)-db:$(TAG) -f docker/Dockerfile.db .

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

.PHONY: clean
clean:
	$(MAKE) -C backend clean
	$(MAKE) -C frontend clean
