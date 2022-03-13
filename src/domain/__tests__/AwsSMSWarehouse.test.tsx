import { AwsSMSWarehouse } from "../AwsSMSWarehouse";
import { Message } from "../Message";

let myWarehouse = new AwsSMSWarehouse('AKIAWWMIHGVQABMYNKV5', 'Pirhs3fLI0zZNyr4HJS2Fg3XQ3wvTlKW');

it ('Successfully send text to my cell', async () => {

    const myMessage = new Message('aKey', 'aSender', 'message text', 'aType', null, null, new Date());

    const sentSuccessfully  = await myWarehouse.send(myMessage, '+16512692904');

    expect (sentSuccessfully).toBeTruthy();
})