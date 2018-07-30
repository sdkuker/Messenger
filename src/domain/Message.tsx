export class Message {

    key: string;
    sender: string;
    text: string;
    creationDate: Date;

    constructor(aKey: string, aSender: string, someText: string, aCreationDate: Date | null) {
        this.key = aKey;
        this.sender = aSender;
        this.text = someText;
        if (aCreationDate) {
            this.creationDate = aCreationDate;
        } else {
            this.creationDate = new Date();
        }
    }
}
