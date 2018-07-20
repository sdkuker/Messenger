export class User {

    id: string;
    name: string;
    password: string;

    constructor(anId: string, aName: string, aPassword: string) {
        this.id = anId;
        this.name = aName;
        this.password = aPassword;
    }
}
