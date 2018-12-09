# MEEP
The Multiuser Engagement Editing Program

## Software Engineering (CSC-322)
Team Members:
* John Arena
* Jeter Gutierrez
* Kelly Lu
* Alexander Matson

## Application Architecture
The application will be a set of REST APIs implemented in Python/Flask on the backend.
The backend will handle all application logic, data management, user permissions, etc.

The APIs will transmit JSON-encoded responses.

The frontend will be a ReactJS application that interfaces with the backend by performing HTTP
calls on the API. If this proves to be too much work, we can fall back to building a vanilla JavaScript/HTML
frontend which would probably be easier.

## Backend
Backend is a Python3 Flask project, configured in a virtual environment. On Linux/MacOS,
go inside the `backend/` directory and execute `source env/bin/activate` to enable the
Python environment.

Then, set up the Flask environment variables.

```
export FLASK_APP="meep"
export FLASK_ENV="development"
```

Finally, start the Python server with `flask run`.
## Frontend
Frontend is a React project. Install and configure NodeJS on your system, then in a terminal, navigate to the frontend folder.

Perform `npm install` to install the dependencies, and then run `npm start` to run a local development server for the React app. It will be listening on `localhost:8090`, so navigate there in the browser.

Webpack will take the contents of `app/index.jsx` and compile them to `public/bundle.js`. The webpack dev server is installed with a hot-reloading plugin. Every time you modify the "index.jsx" file, the webpage will automatically reload with your changes.
