from flask import request, jsonify
from meep import *
# from .utils import *

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

@app.route('/api/register', methods=["POST"])
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

@app.route('/api/docs/<int:doc_id>', methods=["GET"])
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
    user_id = int(request.json.get("user_id"))

    if userHasPerms(user_id):
        if doc_id == "new":
            doc_title = request.json.get("title")

            user = getUserFromID(user_id)
            globals()[doc_title] = Document(doc_title, user)

            return jsonify(createDocFromObj(globals()[doc_title]))
    else:
        return jsonify({"message" : "Insufficient permissions"}), 401

@app.route('/api/docs/<int:doc_id>/rename', methods=["POST"])
def rename_doc(doc_id):
    newTitle = request.json.get("title")
    docObj = getDocFromID(doc_id)
    if docObj:
        docObj._documentName = newTitle
        return jsonify({"message" : "Successful rename"})
    else:
        print(allDocuments[0]._id);
        return jsonify({"message" : "doc_id not found"}), 403

@app.route('/api/taboos', methods=["POST"])
def suggest_taboo():
    submitData = request.json;
    suggestedTaboo = submitData.get("suggestedTaboo")
    username = submitData.get("username")
    print(username)
    # ADD: CALL A UTILS UTILS TO CALL A CORE FUNCTION TO SUGGEST TABOO
    return jsonify({"message" : "Request Sent"})

@app.route('/api/taboos', methods=['GET'])
def get_taboo():
    data = requestTaboos()
    return jsonify(data)

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
