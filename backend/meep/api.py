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
    submitData = request.json;
    username = submitData.get("username")
    password = submitData.get("password")

    return validateUserLogin(username, password) # return either true or false
                                          # if false... try again + give option of creating account as a guest user?
    # return jsonify(Doc1._documentName);

@app.route('/api/register', methods=["post"])
def post():
    submitData = request.json;
    username = submitData.get("username")
    password = submitData.get("password")
    interests = submitData.get("interests")

    return validateRegistration(username, password, interests) #hmm...
