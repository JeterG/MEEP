#!/bin/bash

cd frontend/
/root/.nvm/versions/node/v11.3.0/bin/npm run build
cp public/* /var/www/html/

cd ../backend
killall screen
/usr/bin/screen -d -m /usr/bin/gunicorn --bind 0.0.0.0:5000 wsgi:app
