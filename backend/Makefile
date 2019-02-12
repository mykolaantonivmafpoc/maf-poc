.PHONY: run
run:
	FLASK_APP=api.main:app FLASK_ENV=development poetry run flask run

.PHONY: install
install:
	poetry install

.PHONY: lint
lint:
	poetry run flake8

.PHONY: test
test:
	poetry run pytest --cov=./ tests

.PHONY: coverage
coverage:
	poetry run bash -c 'bash <(curl -s https://codecov.io/bash) -t $$CODECOV_TOKEN -F backend'

.PHONY: clean
clean:
	rm -rf $(shell poetry config settings.virtualenvs.path)
	rm -rf *.egg-info
	rm -rf .pytest_cache
	rm -f .coverage coverage.xml
