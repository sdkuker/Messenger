export class User {
    
    id: string;
    name: string;
    password: string | null;
    category: string;
    emailAddress: string;
    phoneNumber: string | null;
    notifyAdminUponLogin: boolean;
    nofifyConversationParterOfUpdate: boolean;

    constructor(anId: string | null, aName: string | null, aPassword: string | null, aCategory: string | null, 
                anEmailAddress: string | null, aPhoneNumber: string | null, shouldNotifyAdminUponLogin: boolean | null,
                shouldNotifyConversationParterOfUpdate: boolean | null) {
        if (anId) {
            this.id = anId;
        } 
        if (aName) {
            this.name = aName;
        }
        if (aPassword) {
            this.password = aPassword;
        }
        if (aCategory) {
            this.category = aCategory;
        }
        if (anEmailAddress) {
            this.emailAddress = anEmailAddress;
        }
        if (aPhoneNumber) {
            this.phoneNumber = aPhoneNumber;
        }
        if (shouldNotifyAdminUponLogin) {
            this.notifyAdminUponLogin = shouldNotifyAdminUponLogin;
        } else {
            this.notifyAdminUponLogin = false;
        }
        if (shouldNotifyConversationParterOfUpdate) {
            this.nofifyConversationParterOfUpdate = shouldNotifyConversationParterOfUpdate;
        } else {
            this.nofifyConversationParterOfUpdate = false;
        }
    }
}
