.PHONY: run
run:
	npm start

.PHONY: build
build:
	npm run build

.PHONY: install
install:
	npm ci

.PHONY: lint
lint:
	npm run test:lint:js
	npm run test:lint:css

.PHONY: test
test:
	CI=true npm run test:unit

.PHONY: coverage
coverage:
	@echo codecov

.PHONY: clean
clean:
	rm -rf node_modules
	rm -rf build
