import os

def checkUserExists(username):
    cwd = os.getcwd()
    path = cwd + "/meep/ugc/users/" + username + "/"
    return os.path.isdir(path)
