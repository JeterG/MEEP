from flask import request, jsonify
from meep import app
from .core import *

@app.route('/api/register', methods=["POST"])
def register():
    return jsonify("Hallo");

@app.route('/api/login', methods=["POST"])
def login():
    print(request.json);
    return jsonify("Hello " + request.json['username']);
