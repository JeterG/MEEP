def blocked(User):#Global functions are functions that are handled or necessary for the system
    if(User._blocked==True):
        print("Update document before you continue")
    else:
        return

class SuperUser:
    def __init__(self,name,interests):
        self._membership=str.upper("Super")
        self._username=name
        self._blocked=False
        self._interests=str.upper(interests)
        self._requestPromotion=0
        self._userDocumentRequests=[]
        return

    def promote(self,user):
        if str.upper(user._membership)=="GUEST":
            user._membership="ORDINARY"
            return
        elif str.upper(user._membership)=="ORDINARY":
            user._membership="SUPER"
            return
        else:
            return

    def demote(self,User):
        if str.upper(User._membership)=="ORDINARY":
            User._membership="GUEST"
            User._requestPromotion=0
            return
        elif str.upper(User._membership)=="SUPER":
            User._membership="ORDINARY"
            User._requestPromotion=0
            return
        else:
            return

    def processComplaint(self,Complaint, OrdinaryUser):
        return

    def updateMembership(self,User):
        if (User._requestPromotion==1):
            self.promote(User)
        elif (User._requestPromotion==-1):
            self.demote(User)
        else:
            return

    def updateTaboo(self,word):
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
    def __init__(self):
        self._membership=str.upper("GUEST")
        self._username=""
        self._blocked=False
        self._requestPromotion=0
        self._userDocumentRequests=[]
        return

    def applyToOrdinary(self,name,interests):
        self._username=name
        self._requestPromotion=1
        self._interests=str.upper(interests)
        return

class OrdinaryUser:
    def __init__(self,name,interests):
        self._membership=str.upper("ORDINARY")
        self._username=name
        self._blocked=False
        self._requestPromotion=0
        self._userDocumentRequests=[]
        return

class Document:
    def __init__(self,documentName,User):
        self._lock=False
        self._documentName=documentName
        self._owner=User._username
        self._lockedBy=User._username
        self._unlockedBy=""
        self._users=[User._username]

    def unlockDocument(self,Document,SuperUser):#Unlock the document, only the super user can unlock the document
        if ((str.upper(SuperUser._membership)=="SUPER")& Document._lock==True):
            Document._lock=False
            Document._unlockeBy=SuperUser._username
            Document._lockedBy=""
            print (SuperUser._username, " Unlocked the Document")
        else:
            print(SuperUser._username, " can not unlock documents, not permitted")

    def lockDocument(self,Document,User):
        if (Document._lock==False):
            Document._lock=True
            Document._lockedBy=User._username
            Document._unlockedBy=""
            print(User._username," Locked the Document ")
        else:
            print("Document")
            
    def invite(self,Owner,User):
        if (Owner._username==self._owner):
            if (self._documentName,User._username) in Owner._userDocumentRequests:
                self._users.append(User._username)
                Owner._userDocumentRequests.remove((self._documentName,User._username))
                return
            else:
                return
        else:
            return

    def requestPermission(self,Owner,User):
        if (Owner._username==self._owner):
            if User._username not in self._users:
                Owner._userDocumentRequests.append((self._documentName,User._username))
                print(Owner._userDocumentRequests)
            else:
                return
        else:
            return


def test_class():
    Jete=SuperUser("Jete","Minecraft,Algorithms,Pokemon")
    Doc1=Document("Doc1",Jete)
    print("locked by",Doc1._lockedBy,sep=",")


    Mike=OrdinaryUser("Mike","Cheese")
    Doc1.lockDocument(Doc1,Mike)
    Doc1.unlockDocument(Doc1,Jete)
    print(Mike._membership)

    Jete.updateMembership(Mike)
    print(Mike._membership)

    print(Doc1._lockedBy)
    print(Jete._interests)
    Doc1.requestPermission(Jete,Mike)

    Doc1.invite(Jete,Mike)
