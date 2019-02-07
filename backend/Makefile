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
	poetry run pytest tests

.PHONY: clean
clean:
	@echo clean
