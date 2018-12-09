import os
from .core import *

def createUserFromObj(userObj):
    return {
        'id': userObj._id,
        'name': userObj._username,
        'type': str.lower(userObj._membership),
        'pic': "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
    }

def createDocFromObj(doc):
    return {
        "doc_id" : doc._id,
        "title" : doc._documentName,
        "owner" : doc._owner,
        "locked": doc._lock,
        "lockedBy": doc._lockedBy,
        "words" : doc._documentBody
    }

def getUserFromID(id):
    for user in allUsers:
        if user._id == id:
            return user
    return False

def getDocFromID(id):
    for doc in allDocuments:
        if doc._id == id:
            return doc
    return False

def checkUserExists(username):
    try:
        if globals()[username] in allUsers:
            return True
    except:
        return False

def validateUserLogin(username, password):
    if checkUserExists(username):
        if allUsers[allUsers.index(globals()[username])]._password == password:
            return allUsers[allUsers.index(globals()[username])];
    else:
        return False

def validateRegistration(username, password):
    # confirm username doesn't already exist
    if checkUserExists(username):  # username exists
        return False
                                  # username does not exist
    globals()[username] = GuestUser(username, password)
    saveUsers()

    return globals()[username]

def requestpromotion(username, firstName, lastName, interests):
    # check if form is completed
    if (not interests) or (not firstName) or (not lastName) :
        return False
    else:
        globals()[username].applyToOrdinary([firstName, lastName], interests)
    return True
