export class User {
    
    id: string;
    name: string;
    password: string | null;
    category: string;

    constructor(anId: string | null, aName: string | null, aPassword: string | null, aCategory: string | null) {
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
    }
}
