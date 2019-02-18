#!/bin/sh

if [ -z "$@" ]; then
  exec gunicorn -c /gunicorn_conf.py "app.run:app"
else
  exec "$@"
fi
