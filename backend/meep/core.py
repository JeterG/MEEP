import pickle
from datetime import date
from datetime import datetime

tabooList = ["EVIL", "LIAR"]
allDocuments = []
allUsers = []
uniqueIdUsers = -1
uniqueIdDocuments = -1


def blocked(User):  # Blocked function to check wheter a user can do anything or if they have to fix a document
    if (User._blocked == True):
        print("Update document before you continue")
    else:
        return


def timeStamp():
    return (str(date.today()) + " " + str(datetime.now().strftime("%X")))


class SuperUser:

    def __init__(self, name, password, interests):
        global uniqueIdUsers
        uniqueIdUsers += 1
        self._membership = str.upper("Super")
        self._username = name
        self._blocked = False
        self._interests = str.upper(interests)
        self._requestPromotion = 0
        self._userDocumentRequests = []
        self._ownedDocuments = []
        self._id = uniqueIdUsers
        self._password = password
        allUsers.append(self)
        return

    def promote(self, user):
        if str.upper(user._membership) == "GUEST":
            user._membership = "ORDINARY"
            user._password = user._application[0]
            user._interests = str.upper(user._application[1])
            del user._application
            user._ownedDocuments = []
            return
        elif str.upper(user._membership) == "ORDINARY":
            user._membership = "SUPER"
            return
        else:
            return

    def demote(self, User):
        if str.upper(User._membership) == "ORDINARY":
            User._membership = "GUEST"
            User._requestPromotion = 0
            return
        elif str.upper(User._membership) == "SUPER":
            User._membership = "ORDINARY"
            User._requestPromotion = 0
            return
        else:
            return

    def processComplaint(self, Complaint, OrdinaryUser):
        return

    def updateMembership(self, User):
        if (User._requestPromotion == 1):
            self.promote(User)
        elif (User._requestPromotion == -1):
            self.demote(User)
        else:
            return

    def updateTabooList(self, word):  # Check if the word is already in the taboo list,
        # otherwise add it to the list and remove it from all documents
        temp = [words.upper() for words in tabooList]
        if word.upper() in temp:
            print(word)
        else:
            tabooList.append(word.upper())
        self.applyTabooList()
        return

    def applyTabooList(self):  # update all the taboo words from all existing documents
        print(tabooList)
        for document in allDocuments:
            dc = [word.upper() for word in document._documentBody]
            for word in dc:
                if word in tabooList:
                    document._documentBody[dc.index(word)] = "UNK"
        return


class Complaint:
    def __init__(self, Complain, Target, problem):  # Both Complain and target are User types SU,OU,GU
        self._resolved = False
        self._complaintBy = Complain._username
        self._complaintFor = Target._username
        self._problem = problem


class GuestUser:
    def __init__(self, name):
        global uniqueIdUsers
        uniqueIdUsers += 1
        self._membership = str.upper("GUEST")
        self._username = name
        self._blocked = False
        self._requestPromotion = 0
        self._userDocumentRequests = []
        self._id = uniqueIdUsers
        allUsers.append(self)
        return

    def applyToOrdinary(self, password, interests):
        self._application = [password, interests]
        self._requestPromotion = 1
        return


class OrdinaryUser:
    def __init__(self, name, password, interests):
        global uniqueIdUsers
        uniqueIdUsers += 1
        self._membership = str.upper("ORDINARY")
        self._username = name
        self._blocked = False
        self._requestPromotion = 0
        self._userDocumentRequests = []
        self._ownedDocuments = []
        self._id = uniqueIdUsers
        self._password = password
        allUsers.append(self)
        return


class Document:
    def __init__(self, documentName, User):
        global uniqueIdDocuments
        uniqueIdDocuments += 1
        self._lock = False
        self._documentName = documentName
        self._owner = User._username
        self._lockedBy = User._username
        self._unlockedBy = ""
        self._users = [User._username]
        self._documentBody = []
        self._id = uniqueIdDocuments
        self._versionHistory = [(0, self._documentBody.copy(), self._owner, timeStamp())]
        allDocuments.append(self)

    def unlockDocument(self,
                       User):  # Unlock the document, only the super user can unlock the document regardless of who locked it
        # otherwise document can be unlocked by whoever locked it or the owner
        if ((str.upper(User._membership) == "SUPER") & self._lock == True):#unlock the document if you are super user
            self._lock = False
            self._unlockedBy = User._username
            self._lockedBy = ""
        else:
            if self._lock == True:#unlock the document if you are the owner
                if self._owner == User._username:
                    self._lock = False
                    self._unlockedBy = User._username
                    self._lockedBy = ""
                else:
                    if self._lockedBy == User._username:#if you are not the owner then unlock the document if you locked it initially
                        self._lock = False
                        self._unlockedBy = User._username
                        self._lockedBy = ""
                    else:
                        return
            else:
                print(self._documentName, " is not Locked")
                return

    def lockDocument(self, User):#lock the document that can be done by anyone
        if (self._lock == False):
            self._lock = True
            self._lockedBy = User._username
            self._unlockedBy = ""
            print(User._username, " Locked the Document ")
        else:
            return -1

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
                print(Owner._userDocumentRequests)
            else:
                return
        else:
            return

    def add(self, Word, User):
        self._documentBody.append(Word)
        su.applyTabooList()
        self._versionHistory.append((len(self._versionHistory), self._documentBody.copy(), User._username, timeStamp()))
        return

    def delete(self, index, User):
        if len(self._documentBody) >= index:
            del self._documentBody[index]
            self._versionHistory.append(
                (len(self._versionHistory), self._documentBody.copy(), User._username, timeStamp()))
        else:
            return

    def update(self, index):
        return
    # def denyInvitation():


su = SuperUser("su", "root", "Minecraft,Algorithms,Pokemon")
Doc1 = Document("Doc1", su)
print("locked by", Doc1._lockedBy, sep=",")
Mik = OrdinaryUser("Mik", "password", "Cheese")
Doc1.lockDocument(Mik)
Doc1.unlockDocument(su)
print(Mik._membership)
su.updateMembership(Mik)
print(Mik._membership)
print(Doc1._lockedBy)
print(su._interests)
Doc1.requestPermission(su, Mik)
Doc1.invite(su, Mik)
print(allDocuments[0]._documentName)
print(Doc1._documentBody)
su.applyTabooList()
su.updateTabooList("bob")
Doc1.lockDocument(su)
Doc1.add("Bob", su)
Doc1.add("LIAR", su)
Doc1.add("test", su)
Doc1.add("case", su)
Doc1.add("trial", su)
Doc1.add("fail", su)

# Doc1.delete("UNK")
print(Doc1._documentBody)

# file_doc1=open('test.txt','wb')
# pickle.dump(Doc1,file_doc1)

# del Doc1
# print("test")
# file_doc1=open("test.txt",'rb')
# Doc1=pickle.load(file_doc1)
# print (Doc1._documentBody)
print(False)

file_doc1 = open("documents", 'wb')
pickle.dump(allDocuments, file_doc1)

print(allDocuments[0]._documentBody)
del allDocuments
file_doc1 = open("documents", 'rb')
allDocuments = pickle.load(file_doc1)
print(allDocuments[0]._documentName)
Doc1 = allDocuments[0]
print(Doc1._documentBody)
for document in allDocuments:
    globals()[document._documentName] = document
    print("hello", document)
print(Doc1._documentBody, "Is the document", sep=" ")
# Doc1._documentBody = []
Doc3 = Doc1
print(Doc1)
print(Doc3)
print(Doc1._documentBody, "Is the document", sep=" ")
print(allDocuments[0]._documentBody)
print(Doc1.lockDocument(su))
print(Doc1.lockDocument(Mik))
print(Doc1.lockDocument(su))
print(su._id)
print(Mik._id)
print(timeStamp())
print(Doc1._documentBody)
Doc1.add("Hello", su)
for version in Doc1._versionHistory:
    print("Version", Doc1._versionHistory.index(version), " is ", version)
# print(Doc1._versionHistory.length())
if globals()["su"] in allUsers:
    print("hello")
print(len(allUsers))
Doc1.delete(2, su)
print("Version", len(Doc1._versionHistory) - 1, " is ", Doc1._versionHistory[len(Doc1._versionHistory) - 1])

Bob = GuestUser("Bob")
Bob.applyToOrdinary("abc123", "Minecraft")
print(Bob._application)
su.updateMembership(Bob)
print(Bob._password)
