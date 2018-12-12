import pickle
from datetime import date
from datetime import datetime
import os

# add saveids to the functions that use the ids that way its more concise
cwd = os.getcwd()
tabooList = ["EVIL", "LIAR", "FAKE", "FART"]
pending = []  # words that are going to be added to the taboo list through user requests.
allDocuments = []
allUsers = []
allComplaints = []


def dispalySharedDocuments(user):
    available = []
    if blocked(user) == False:
        for document in allDocuments:
            if document._privacy == document.privacies[2]:
                if document._owner != user._username:
                    if user._username in document._users:
                        available.append(document)
        return available




# Suggested Usage searchByName(globlas()[username],name)
def searchByName(user, name):  # user is a user object, name is a string
    available = []
    if user._membership != "GUEST":
        for x in allUsers:
            if ((name.upper() == x._firstName.upper()) or (name.upper() == x._lastName.upper())):
                available.append(x)
                print(x._firstName)
                print(x._username)
                print(name.upper())
        return (available)
    return (available)


# Suggested Usage searchByInterest(globals()[username],interest)
def searchByInterest(user, interest):  # user is a user object, interest is a string
    available = []
    if user._membership != "GUEST":
        for x in allUsers:
            if interest.upper() in [y.upper() for y in x._interests]:
                available.append(x)
        return (available)
    return (available)


# called automatically by mutation functions
def saveUsers():
    global allUsers
    directory = cwd + "/meep/system/users.p"
    file_users = open(directory, 'wb')
    pickle.dump(allUsers, file_users)
    file_users.close()
    return


# called automatically by mutation functions
def saveDocuments():
    global allDocuments
    directory = cwd + "/meep/system/documents.p"
    file_doc = open(directory, 'wb')
    pickle.dump(allDocuments, file_doc)
    file_doc.close()
    return


# called automatically by mutation functions
def saveTabooList():
    global tabooList
    directory = cwd + "/meep/system/taboo.p"
    file_taboo_list = open(directory, 'wb')
    pickle.dump(tabooList, file_taboo_list)
    file_taboo_list.close()
    return


# called automatically by mutation functions
def saveComplaints():
    global allComplaints
    directory = cwd + "/meep/system/complaints.p"
    file_complaints = open(directory, 'wb')
    pickle.dump(allComplaints, file_complaints)
    file_complaints.close()
    return


# used in loadInformation()
def loadComplaints():
    directory = cwd + "/meep/system/complaints.p"
    if (os.path.exists(directory)):
        global allComplaints
        file_complaints = open(directory, 'rb')
        allComplaints = pickle.load(file_complaints)
        for complaint in allComplaints:
            globals()["Complaint_" + str(complaint._id)] = complaint
        file_complaints.close()
    return


# used in loadInformation
def loadUsers():
    directory = cwd + "/meep/system/users.p"
    if (os.path.exists(directory)):
        global allUsers
        file_users = open(directory, 'rb')
        allUsers = pickle.load(file_users)
        for user in allUsers:
            globals()[user._username] = user
        file_users.close()
    return


# used in loadInformation
def loadDocuments():
    directory = cwd + "/meep/system/documents.p"
    if (os.path.exists(directory)):
        global allDocuments
        file_doc = open(directory, 'rb')
        allDocuments = pickle.load(file_doc)
        for document in allDocuments:
            globals()[document._documentName] = document
        file_doc.close()
    return


# used in loadInformation
def loadTabooList():
    directory = cwd + "/meep/system/taboo.p"
    if (os.path.exists(directory)):
        global tabooList
        file_taboo_list = open(directory, 'rb')
        tabooList = pickle.load(file_taboo_list)
        file_taboo_list.close()
    return


# called automatically by mutation functions
def savePending():
    global pending
    directory = cwd + "/meep/system/pending.p"
    file_pending = open(directory, 'wb')
    pickle.dump(pending, file_pending)
    file_pending.close()
    return


# used in loadInformation
def loadPending():
    directory = cwd + "/meep/system/pending.p"
    if (os.path.exists(directory)):
        global pending
        file_pending = open(directory, "rb")
        pending = pickle.load(file_pending)


# called automatically by mutation functions
def loadInformation():
    loadTabooList()
    loadUsers()
    loadDocuments()
    loadPending()
    loadComplaints()
    return


# called automatically by mutation functions
def saveInformation():
    saveUsers()
    saveDocuments()
    saveTabooList()
    savePending()
    saveComplaints()
    return


# Suggested Usage searchOwnedDocuments(globals()[username],word)
def searchOwnedDocuments(User, word):  # user is a user object that exists, word is a string
    available = []
    if blocked(User) == False:
        available = []
        for document in User._ownedDocuments:
            if word.upper() in [c.upper() for c in document._documentBody]:
                available.append(document)
        return available
    return available


def blocked(User):  # Blocked function to check whether a user can do anything or if they have to fix a document
    if (User._blocked == True):
        print("Update Document", User._reasonBlocked)
        return ("Update Document", User._reasonBlocked)
    else:
        return False


# Used for keeping track of timing where its important
def timeStamp():
    return (str(date.today()) + " " + str(datetime.now().strftime("%X")))


# word should be a string it will be added to a list for pending taboo words if it is not
def suggestTaboo(User, word):
    if blocked(User) == False:
        if word in [x.upper() for x in tabooList]:
            return
        else:
            SuperUser._suggestions = 0
            pending.append(word)
            savePending()
        #    Add the possible taboo word to a place where the super user add it

#suggested usage searchDocumentByPrivacy(globals()[username],privacy)
def searchDocumentByPrivacy(User, privacy):  # returns a list of documents that have specific privacy
    available = []
    if blocked(User) == False:
        for document in allDocuments:
            if document._privacy == document.privacies[privacy]:
                available.append(document)
        return available


# Suggested usage fileComplaintDocument(globals()[document._documentName],globals()[username],globals()[document._owner],problem)
def fileComplaintDocument(Document, victim, target, Problem):  # helper Function
    # problem is a string that has the problem the target is the owner of hte doucment
    if blocked(victim) == False:
        if len(allComplaints) == 0:
            id = 0
        else:
            id = allComplaints[-1]._id + 1
        globals()["Complaint_" + str(id)] = ComplaintDocuments(id, victim, target,
                                                               globals()[Document._owner], Problem, Document)
        globals()[Document._owner].addComplaint(((globals()["Complaint_" + str(id)])))


# Suggested Usage fileComplaint(globals()[username],globals()[targetusername],problem)
def fileComplaintUser(victim, target,
                      problem):  # problem is a string that is the problem and the target is the user who the username is complaining about
    if blocked(victim) == False:
        if len(allComplaints) == 0:
            id = 0
        else:
            id = allComplaints[-1]._id + 1
        globals()["Complaint_" + str(id)] = ComplaintUsers(id, victim, target, problem)
        SuperUser.addComplaint(SuperUser, globals()["Complaint_" + str(id)])


def processComplaintDocuments(user):
    if blocked(user) == False:
        if user.__class__ != "<class 'core.GuestUser'>":
            for complaint in user._complaints:
                if complaint._complaintAbout._username in complaint._Document._users:
                    if complaint._complaintAbout._username != complaint._Document._owner:
                        complaint._Document._users.remove(complaint._complaintAbout._username)
                        complaint._Document._complaintHistory.append((complaint, timeStamp()))
            del user._complaints[:]
            saveUsers()
            saveDocuments()


class SuperUser:
    _complaintsUsers = []
    _suggestions = -1

    # Suggested usage globals()[username]=Superuser(username,name,password,interests)
    # username is a string
    # name is a list with 2 elements both string
    # interests is a list of any number of elements all strings
    def __init__(self, username, name, password, interests):
        self._membership = str.upper("Super")
        self._username = username
        self._firstName = name[0]
        self._lastName = name[1]
        self._blocked = False
        self._interests = [interest.upper() for interest in interests]
        self._requestPromotion = 0
        self._userDocumentRequests = []
        self._ownedDocuments = []
        if len(allUsers) == 0:
            self._id = 0
        else:
            self._id = allUsers[-1]._id + 1
        self._password = password
        self._complaints = []
        self._reasonBlocked = ()
        allUsers.append(self)
        saveUsers()
        return

    # helper function
    def addComplaint(self, complaint):
        if blocked(self) == False:
            if complaint.__class__ == ComplaintDocuments:
                self._complaints.append(complaint)
                saveUsers()
            else:
                self._complaintsUsers.append(complaint)
                saveUsers()

    # helper function
    def promote(self, user):
        if str.upper(user._membership) == "GUEST":
            user._firstName = user._application[0][0]
            user._lastName = user._application[0][1]
            user._membership = "ORDINARY"
            user._interests = [x.upper() for x in user._application[1]]
            del user._application
            user._ownedDocuments = []
            user._complaints = []
            user.__class__ = OrdinaryUser
            user._userDocumentRequests = []
            user._requestPromotion = 0
            saveUsers()
            return
        elif str.upper(user._membership) == "ORDINARY":
            user._membership = "SUPER"
            user.__class__ = SuperUser
            user._requestPromotion = 0
            saveUsers()
            return
        else:
            return

    # helper function
    def demote(self, User):
        if str.upper(User._membership) == "ORDINARY":
            User._membership = "GUEST"
            User.__class__ = GuestUser
            User._requestPromotion = 0
            saveUsers()
            return
        elif str.upper(User._membership) == "SUPER":
            User._membership = "ORDINARY"
            User.__class__ = OrdinaryUser
            User._requestPromotion = 0
            saveUsers()
            return
        else:
            return

    # Suggested usage globals()[username].processNextComplaintUsers() followed by saveComplaints() and saveUsers()
    #       returns the complaint about a user at the top of the SuperUser._complaintsUsers
    def processNextComplaintUsers(self):  # Have to call saveComplaints after this fuction is called.
        if blocked(self) == False:
            return (self._complaintsUsers.pop(0))  # returns the next complaint about a user

    # suggested usage SuperUser.updateMembership(SuperUser,user)
    #       or if you are using a specific superuser than:
    #                globals()[username].updateMembership(globals()[username],user)
    def updateMembership(self, User):
        if blocked(self) == False:
            if (User._requestPromotion == 1):
                self.promote(User)
            elif (User._requestPromotion == -1):
                self.demote(User)
            else:
                return

    # helper function
    def updateTabooList(self, word):  # Check if the word is already in the taboo list,
        # otherwise add it to the list and remove it from all documents
        # tabooList=[x.upper() for x in tabooList]
        if blocked(self) == False:
            if word.upper() in [x.upper() for x in tabooList]:
                return
            else:
                tabooList.append(word.upper())
                saveTabooList()
                self.applyTabooList()

    # Suggested usage SuperUser.resolveSuggestions(SuperUser) or globals()[username].resolveSuggestions(globals()[username])
    def resolveSuggestions(self):  # add suggested taboo words to the taboo list
        global pending
        if blocked(self) == False:
            if self._suggestions == -1:
                return
            else:
                for word in pending:
                    self.updateTabooList(word)
                del pending[:]
                self._suggestions = -1
                self.applyTabooList()
                savePending()
                saveUsers()

    # helper function to apply taboolist to all documents
    def applyTabooList(
            self):  # update all the taboo words from all existing documents and block users who added the word
        for document in allDocuments:
            dc = []
            for word, name in document._documentBody:
                dc.append((word.upper(), name))
            for word1, name1 in dc:
                if word1.upper() in [x.upper() for x in tabooList]:
                    globals()[name1]._reasonBlocked = (document._documentName, dc.index((word1, name1)))
                    document._documentBody[dc.index((word1, name1))] = ("UNK", name1)
                    globals()[name1]._blocked = True
        saveDocuments()
        return


# helper class
class ComplaintDocuments:  # Complaints about documents to the owner
    def __init__(self, id, Victim, Target, Owner, Problem,
                 Document):  # Both Complain and target are User types SU,OU,GU
        self._resolved = False
        self._id = id
        self._complaintBy = Victim
        self._complaintFor = Owner
        self._complaintAbout = Target
        self._Document = Document
        self._problem = Problem
        allComplaints.append(self)
        saveComplaints()


# helper class
class ComplaintUsers:  # complaints handlded by SU's about other users
    def __init__(self, id, Victim, Target, Problem):
        self._id = id
        self._complaintBy = Victim._username
        self._complaintAbout = Target._username
        self._problem = Problem
        allComplaints.append(self)
        saveComplaints()


class GuestUser:
    # Suggested Usage globals()[username]=GuestUser(username,password)
    def __init__(self, username, password):  # username is a string, password is a string
        self._membership = str.upper("GUEST")
        self._username = username
        self._password = password
        self._blocked = False
        self._requestPromotion = 0
        self._userDocumentRequests = []# list of tuples
        if len(allUsers) == 0:
            self._id = 0
        else:
            self._id = allUsers[-1]._id + 1
        self._application = []
        self._reasonBlocked = []
        allUsers.append(self)
        saveUsers()
        return

    # suggested usage globals()[username].applyToOrdinary(name,interests)
    def applyToOrdinary(self, name, interests):  # name is list with 2 string elemnts
        # interests is a list of string elements
        if blocked(self) == False:
            self._application = [name, interests]
            self._requestPromotion = 1
            saveUsers()
            return


class OrdinaryUser:
    # suggested usage globals()[username]=OrdinaryUser(username,name,password,interests)
    def __init__(self, username, name, password, interests):  # interests is a list of string elements
        # name is list with 2 string elements, username and password are strings
        self._membership = str.upper("ORDINARY")
        self._username = username
        self._blocked = False
        self._requestPromotion = 0
        self._firstName = name[0]
        self._lastName = name[1]
        self._userDocumentRequests = []
        self._interests = [interest.upper() for interest in interests]
        self._ownedDocuments = []
        if len(allUsers) == 0:
            self._id = 0
        else:
            self._id = allUsers[-1]._id + 1
        self._password = password
        self._complaints = []
        self._reasonBlocked = []
        allUsers.append(self)
        saveUsers()
        return

    # helper functions
    def addComplaint(self, complaint):
        if blocked(self) == False:
            if complaint.__class__ == ComplaintDocuments:
                self._complaints.append(complaint)
                saveUsers()


class Document:
    privacies = {0: "OPEN", 1: "RESTRICTED", 2: "SHARED", 3: "PRIVATE"}

    # Suggested Usage globals()[documentname]=Document(documentname,user)
    # document name is a string and user is the user who is the owner
    def __init__(self, documentName, User):
        self._privacy = self.privacies[3]
        self._lock = False
        self._documentName = documentName
        self._owner = User._username
        self._lockedBy = User._username
        self._unlockedBy = ""
        self._users = [User._username]
        self._documentBody = []  # DocumentBody will always be the current version
        if len(allDocuments) == 0:
            self._id = 0
        else:
            self._id = allDocuments[-1]._id + 1
            # print("\nIN CONSTRUCTOR", dir(allDocuments[-1]))
        self._versionHistory = [(0, "CREATE", self._documentBody.copy(), User._username, timeStamp())]
        self._complaintHistory = []
        # self._versionHistory[-1] is also the current versoin/latest
        User._ownedDocuments.append(self)
        allDocuments.append(self)
        saveDocuments()
        return

    # Suggested Usage globals()[documentname].unlockDocument(globals()[username])
    def unlockDocument(self,
                       User):  # Unlock the document, only the super user can unlock the document regardless of who locked it
        # otherwise document can be unlocked by whoever locked it or the owner
        if ((str.upper(User._membership) == "SUPER") & self._lock == True):  # unlock the document if you are super user
            self._lock = False
            self._unlockedBy = User._username
            self._lockedBy = ""
        else:
            if self._lock == True:  # unlock the document if you are the owner
                if self._owner == User._username:
                    self._lock = False
                    self._unlockedBy = User._username
                    self._lockedBy = ""
                else:
                    if self._lockedBy == User._username:  # if you are not the owner then unlock the document if you locked it initially
                        self._lock = False
                        self._unlockedBy = User._username
                        self._lockedBy = ""
        saveDocuments()

    # Suggested usage globals()[documentname].lockDocument(globals()[username])
    def lockDocument(self, User):  # lock the document that can be done by anyone
        if blocked(User) == False:
            if (self._lock == False):
                self._lock = True
                self._lockedBy = User._username
                self._unlockedBy = ""
                saveDocuments()
            else:
                return
        else:
            if self._documentName == User._reasonBlocked[0]:
                if (self._lock == False):
                    self._lock = True
                    self._lockedBy = User._username
                    self._unlockedBy = ""
                    saveDocuments()

    # Suggested usage globals()[documentName].requestpermission(globals()[documentname._owner],globals()[username])
    def requestPermission(self, Owner, User):
        if blocked(User) == False:
            if (Owner._username == self._owner):
                if User._username not in self._users:
                    Owner._userDocumentRequests.append((self._documentName, User._username))
                else:
                    return
            else:
                return

    # suggested usage globals()[documentname].add(word,globals()[username])
    # word is a string and the user is the user who is editing
    def add(self, index, Word, User):
        if blocked(User) == False:
            self._documentBody.insert(index, (Word, User._username))
            SuperUser.applyTabooList(SuperUser)
            self._versionHistory.append(
                (
                len(self._versionHistory), "ADD " + str(index), self._documentBody.copy(), User._username, timeStamp()))
            saveDocuments()
            return

    # suggested usage globals()[documentname].delete(index,globals()[username])
    # word is a string and the user is the user who is editing
    def delete(self, index, User):
        if blocked(User) == False:
            if len(self._documentBody) >= index:
                del self._documentBody[index]
                self._versionHistory.append(
                    (len(self._versionHistory), "DELETE " + str(index), self._documentBody.copy(), User._username,
                     timeStamp()))
            saveDocuments()
            return

    # Suggested usage, globals()[documentname].update(globals()[globals()[documentname]._owner],index,word)
    def update(self, User, index, word):
        if blocked(User) == False:
            if len(self._documentBody) >= index:
                self._documentBody[index] = (word, User._username)
                SuperUser.applyTabooList(SuperUser)
                self._versionHistory.append(
                    (len(self._versionHistory), "UPDATE " + str(index), self._documentBody.copy(), User._username,
                     timeStamp()))
                saveDocuments()
        else:
            if len(self._documentBody) >= index:
               if self._documentBody[index] == ("UNK",User._username):
                    self._documentBody[index] = (word, User._username)
                    User._blocked = False
                    SuperUser.applyTabooList(SuperUser)
                    self._versionHistory.append(
                        (len(self._versionHistory), "UPDATE " + str(index), self._documentBody.copy(), User._username,
                         timeStamp()))
                    saveUsers()
                    saveDocuments()
        return

    # Suggested usage globals()[documentname].denyInvitation(globals()[globals()[documentname]._owner],globals()[username])
    def denyInvitation(self, Owner, User):
        if blocked(Owner) == False:
            if (self._documentName, User._username) in Owner._userDocumentRequests:
                del Owner._userDocumentRequests[
                    (Owner._userDocumentRequests.index((self._documentName, User._username)))]
                saveDocuments()
                saveUsers()
            return

    # Suggested usage globals()[documentname].acceptInvitation(globals()[globals()[documentname]._owner],globals()[username])
    def acceptInvitation(self, Owner, User):
        if blocked(Owner) == False:
            if (self._documentName, User._username) in Owner._userDocumentRequests:
                Owner._userDocumentRequests.remove((self._documentName, User._username))
                self._users.append(User._username)
                self._privacy = self.privacies[2]
                saveUsers()
                saveDocuments()
            return

    def setPrivacy(self, user, index):
        if blocked(user) == False:
            try:
                if user._username == self._owner:
                    self._privacy = self.privacies[index]
                    saveDocuments()
                    saveUsers()
            except:
                return


def Print(user):
    thetype = str(type(user))
    if ((thetype == "<class 'core.SuperUser'>") or (thetype == "<class 'core.OrdinaryUser'>") or (
            thetype == "<class 'core.GuestUser'>")):
        if user._membership == "SUPER":
            print("Object = ", user)
            print("\t\t__class__ = ", user.__class__)
            print("\t\t_username = ", user._username)
            print("\t\t_membership = ", user._membership)
            print("\t\t_firstName = ", user._firstName)
            print("\t\t_lastName = ", user._lastName)
            print("\t\t_blocked = ", user._blocked)
            print("\t\t_reasonBlocked = ", user._reasonBlocked)
            print("\t\t_interest = ", user._interests)
            print("\t\t_requestPromotion  = ", user._requestPromotion)
            print("\t\t_userDocumentRequests = ", user._userDocumentRequests)
            printUserDocumentRequests(user)
            print("\t\t_ownedDocuments = ", user._ownedDocuments)
            print("\t\t_id = ", user._id)
            print("\t\t_password = ", user._password)
            print("\t\t_suggestions = ", user._suggestions)
            print("\t\t_complaints = ", user._complaints)
            print("\t\t_complaintsUsers = ", user._complaintsUsers, "\n")

        elif user._membership == "GUEST":
            print("Object = ", user)
            print("\t\t_username = ", user._username)
            print("\t\t_membership = ", user._membership)
            print("\t\t_blocked = ", user._blocked)
            print("\t\t_reasonBlocked = ", user._reasonBlocked)
            print("\t\t_requestPromotion  = ", user._requestPromotion)
            print("\t\t_id = ", user._id)
            print("\t\t_application  = ", user._application, "\n")

        else:
            print("Object = ", user)
            print("\t\t_username = ", user._username)
            print("\t\tmembership = ", user._membership)
            print("\t\t_firstName = ", user._firstName)
            print("\t\tlastName = ", user._lastName)
            print("\t\t_blocked = ", user._blocked)
            print("\t\t_reasonBlocked = ", user._reasonBlocked)
            print("\t\t_interests = ", user._interests)
            print("\t\t_requestPromotion  = ", user._requestPromotion)
            print("\t\t_userDocumentRequests = ", user._userDocumentRequests)
            printUserDocumentRequests(user)
            print("\t\t_ownedDocuments = ", user._ownedDocuments)
            print("\t\t_id = ", user._id)
            print("\t\t_id = ", user._password)
            print("\t\t_complaints = ", user._complaints, "\n")

    elif thetype == "<class 'core.Document'>":
        print("Object = ", user)
        print("\t\t__class__ =", user.__class__)
        print("\t\t_documentName = ", user._documentName)
        print("\t\t_lock = ", user._lock)
        print("\t\t_owner = ", user._owner)
        print("\t\t_lockedBy = ", user._lockedBy)
        print("\t\t_unlockedBy = ", user._unlockedBy)
        print("\t\t_users = ", user._users)
        print("\t\t_documentBody  = ", user._documentBody)
        print("\t\t_versionHistory = ")
        printDocumentVersionHistory(user)
        print("\t\t_privacy = ", user._privacy)
        print("\t\t_id = ", user._id)
        print("\t\t_complaintHistory = ", user._complaintHistory, "\n")
    elif thetype == "<class 'core.ClomplaintDocuments'>":
        print("Object = ", user)
        print("\t\t__class__ =", user.__class__)
        print("\t\t_id = ", user._id)
        print("\t\t_complaintBy = ", user._complaintBy)
        print("\t\t_complaintFor = ", user._complaintFor)
        print("\t\t_complaintAbout = ", user._complaintAbout)
        print("\t\t_Document = ", user._Document)
        print("\t\t_problem = ", user._problem, "\n")
    elif thetype == "<class 'core.ComplaintUsers>":
        print("Object = ", user)
        print("\t\t__class__ = ", user.__class__)
        print("\t\t _id = ", user._id)
        print("\t\t _complaintBy = ", user._complaintBy)
        print("\t\t _complaintAbout = ", user._complaintAbout)
        print("\t\t _problem = ", user._problem)
    else:
        print(user)


def printUserDocumentRequests(user):
    if len(user._userDocumentRequests) == 0:
        return
    else:
        print("\t\t\t\t\t\t\t\tDocuments | Users")
        for request in user._userDocumentRequests:
            print("\t\t\t\t\t\t\t\t", request[0], "\t|\t", request[1])
    return


def printDocumentVersionHistory(document):
    for tuple in document._versionHistory:
        print("\t\t\t\t\t\tversion = ", tuple[0], "|operation = ", tuple[1], "|By who = ", tuple[3], "|when = ",
              tuple[4])
        print(tuple[2])
    return


# make sure to make constraints true for doning stuff that uses a user if they are blocked.
# loadUsers()
# make sure to make constraints true for doning stuff that uses a user if they are blocked.
<<<<<<< HEAD
# saveInformation()
=======
>>>>>>> bd7765c2f70f53e41f8200e24512f0692e00bc77
# su = SuperUser("su", ["Super", "User"], "root", ["Algorithms", "Minecraft", "Pokemon"])
# ou = OrdinaryUser("ou", ["Ordinary", "User"], "password", ["Studying", "Writing", "Acting"])
# open0 = Document("open0", su)
# open1 = Document("open1", ou)
# rest0 = Document("rest0", su)
# rest1 = Document("rest1", ou)
# shared0 = Document("shared0", su)
# shared0.requestPermission(su, ou)
# shared0.acceptInvitation(su, ou)
# shared1 = Document("shared1", ou)
# private0 = Document("private0", su)
# private1 = Document("private1", ou)
# open0.setPrivacy(su, 0) #open
# open1.setPrivacy(ou, 0)
# rest0.setPrivacy(su, 1) #restricted
# rest1.setPrivacy(ou, 1)
# shared0.setPrivacy(su, 2) #shared
# shared1.setPrivacy(ou, 2)
# private0.setPrivacy(su, 3) #private
# private1.setPrivacy(ou, 3)
# saveInformation()
loadInformation()
