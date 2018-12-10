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


def searchByName(user, name):
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


def searchByInterest(user, interest):
    available = []
    if user._membership != "GUEST":
        for x in allUsers:
            if interest.upper() in [y.upper() for y in x._interests]:
                available.append(x)
        return (available)
    return (available)


def saveUsers():
    global allUsers
    directory = cwd + "/meep/system/users.p"
    file_users = open(directory, 'wb')
    pickle.dump(allUsers, file_users)
    file_users.close()
    return


def saveDocuments():
    global allDocuments
    directory = cwd + "/meep/system/documents.p"
    file_doc = open(directory, 'wb')
    pickle.dump(allDocuments, file_doc)
    file_doc.close()
    return


def saveTabooList():
    global tabooList
    directory = cwd + "/meep/system/taboo.p"
    file_taboo_list = open(directory, 'wb')
    pickle.dump(tabooList, file_taboo_list)
    file_taboo_list.close()
    return


def saveComplaints():
    global allComplaints
    directory = cwd + "/meep/system/complaints.p"
    file_complaints = open(directory, 'wb')
    pickle.dump(allComplaints, file_complaints)
    file_complaints.close()
    return


def loadComplaints():
    global allComplaints
    try:
        directory = cwd + "/meep/system/complaints.p"
        file_complaints = open(directory, 'rb')
        allComplaints = pickle.load(file_complaints)
        for complaint in allComplaints:
            globals()["Complaint_" + str(complaint._id)] = complaint
        file_complaints.close()
    except:
        return


def loadUsers():
    global allUsers
    try:
        directory = cwd + "/meep/system/users.p"
        file_users = open(directory, 'rb')
        allUsers = pickle.load(file_users)
        for user in allUsers:
            globals()[user._username] = user
        file_users.close()
    except:
        return


def loadDocuments():
    global allDocuments
    try:
        directory = cwd + "/meep/system/documents.p"
        file_doc = open(directory, 'rb')
        allDocuments = pickle.load(file_doc)
        for document in allDocuments:
            globals()[document._documentName] = document
        file_doc.close()
    except:
        return


def loadTabooList():
    global tabooList
    try:
        directory = cwd + "/meep/system/taboo.p"
        file_taboo_list = open(directory, 'rb')
        tabooList = pickle.load(file_taboo_list)
        file_taboo_list.close()
    except:
        return


def savePending():
    global pending
    directory = cwd + "/meep/system/pending.p"
    file_pending = open(directory, 'wb')
    pickle.dump(pending, file_pending)
    file_pending.close()
    return


def loadPending():
    global pending
    try:
        directory = cwd + "/meep/system/pending.p"
        file_pending = open(directory, "rb")
        pending = pickle.load(file_pending)
    except:
        return

def loadInformation():
    loadTabooList()
    loadUsers()
    loadDocuments()
    loadPending()
    loadComplaints()
    return


def saveInformation():
    saveUsers()
    saveDocuments()
    saveTabooList()
    savePending()
    saveComplaints()
    return


def searchOwnedDocuments(User, word):
    available = []
    for document in User._ownedDocuments:
        if word.upper() in [c.upper() for c in document._documentBody]:
            available.append(document)
    return available



def blocked(User):  # Blocked function to check whether a user can do anything or if they have to fix a document
    if (User._blocked == True):
        print("Update document before you continue")
        return True
    else:
        return False


def timeStamp():
    return (str(date.today()) + " " + str(datetime.now().strftime("%X")))


def suggestTaboo(word):
    if word in [x.upper() for x in tabooList]:
        return
    else:
        SuperUser._suggestions = 0
        pending.append(word)
        #    Add the possible taboo word to a place where the super user add it


def searchDocumentByPrivacy(privacy):  # returns a list of documents that have open as their privacy
    available = []
    for document in allDocuments:
        if document._privacy is document.privacies[privacy]:
            available.append(document)
    return available


def fileComplaintDocument(Document, victim, target, Problem):  # helper Function
    if len(allComplaints) == 0:
        id = 0
    else:
        id = allComplaints[-1]._id + 1
    globals()["Complaint_" + str(id)] = ComplaintDocuments(id, victim, target,
                                                           globals()[Document._owner], Problem, Document)
    globals()[Document._owner].addComplaint(((globals()["Complaint_" + str(id)])))


def fileComplaintUser(victim, target, problem):
    if len(allComplaints) == 0:
        id = 0
    else:
        id = allComplaints[-1]._id + 1
    globals()["Complaint_" + str(id)] = ComplaintUsers(id, victim, target, problem)
    SuperUser.addComplaint(SuperUser, globals()["Complaint_" + str(id)])


class SuperUser:
    _complaintsusers = []
    _suggestions = -1

    def __init__(self, username, name, password, interests):
        loadUsers()
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
        allUsers.append(self)
        saveUsers()
        return

    def addComplaint(self, complaint):
        if complaint.__class__ == ComplaintDocuments:
            self._complaints.append(complaint)
        else:
            self._complaintsusers.append(complaint)

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
            return
        elif str.upper(user._membership) == "ORDINARY":
            user._membership = "SUPER"
            user.__class__ = SuperUser
            return
        else:
            return

    def demote(self, User):
        if str.upper(User._membership) == "ORDINARY":
            User._membership = "GUEST"
            User.__class__ = GuestUser
            User._requestPromotion = 0
            return
        elif str.upper(User._membership) == "SUPER":
            User._membership = "ORDINARY"
            User.__class__ = OrdinaryUser
            User._requestPromotion = 0
            return
        else:
            return

    def processNextComplaintUsers(self):
        return (self._complaintsusers.pop(0))  # returns the next complaint about a user

    def updateMembership(self, User):
        if (User._requestPromotion == 1):
            self.promote(User)
        elif (User._requestPromotion == -1):
            self.demote(User)
        else:
            return

    def updateTabooList(self, word):  # Check if the word is already in the taboo list,
        # otherwise add it to the list and remove it from all documents
        # tabooList=[x.upper() for x in tabooList]
        if word.upper() in [x.upper() for x in tabooList]:
            return
        else:
            tabooList.append(word.upper())
        self.applyTabooList()

    def resolveSuggestions(self):  # add suggested taboo words to the taboo list
        global pending
        if self._suggestions is -1:
            return
        else:
            for word in pending:
                self.updateTabooList(word)
            del pending[:]
            self._suggestions = -1

    def applyTabooList(
            self):  # update all the taboo words from all existing documents and block users who added the word
        for document in allDocuments:
            dc = [word.upper() for word in document._documentBody]
            for word in dc:
                if word.upper() in [x.upper() for x in tabooList]:
                    document._documentBody[dc.index(word)] = "UNK"
        return


class ComplaintDocuments:  # Complaints about documents to the owner
    def __init__(self, id, Victim, Target, Owner, Problem,
                 Document):  # Both Complain and target are User types SU,OU,GU
        loadComplaints()
        self._resolved = False
        self._id = id
        self._complaintBy = Victim
        self._complaintFor = Owner
        self._complaintAbout = Target
        self._Document = Document
        self._problem = Problem
        allComplaints.append(self)
        saveComplaints()


class ComplaintUsers:  # complaints handlded by SU's about other users
    def __init__(self, id, Victim, Target, Problem):
        loadComplaints()
        self._id = id
        self._complaintBy = Victim._username
        self._complaintAbout = Target._username
        self._problem = Problem
        allComplaints.append(self)
        saveComplaints()


class GuestUser:
    def __init__(self, username, password):
        loadUsers()
        self._membership = str.upper("GUEST")
        self._username = username
        self._password = password
        self._blocked = False
        self._requestPromotion = 0
        self._userDocumentRequests = []
        if len(allUsers) == 0:
            self._id = 0
        else:
            self._id = allUsers[-1]._id + 1
        self._application = []
        allUsers.append(self)
        saveUsers()
        return

    def applyToOrdinary(self, name, interests):
        self._application = [name, interests]
        self._requestPromotion = 1
        return


class OrdinaryUser:
    def __init__(self, username, name, password, interests):
        loadUsers()
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
        allUsers.append(self)
        saveUsers()
        return


def processComplaintDocuments(user):
    print("complaints", user._complaints)
    for complaint in user._complaints:
        if complaint._complaintAbout._username in complaint._Document._users:
            if complaint._complaintAbout._username != complaint._Document._owner:
                complaint._Document._users.remove(complaint._complaintAbout._username)
                complaint._Document._complaintHistory.append((complaint, timeStamp()))
    del user._complaints[:]


class Document:
    privacies = {0: "OPEN", 1: "RESTRICTED", 2: "SHARED", 3: "PRIVATE"}

    def __init__(self, documentName, User):
        loadDocuments()
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
                    else:
                        return
            else:  # Document isn't locked
                return

    def lockDocument(self, User):  # lock the document that can be done by anyone
        if (self._lock == False):
            self._lock = True
            self._lockedBy = User._username
            self._unlockedBy = ""
        else:
            return

    def invite(self, Owner, User):
        if (Owner._username == self._owner):
            if (self._documentName, User._username) in Owner._userDocumentRequests:
                self._users.append(User._username)
                Owner._userDocumentRequests.remove((self._documentName, User._username))
                return
            else:
                return
        else:
            return

    def requestPermission(self, Owner, User):
        if (Owner._username == self._owner):
            if User._username not in self._users:
                Owner._userDocumentRequests.append((self._documentName, User._username))
            else:
                return
        else:
            return

    def add(self, Word, User):
        self._documentBody.append(Word)
        su.applyTabooList()
        self._versionHistory.append(
            (len(self._versionHistory), "ADD", self._documentBody.copy(), User._username, timeStamp()))
        return

    def delete(self, index, User):
        if len(self._documentBody) >= index:
            del self._documentBody[index]
            self._versionHistory.append(
                (len(self._versionHistory), "DELETE", self._documentBody.copy(), User._username, timeStamp()))
        else:
            return

    def update(self, User, index, word):
        if len(self._documentBody) >= index:
            self._documentBody[index] = word
            su.applyTabooList()
            self._versionHistory.append(
                (len(self._versionHistory), "UPDATE", self._documentBody.copy(), User._username, timeStamp()))
        return

    def denyInvitation(self, Owner, User):
        if (self._documentName, User._username) in Owner._userDocumentRequests:
            del Owner._userDocumentRequests[(Owner._userDocumentRequests.index((self._documentName, User._username)))]
        return

    def acceptInvitation(self, Owner, User):
        if (self._documentName, User._username) in Owner._userDocumentRequests:
            del Owner._userDocumentRequests[(Owner._userDocumentRequests.index((self._documentName, User._username)))]
            self._users.append(User._username)
            self._privacy = self.privacies[2]
        return

    def setPrivacy(self, user, index):
        try:
            if user._username == self._owner:
                self._privacy = self.privacies[index]
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
            print("\t\t_interest = ", user._interests)
            print("\t\t_requestPromotion  = ", user._requestPromotion)
            print("\t\t_userDocumentRequests = ", user._userDocumentRequests)
            printUserDocumentRequests(user)
            print("\t\t_ownedDocuments = ", user._ownedDocuments)
            print("\t\t_id = ", user._id)
            print("\t\t_password = ", user._password)
            print("\t\t_suggestions = ", user._suggestions)
            print("\t\t_complaints = ", user._complaints)
            print("\t\t_complaintusers = ", user._complaintsusers, "\n")

        elif user._membership == "GUEST":
            print("Object = ", user)
            print("\t\t_username = ", user._username)
            print("\t\t_membership = ", user._membership)
            print("\t\t_firstName = ", user._firstName)
            print("\t\t_lastName = ", user._lastName)
            print("\t\t_blocked = ", user._blocked)
            print("\t\t_requestPromotion  = ", user._requestPromotion)
            print("\t\t_userDocumentRequests = ", user._userDocumentRequests)
            printUserDocumentRequests(user._userDocumentRequests)
            print("\t\t_id = ", user._id)
            print("\t\t_application  = ", user._application, "\n")

        else:
            print("Object = ", user)
            print("\t\t_username = ", user._username)
            print("\t\tmembership = ", user._membership)
            print("\t\t_firstName = ", user._firstName)
            print("\t\tlastName = ", user._lastName)
            print("\t\t_blocked = ", user._blocked)
            print("\t\t_interests = ", user._interests)
            print("\t\t_requestPromotion  = ", user._requestPromotion)
            print("\t\t_userDocumentRequests = ", user._userDocumentRequests)
            printUserDocumentRequests(user._userDocumentRequests)
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
    if len(user._userDocumentRequests)==0:
        return
    else:
        print("\t\t\t\t\t\t\t\tDocuments | Users")
        for request in user._userDocumentRequests:
            print("\t\t\t\t\t\t\t\t",request[0],"\t|\t",request[1])
    return
def printDocumentVersionHistory(document):
    for tuple in document._versionHistory:
            print("\t\t\t\t\t\tversion = ", tuple[0],"|operation = ",tuple[1],"|By who = ",tuple[3],"|when = ",tuple[4])
    return

#make sure to make constraints true for doning stuff that uses a user if they are blocked.

su = SuperUser("su", ["Super", "User"], "root", ["Algorithms", "Minecraft", "Pokemon"])
