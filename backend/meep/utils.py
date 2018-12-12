import os
from meep import *
# from .core import *

def createUserFromObj(userObj):
    return {
        'id': userObj._id,
        'name': userObj._username,
        'type': str.lower(userObj._membership),
        'interests': userObj._interests,
        'pic': "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
    }

def createDocFromObj(doc):
    return {
        "doc_id" : doc._id,
        "title" : doc._documentName,
        "owner" : doc._owner,
        "locked": doc._lock,
        "lockedBy": doc._lockedBy,
        "privacy": doc._privacy,
        "words" : doc._documentBody
    }

def getUserFromID(id):
    print("getuser", allUsers);
    for user in allUsers:
        if user._id == id:
            return user
    return False

def getDocFromID(id):
    print("in gdfi", allDocuments)
    for doc in allDocuments:
        print('in gdgfi', doc._id, id, doc._id == id)
        if doc._id == id:
            print("The DOC is", doc);
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

    return globals()[username]

def editedDoc(username):
    sortedDocs = []
    # print(allDocuments[8]._versionHistory)
    for doc in allDocuments:
        foundTup = False
        for tuple in reversed(doc._versionHistory):
            # print(doc._id, tuple[3], tuple[4])
            if (tuple[3] == username) and (not foundTup):
                sortedDocs.append((doc._id, tuple[4]))
                foundTup = True
    sortedDocs = sorted(sortedDocs, key=lambda x: x[1])
    # print(sortedDocs)
    sortedDocs = sortedDocs[-3:]
    # print(sortedDocs)
    returnDocs = []
    for a in sortedDocs:
        b = getDocFromID(a[0])
        returnDocs.append(b)
    return returnDocs

# sorted(list of tuples, key=lambda x: x[1])

def viewableDoc(username, membership):
    '''
    # open: for everyone to view, for everyone to edit
    # restricted: guests view, ordinary & superuser edit
    # shared: view and edit by ppl w/ access & superuser
    # private: view and only by owner and superuser
    '''
    openDocs = searchDocumentByPrivacy(globals()[username],0)
    restrictedDocs = searchDocumentByPrivacy(globals()[username],1)
    # Return list of viewable documents
    returnDocs = [y for x in [openDocs, restrictedDocs] for y in x]
    if membership == "guest":
        return returnDocs
    elif membership == "super":
        sharedDocs = searchDocumentByPrivacy(globals()[username],2)
        privateDocs = searchDocumentByPrivacy(globals()[username],3)
        returnDocs = [y for x in [returnDocs, sharedDocs] for y in x]
        returnDocs = [y for x in [returnDocs, privateDocs] for y in x]
        return returnDocs
        # return allDocuments
    else: # ORDINARY
        contribDoc = contributorDoc(username)
        returnDocs = [y for x in [returnDocs, contribDoc] for y in x]
        return returnDocs

def contributorDoc(username):
    returnDocs = []
    for docs in searchDocumentByPrivacy(globals()[username],2):
        if username in docs._users:
            returnDocs.append(docs)
    for docs in searchDocumentByPrivacy(globals()[username],3):
        if username in docs._users:
            returnDocs.append(docs)
    return returnDocs

def mydocs(username, membership):
    '''Return documents that user owns and shared'''
    ownedDocs = globals()[username]._ownedDocuments
    sharedDocs = dispalySharedDocuments(globals()[username])
    returnDocs = [y for x in [ownedDocs, sharedDocs] for y in x]
    return returnDocs

def getUsers(username, searchType, search):
    '''Return list of userobjects based on the search criteria'''
    returnUsers = []
    if searchType == "Username":
        for user in allUsers:
            if user._username == username:
                returnUsers.append(user)
    elif searchType == "Name":
        returnUsers = searchByName(globals()[username], search)
    else: #Interests
        returnUsers = searchByInterest(globals()[username], search)
    return returnUsers

def suggestTaboos(username, suggestedTaboo):
    if not suggestedTaboo:
        return False
    else:
        suggestTaboo(globals()[username], suggestedTaboo)
        return True

def requestTaboos():
    if tabooList:
        return tabooList;
    else:
        return []

def requestpromotion(username, firstName, lastName, interests):
    # check if form is completed
    if (not interests) or (not firstName) or (not lastName) :
        return False
    else:
        globals()[username].applyToOrdinary([firstName, lastName], interests)
    return True

def userHasPerms(uid):
    return True
