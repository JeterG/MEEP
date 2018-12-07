cd frontend/
npm install
npm run build
cp public/* /var/www/html/

cd ../backend
/usr/bin/gunicorn --bind 0.0.0.0:5000 wsgi:app
