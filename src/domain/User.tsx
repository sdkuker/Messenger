export class User {
    
    id: string;
    name: string;
    password: string | null;
    category: string;
    emailAddress: string;
    phoneNumber: string | null;

    constructor(anId: string | null, aName: string | null, aPassword: string | null, aCategory: string | null, anEmailAddress: string | null, aPhoneNumber: string | null) {
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
    }
}
