import os

def checkUserExists(username):
    cwd = os.getcwd()
    userfile = cwd + "/meep/ugc/users/usermap.txt"

    usermap = open(userfile, "r")
    
    path = cwd + "/meep/ugc/users/" + username + "/"
    return os.path.isdir(path)
