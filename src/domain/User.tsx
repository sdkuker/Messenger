export class User {
    
    id: string;
    name: string;
    password: string | null;
    category: string;

    constructor(anId: string, aName: string, aPassword: string | null, aCategory: string) {
        this.id = anId;
        this.name = aName;
        this.password = aPassword;
        this.category = aCategory;
    }
}
