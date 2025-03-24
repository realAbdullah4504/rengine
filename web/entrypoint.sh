#!/bin/bash

export DEBUG=1

# Run migrations
python3 manage.py migrate

# Start the server with debugpy
# python3 -m debugpy --listen 0.0.0.0:5678 --wait-for-client manage.py runserver 0.0.0.0:8000
python3 manage.py runserver 0.0.0.0:8000

exec "$@"
