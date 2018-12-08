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
        "doc_title" : doc._documentName,
        "doc_owner" : doc._owner
    }

def checkUserExists(username):
    # cwd = os.getcwd()
    # userfile = cwd + "/meep/system/users" # assuming "users" is going to be the name of the object file containing user objects
    try:
        if globals()[username] in allUsers:
            return True
    except:
        return False
    # for users in allUsers:
    #     if users._username == username:
    #         return True
    # return False


def validateUserLogin(username, password):
    # cwd = os.getcwd()
    # userfile = cwd + "/meep/system/users"
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
    return True
