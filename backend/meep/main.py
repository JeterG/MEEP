class SuperUser:
    def __init__(self,name):
        self._membership=str.upper("Super")
        self._username=name
        return
    def updateMembership(self,user):
        if str.upper(user._membership)=="GUEST":
            user._membership="ORDINARY"
            return
        elif str.upper(user._membership)=="ORDINARY":
            user._membership="SUPER"
            return
        else:
            return
    def processComplaint(Complaint, OrdinaryUser):
        return

    def updateTaboo(word):
        #Check if the word is already in taboo list
        #If word already in list remove it in all files
        #if it isnt add to taboo list and censor among all of the documents.
        return

class Complaint:
    def __init__(self,Complain,Target,problem):#Both Complain and target are User types SU,OU,GU
        self._resolved=False
        self._complaintBy=Complain._username
        self._complaintFor=Target._username
        self._problem=problem

class GuestUser:
    def __init__(self,name):
        self._membership=str.upper("GUEST")
        self._username=name
        return

class OrdinaryUser:
    def __init__(self,name):
        self._membership=str.upper("ORDINARY")
        self._username=name
        return
class Document:
    lockedby=""
    unlockedby=""
    def __init__(self,documentName):
        self._lock=False
        self._documentName=documentName
    def unlockDocument(self,Document,SuperUser):#Unlock the document, only the super user can unlock the document
        if ((str.upper(SuperUser._membership)=="SUPER")& Document._lock==True):
            Document._lock=False
            Document.unlockedby=SuperUser._username
            Document.lockedby=""
            print (SuperUser._username, " Unlocked the Document")
        else:
            print(SuperUser._username, " can not unlock documents, not permitted")
    def lockDocument(self,Document,User):
        if (Document._lock==False):
            Document._lock=True
            Document.lockedby=User._username
            Document.unlockedby=""
            print(User._username," Locked the Document ")
        else:
            print("Document")

d1=Document("Doc1")
s1=SuperUser("Jete")
o1=OrdinaryUser("Mike")
d1.lockDocument(d1,o1)
d1.unlockDocument(d1,s1)
print(d1.lockedby)
