import pickle

tabooList = ["EVIL", "LIAR"]
allDocuments = []
allUsers = []

def blocked(User):  # Global functions are functions that are handled or necessary for the system
    if (User._blocked == True):
        print("Update document before you continue")
    else:
        return


class SuperUser:

    def __init__(self, name, interests):
        self._membership = str.upper("Super")
        self._username = name
        self._blocked = False
        self._interests = str.upper(interests)
        self._requestPromotion = 0
        self._userDocumentRequests = []
        self._ownedDocuments = []
        allUsers.append(self)
        return

    def promote(self, user):
        if str.upper(user._membership) == "GUEST":
            user._membership = "ORDINARY"
            user._ownedDocuments = []
            allUsers.append(user)
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
    def __init__(self,name):
        self._membership = str.upper("GUEST")
        self._username = name
        self._blocked = False
        self._requestPromotion = 0
        self._userDocumentRequests = []
        allUsers.append(self)
        return

    def applyToOrdinary(self, name, interests):
        self._username = name
        self._requestPromotion = 1
        self._interests = str.upper(interests)
        return


class OrdinaryUser:
    def __init__(self, name, interests):
        self._membership = str.upper("ORDINARY")
        self._username = name
        self._blocked = False
        self._requestPromotion = 0
        self._userDocumentRequests = []
        self._ownedDocuments = []
        allUsers.append(self)
        return


class Document:
    def __init__(self, documentName, User):
        self._lock = False
        self._documentName = documentName
        self._owner = User._username
        self._lockedBy = User._username
        self._unlockedBy = ""
        self._users = [User._username]
        self._documentBody = ["Liar", "bob"]
        allDocuments.append(self)

    def unlockDocument(self,
                       User):  # Unlock the document, only the super user can unlock the document regardless of who locked it
        # otherwise document can be unlocked by whoever locked it or the owner
        if ((str.upper(User._membership) == "SUPER") & self._lock == True):
            self._lock = False
            self._unlockedBy = User._username
            self._lockedBy = ""
        else:
            if self._lock == True:
                if self._owner == User._username:
                    self._lock = False
                    self._unlockedBy = User._username
                    self._lockedBy = ""
                else:
                    if self._lockedBy == User._username:
                        self._lock = False
                        self._unlockedBy = User._username
                        self._lockedBy = ""
                    else:
                        return
            else:
                print(self._documentName, " is not Locked")
                return

    def lockDocument(self, User):
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

    def add(self, Word):
        self._documentBody.append(Word)
        Jete.applyTabooList()
        return

    def delete(self, Word):
        if Word in self._documentBody:
            self._documentBody.remove(Word)
        return

    # def denyInvitation():


Jete = SuperUser("Jete", "Minecraft,Algorithms,Pokemon")
Doc1 = Document("Doc1", Jete)
print("locked by", Doc1._lockedBy, sep=",")
Mik = OrdinaryUser("Mik", "Cheese")
Doc1.lockDocument(Mik)
Doc1.unlockDocument(Jete)
print(Mik._membership)
Jete.updateMembership(Mik)
print(Mik._membership)
print(Doc1._lockedBy)
print(Jete._interests)
Doc1.requestPermission(Jete, Mik)
Doc1.invite(Jete, Mik)
print(allDocuments[0]._documentName)
print(Doc1._documentBody)
Jete.applyTabooList()
Jete.updateTabooList("bob")
Doc1.add("Bob")
Doc1.delete("UNK")
print(Doc1._documentBody)

# file_doc1=open('test.txt','wb')
# pickle.dump(Doc1,file_doc1)

del Doc1
print("test")
# file_doc1=open("test.txt",'rb')
# Doc1=pickle.load(file_doc1)
# print (Doc1._documentBody)
print(False)

file_doc1 = open("meep/system/documents", 'wb')
pickle.dump(allDocuments, file_doc1)

print(allDocuments[0]._documentBody)
del allDocuments
file_doc1 = open("meep/system/documents", 'rb')
allDocuments = pickle.load(file_doc1)
print(allDocuments[0]._documentName)
# Doc1=allDocuments[0]
# print(Doc1._documentBody)
for document in allDocuments:
    globals()[document._documentName] = document
    print(document)
print(Doc1._documentBody, "Is the document", sep=" ")
Doc1._documentBody=[]
Doc3=Doc1
print (Doc1)
print(Doc3)
print(Doc1._documentBody, "Is the document", sep=" ")
print(allDocuments[0]._documentBody)
print(Doc1.lockDocument(Jete))
print(Doc1.lockDocument(Mik))
print(Doc1.lockDocument(Jete))
