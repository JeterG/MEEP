import os
# import pickle
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
    # userfile = cwd + "/meep/system/users" # assuming "users" is going to be the name of the object file containing user objects
    if checkUserExists(username):
        if allUsers[allUsers.index(globals()[username])]._password == password:
            return "Logged In"
    else:
        return "Login Failed"

def validateRegistration(username, password, interests):
    # confirm username doesn't already exist
    if checkUserExists(username) == True:  # username exists
        return "Username taken"
                                  # username does not exist
    globals()[username] = OrdinaryUser(username, password, interests)
    saveUsers()
    return "Successful Registration"
