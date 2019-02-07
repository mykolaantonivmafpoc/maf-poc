CIRCLE_BUILD_NUM ?= 0
TAG = 0.0.$(CIRCLE_BUILD_NUM)-$(shell git rev-parse --short HEAD)
REGISTRY_ID ?= 137007403666
REPOSITORY_REGION ?= eu-central-1
IMAGE_NAME = $(REGISTRY_ID).dkr.ecr.$(REPOSITORY_REGION).amazonaws.com/maf-poc

.PHONY: run
run:
	docker-compose up --build

.PHONY: docker-login
docker-login:
	eval $$(aws ecr get-login --registry-id $(REGISTRY_ID) --region $(REPOSITORY_REGION) --no-include-email)

.PHONY: build
build:
	docker build -t $(IMAGE_NAME)-api -f docker/Dockerfile.api .
#	docker build -t $(IMAGE_NAME)-static -f docker/Dockerfile.static .
#	docker build -t $(IMAGE_NAME)-db -f docker/Dockerfile.db .

.PHONY: test
test:
	$(MAKE) -C backend test
	$(MAKE) -C frontend test
	$(MAKE) -C integration-tests

.PHONY: lint
lint:
	$(MAKE) -C backend lint
	$(MAKE) -C frontend lint

.PHONY: clean
clean:
	$(MAKE) -C backend clean
	$(MAKE) -C frontend clean
