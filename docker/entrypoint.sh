#!/bin/sh

if [ -z "$@" ]; then
  # exec python /app/migrations.py
  exec gunicorn -k egg:meinheld#gunicorn_worker -c /gunicorn_conf.py "app.run:app"
else
  exec "$@"
fi
