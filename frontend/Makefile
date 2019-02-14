API_ROOT ?= http://localhost:8080

.PHONY: run
run:
	REACT_APP_API_ROOT=$(API_ROOT) npm start

.PHONY: build
build:
	REACT_APP_API_ROOT=$(API_ROOT) npm run build

.PHONY: install
install:
	npm ci

.PHONY: lint
lint:
	npm run test:lint:js
	npm run test:lint:css

.PHONY: test
test:
	CI=true npm run test:unit -- --coverage

.PHONY: coverage
coverage:
	bash -c 'bash <(curl -s https://codecov.io/bash) -c -t $$CODECOV_TOKEN -F frontend'

.PHONY: clean
clean:
	rm -rf node_modules
	rm -rf build
	rm -rf coverage
