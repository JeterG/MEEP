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
    # open: for everyone to view, for everyone to edit
    # restricted: guests view, ordinary edit
    # shared: view and edit by ppl w/ access
    # private: view and only by owner and superuser
    # UNCLEAR INSTRUCTIONS. ASK PROFESSOR TO CLARIFY.
    openDocs = searchDocumentByPrivacy(0)
    print(openDocs)
    # Map object properties to a Python dictionary for JSON conversion
    for doc in openDocs:
        docData = createDocFromObj(doc)
        returnDocs.append(docData)
    print(returnDocs)
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

            # allDocuments.append(globals()[doc_title])
            saveDocuments()
            return jsonify(createDocFromObj(globals()[doc_title]))
        else:
            doc_id = int(doc_id)
            doc_body = request.json.get("body")
            doc = getDocFromID(doc_id)
            if doc:
                doc._documentBody = doc_body
                return jsonify({"message" : "Successful body save"})
            else:
                return jsonify({"message" : "Invalid ID"}), 403
    else:
        return jsonify({"message" : "Insufficient permissions"}), 401

@app.route('/api/docs/<int:doc_id>/unlock', methods=["POST"])
def unlockDoc(doc_id):
    user_id = int(request.json["user_id"])
    doc = getDocFromID(doc_id)
    if userHasPerms(user_id):
        if doc:
            user = getUserFromID(user_id)
            doc.unlockDocument(user)
            return jsonify({"locked" : False})
        else:
            return jsonify({"message" : "Invalid doc ID"}), 403
    else:
        return jsonify({"message" : "Insufficient permissions"}), 401

@app.route('/api/docs/<int:doc_id>/lock', methods=["POST"])
def lockDoc(doc_id):
    user_id = int(request.json["user_id"])
    doc = getDocFromID(doc_id)
    print("INSIDE LOCK", user_id, doc_id, doc)
    if userHasPerms(user_id):
        if doc:
            user = getUserFromID(user_id)
            doc.lockDocument(user)
            return jsonify({"locked" : True, "lockedBy" : user._username})
        else:
            return jsonify({"message" : "Invalid doc ID"}), 403
    else:
        return jsonify({"message" : "Insufficient permissions"}), 401

@app.route('/api/docs/<int:doc_id>/invite', methods=["POST"])
def inviteUser(doc_id):
    owner_id = int(request.json["owner_id"])
    user_id = int(request.json["user_id"])
    return True

@app.route('/api/docs/<int:doc_id>/addLine', methods=["POST"])
def addLine(doc_id):
    user_id = int(request.json["user_id"])
    word = request.json["content"]
    if userHasPerms(user_id):
        user = getUserFromID(user_id)
        doc = getDocFromID(doc_id)
        if doc:
            doc.add(word, user)
            return jsonify({"message" : "Successful add to doc"})
        else:
            return jsonify({"message" : "Invalid ID"}), 403
    else:
        return jsonify({"message" : "Insufficient permissions"}), 401

@app.route('/api/docs/<int:doc_id>/deleteLine', methods=["POST"])
def deleteLine(doc_id):
    user_id = int(request.json["user_id"])
    index = int(request.json["index"])
    if userHasPerms(user_id):
        user = getUserFromID(user_id)
        doc = getDocFromID(doc_id)
        if doc:
            doc.delete(index, user)
            return jsonify({"message" : "Successful delete from doc"})
        else:
            return jsonify({"message" : "Invalid ID"}), 403
    else:
        return jsonify({"message" : "Insufficient permissions"}), 401

@app.route('/api/docs/<int:doc_id>/updateLine', methods=["POST"])
def updateLine(doc_id):
    user_id = int(request.json.get("user_id"))
    index = int(request.json.get("index"))
    word = request.json.get("content")

    print("UPDATE LINE", doc_id, user_id, index, word)

    if userHasPerms(user_id):
        user = getUserFromID(user_id)
        doc = getDocFromID(doc_id)
        if doc:
            doc.update(user, index, word)
            return jsonify({"message" : "Successful update doc"})
        else:
            return jsonify({"message" : "Invalid ID"}), 403
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
        # print(allDocuments[0]._id);
        return jsonify({"message" : "doc_id not found"}), 403

@app.route('/api/docs/<int:doc_id>/setPrivacy', methods=["POST"])
def set_privacy(doc_id):
    # Save a specific document to the server
    user_id = int(request.json.get("user_id"))
    privacy = int(request.json.get("privacy"))

    if userHasPerms(user_id):
        docObj = getDocFromID(doc_id)
        if docObj:
            user = getUserFromID(user_id)
            docObj.setPrivacy(user, privacy)
            return jsonify({"message" : "Successful set privacy"})
        else:
            # print(allDocuments[0]._id);
            return jsonify({"message" : "doc_id not found"}), 403
    else:
        return jsonify({"message" : "Insufficient permissions"}), 401

@app.route('/api/taboos', methods=["POST"])
def suggest_taboo():
    submitData = request.json;
    suggestedTaboo = submitData.get("suggestedTaboo")
    result = suggestTaboos(suggestedTaboo)
    if result:
        data = {'message' : 'Request Submitted'}
        return jsonify(data), 200
    else:
        data = {'message' : 'Submit Something'}
        return jsonify(data), 403

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
        data = {message : 'Request Submitted'}
        return jsonify(data), 200
    else:
        data = {message : 'Complete the Form'}
        return jsonify(data), 403
