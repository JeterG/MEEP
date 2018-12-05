from flask import request, jsonify
from meep import app
from .core import *
from .utils import *

# @app.route('/api/register', methods=["POST"])
# def register():
#     return jsonify("Hallo");

# Pickle should store objects in meep/system/ directory

@app.route('/api/login', methods=["POST"])
def login():
    print(request.json);

    return jsonify(Doc1._documentName);
