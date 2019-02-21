## Quickstart

In this (`backend`) directory, run `make install` to initialize dev environment.

Now you can run `make` to start the dev server, accessible on http://localhost:8080. Use `apiuser`:`apipass` to log in.

This will require a running database, the easiest way to get one is to run `docker-compose up postgres` in the root of the checkout.


## Development

Please make sure to run `make lint test` to run all the tests prior to committing your changeset.

Use `poetry add <dep>` to install dependencies. For a more complete reference, refer to https://github.com/sdispater/poetry
