export class Message {

    key: string;
    sender: string;
    text: string;
    creationDate: Date;

    constructor(aKey: string, aSender: string, someText: string) {
        this.key = aKey;
        this.sender = aSender;
        this.text = someText;
        this.creationDate = new Date();
    }
}
