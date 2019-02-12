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
	CI=true npm run test:unit -- --coverage

.PHONY: coverage
coverage:
	bash -c 'bash <(curl -s https://codecov.io/bash) -c -t $$CODECOV_TOKEN -F frontend'

.PHONY: clean
clean:
	rm -rf node_modules
	rm -rf build
	rm -rf coverage
