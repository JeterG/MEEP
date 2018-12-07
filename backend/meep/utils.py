import os
from .core import *

def checkUserExists(username):
    if globals()[username] in allUsers:
        return True
    return False

def validateUserLogin(username, password):
    if allUsers[allUsers.index(globals()[username])]._password == password:
        return "OK"
    return "NO"

def validateRegistration(username, password, interests):
    # confirm username doesn't already exist
    if checkUserExists(username) == True:  # username exists
        print("Failed Registration")
        if allUsers[allUsers.index(globals()[username])]._membership == "GUEST": # username of guest user
            print("You are a Guest User. Apply for membership.")
        else:
            print("Username taken.")
        return "NO"
    else:                                   # username does not exist
        username = OrdinaryUser(username, password, interests)
        print("Successful Registration")
        return "OK"
