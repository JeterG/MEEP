from flask import request, jsonify
from meep import app
from .core import *
from .utils import *

@app.route('/api/login', methods=["POST"])
def login():
    submitData = request.json;
    username = submitData.get("username")
    password = submitData.get("password")
    if validateUserLogin(username, password):
        data = {'message': 'successful login'}
        return jsonify(data)
    else:
        data = {'message': 'login failed'}
        return jsonify(data), 403

@app.route('/api/register', methods=["post"])
def post():
    submitData = request.json;
    username = submitData.get("username")
    password = submitData.get("password")
    interests = submitData.get("interests")

    return jsonify({"message" : validateRegistration(username, password, interests)}) #hmm...

@app.route('/api/users', methods=["GET"])
def users():
    returnUsers = []

    for user in allUsers:
        userData = {
            "id" : user._id,
            "name": user._username,
            "type": user._membership
        }
        returnUsers.append(userData)

    return jsonify(returnUsers)

@app.route('/api/documents', methods=["GET"])
def documents():
    # Return list of all public documents
    returnDocs = []

    for doc in allDocuments:
        # Map object properties to a Python dictionary for JSON conversion
        docData = {
            "doc_id" : "",
            "doc_title" : doc._documentName,
            "doc_owner" : doc._owner
        }
        returnDocs.append(docData)

    return jsonify(returnDocs);

@app.route('/api/doc/:doc_id', methods=["GET"])
def get_doc():
    # Retrieve a specific document from the server
    return jsonify("Your document here")

@app.route('/api/doc/:doc_id', methods=["POST"])
def post_doc():
    # Save a specific document to the server
    return jsonify("placeholder")

@app.route('/api/OU_application', methods=['POST'])
def OUapp():
    submitData = request.json;
    firstName = submitData.get("firstName")
    lastName = submitData.get("lastName")
    interests = submitData.get("interests")
    userid = submitData.get("userid")
    membership = submitData.get("type")

    #check if membership == GUEST
    #then globals()[username].applyToOrdinary([firstName, lastName], interests)
    return jsonify({"message":"Request Submitted"})
