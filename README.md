[![codecov](https://codecov.io/gh/yyunak/maf-poc/branch/develop/graph/badge.svg?token=zqgE0hFfqt)](https://codecov.io/gh/yyunak/maf-poc)
[![CircleCI](https://circleci.com/gh/yyunak/maf-poc.svg?style=svg&circle-token=4467efdb00e92f9f48eabeb488e9427ec4a6a6d5)](https://circleci.com/gh/yyunak/maf-poc)
[![BCH compliance](https://bettercodehub.com/edge/badge/yyunak/maf-poc?branch=develop&token=5bc8f0b84daf442332f5b82f1de9c067e279e379)](https://bettercodehub.com/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/816d9d2a2214443b88926c455216a678)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=yyunak/maf-poc&amp;utm_campaign=Badge_Grade)

To bring up the application locally, run `make`. You will need `docker-compose` first.

You should now be able to access frontend on http://localhost:8888/. API Swagger is on http://localhost:8080/v1/docs/. Use `apiuser`:`apipass` to log in to both.

AWS ECS endpoints deployed through CI:

| Container / branch |               develop               |               master               |
|--------------------|:-----------------------------------:|:----------------------------------:|
| ui                 | https://static-develop.maf.yunak.eu | https://static-master.maf.yunak.eu |
| api                | https://api-develop.maf.yunak.eu    | https://api-master.maf.yunak.eu    |

