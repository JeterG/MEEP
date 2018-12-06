import os
import pickle
from .core import *

def checkUserExists(username):
    cwd = os.getcwd()
    userfile = cwd + "/meep/system/users" # assuming "users" is going to be the name of the object file containing user objects

    usermap = pickle.load( open(userfile, "rb") ) # load the objects from userfile into usermap--allUsers

    for xi in usermap:
        if xi._username == username:
            return True
    return False

def validateUserLogin(username, password):
    cwd = os.getcwd()
    userfile = cwd + "/meep/system/users" # assuming "users" is going to be the name of the object file containing user objects

    usermap = pickle.load( open(userfile, "rb") ) # load the objects from userfile into usermap--allUsers

    for xi in usermap:
        if xi._username == username:
            if xi_password == password:
                return True
            else:
                return False
    return False
