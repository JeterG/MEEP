# MEEP
The Multiuser Engagement Editing Program

## Software Engineering (CSC 322)
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
