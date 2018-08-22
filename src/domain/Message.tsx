export class Message {

    key: string;
    sender: string;
    text: string;
    creationDate: Date;
    type: string;
    height: number;
    width: number;

    constructor(aKey: string, aSender: string, someText: string, aType: string,  
                aWidth: number | null, aHeight: number | null, aCreationDate: Date | null) {
        this.key = aKey;
        this.sender = aSender;
        this.text = someText;
        this.type = aType;
        if (aCreationDate) {
            this.creationDate = aCreationDate;
        } else {
            this.creationDate = new Date();
        }
        if (aHeight) {
            this.height = aHeight;
        } else {
            this.height = 0;
        }
        if (aWidth) {
            this.width = aWidth;
        } else {
            this.width = 0;
        }
    }
}
