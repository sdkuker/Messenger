export class Message {

    sender: string;
    text: string;

    constructor(aSender: string, someText: string) {
        this.sender = aSender;
        this.text = someText;
    }
}
