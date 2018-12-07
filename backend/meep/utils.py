import os
# import pickle
from .core import *

def checkUserExists(username):
    # cwd = os.getcwd()
    # userfile = cwd + "/meep/system/users" # assuming "users" is going to be the name of the object file containing user objects
    #
    # usermap = pickle.load( open(userfile, "rb") ) # load the objects from userfile into usermap--allUsers
    #
    # for xi in usermap:
    #     if xi._username == username:
    #         return True
    # return False
    if globals()[username] in allUsers:
        return True
    return False

def validateUserLogin(username, password):
    # cwd = os.getcwd()
    # userfile = cwd + "/meep/system/users" # assuming "users" is going to be the name of the object file containing user objects
    #
    # usermap = pickle.load( open(userfile, "rb") ) # load the objects from userfile into usermap--allUsers
    #
    # for xi in usermap:
    #     if xi._username == username:
    #         if xi_password == password:
    #             return True
    #         else:
    #             return False
    # return False
    if allUsers[allUsers.index(globals()[username])]._password == password:
        return True
    return False

def validateRegistration(username, password, interests):
    # confirm username doesn't already exist
    if checkUserExists(username) == True:  # username exists
        print("Failed Registration")
        if allUsers[allUsers.index(globals()[username])]._membership == "GUEST": # username of guest user
            print("You are a Guest User. Apply for membership.")
        else:
            print("Username taken.")
        return False
    else:                                   # username does not exist
        username = OrdinaryUser(username, password, interests)
        print("Successful Registration")
        return True
