export class User {
    
    id: string;
    name: string;
    password: string;
    category: string;

    constructor(anId: string, aName: string, aPassword: string, aCategory: string) {
        this.id = anId;
        this.name = aName;
        this.password = aPassword;
        this.category = aCategory;
    }
}
