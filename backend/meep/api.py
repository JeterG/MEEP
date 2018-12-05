from flask import request, jsonify
from meep import app
from .core import *
from .utils import *

# @app.route('/api/register', methods=["POST"])
# def register():
#     return jsonify("Hallo");

@app.route('/api/login', methods=["POST"])
def login():
    print(request.json);

    username = request.json["username"]

    if checkUserExists(username)

    return jsonify(checkUserExists(username));
