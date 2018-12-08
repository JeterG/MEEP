import os
from .core import *

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
            return True
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
