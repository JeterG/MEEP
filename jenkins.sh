#!/bin/bash

cd frontend/
/root/.nvm/versions/node/v11.3.0/lib/node_modules/npm run build

cp public/* /var/www/html/

cd ../backend
gunicorn --bind 0.0.0.0:5000 wsgi:app
