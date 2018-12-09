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
        return jsonify(data)
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

@app.route('/api/docs', methods=["GET"])
def documents():
    # Return list of all public documents
    returnDocs = []

    for doc in allDocuments:
        # Map object properties to a Python dictionary for JSON conversion
        docData = createDocFromObj(doc)
        returnDocs.append(docData)

    return jsonify(returnDocs);

@app.route('/api/docs/<doc_id>', methods=["GET"])
def get_doc(doc_id):
    # Retrieve a specific document from the server
    doc = getDocFromID(int(doc_id))
    print(doc, doc_id, int(doc_id))
    if doc:
        return jsonify(createDocFromObj(doc))
    else:
        return jsonify({"message" : "Invalid document ID"}), 403

@app.route('/api/docs/<doc_id>', methods=["POST"])
def post_doc(doc_id):
    # Save a specific document to the server
    if doc_id == "new":
        doc_title = request.json.get("title")
        user_id = request.json.get("user_id")

        user = getUserFromID(user_id)
        globals()[doc_title] = Document(doc_title, user)

        return jsonify(createDocFromObj(globals()[doc_title]))

    return jsonify("placeholder")

@app.route('/api/apply', methods=['POST'])
def OUapp():
    submitData = request.json;
    firstName = submitData.get("firstName")
    lastName = submitData.get("lastName")
    interests = submitData.get("interests")
    username = submitData.get("username")
    result = requestpromotion(username, firstName, lastName, interests)
    if result:
        data = {'message' : 'Request Submitted'}
        return jsonify(data), 200
    else:
        data = {'message' : 'Complete the Form'}
        return jsonify(data), 403
