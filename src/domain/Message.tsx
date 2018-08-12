export class Message {

    key: string;
    sender: string;
    text: string;
    creationDate: Date;
    type: string;

    constructor(aKey: string, aSender: string, someText: string, aType: string, aCreationDate: Date | null) {
        this.key = aKey;
        this.sender = aSender;
        this.text = someText;
        this.type = aType;
        if (aCreationDate) {
            this.creationDate = aCreationDate;
        } else {
            this.creationDate = new Date();
        }
    }
}
