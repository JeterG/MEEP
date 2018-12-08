from flask import request, jsonify
from meep import app
from .utils import *


@app.route('/api/login', methods=["POST"])
def login():
    submitData = request.json;
    username = submitData.get("username")
    password = submitData.get("password")

    userObject = validateUserLogin(username, password)

    if userObject:
        data = createUserFromObj(userObject);
        return jsonify(data)
    else:
        data = {'message': 'login failed'}
        return jsonify(data), 403

@app.route('/api/register', methods=["post"])
def post():
    submitData = request.json;
    username = submitData.get("username")
    password = submitData.get("password")

    userObject = validateRegistration(username, password)
    print("the userObj is", userObject)

    if userObject:
        data = createUserFromObj(userObject)
        return jsonify(data), 200
    else:
        data = {'message' : 'registration failed'}
        return jsonify(data), 403

@app.route('/api/users', methods=["GET"])
def users():
    returnUsers = []

    for user in allUsers:
        userData = createUserFromObj(user)
        returnUsers.append(userData)

    return jsonify(returnUsers)

@app.route('/api/documents', methods=["GET"])
def documents():
    # Return list of all public documents
    returnDocs = []

    for doc in allDocuments:
        # Map object properties to a Python dictionary for JSON conversion
        docData = createDocFromObj(doc)
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

@app.route('/api/apply', methods=['POST'])
def OUapp():
    submitData = request.json;
    firstName = submitData.get("firstName")
    lastName = submitData.get("lastName")
    interests = submitData.get("interests")
    username = submitData.get("username")
    # print(username)
    result = requestpromotion(username, [firstName, lastName], interests)
    return jsonify({"message": result})
