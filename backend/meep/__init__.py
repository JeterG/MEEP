import os

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config.from_mapping(
    SECRET_KEY='dev',
)

# ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

import meep.api
