#!/bin/sh

if [ -z "$@" ]; then
  exec gunicorn -k egg:meinheld#gunicorn_worker -c /gunicorn_conf.py "api.main:app"
else
  exec "$@"
fi
