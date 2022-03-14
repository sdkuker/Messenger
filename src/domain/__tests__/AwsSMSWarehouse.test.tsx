import { AwsSMSWarehouse } from "../AwsSMSWarehouse";
import { Message } from "../Message";

let myWarehouse = new AwsSMSWarehouse('AKIAWWMIHGVQABMYNKV5', 'Pirhs3fLI0zZNyr4HJS2Fg3XQ3wvTlKW/9QzmC9r');

it ('Successfully send text to my cell - sent another too soon so it does not send', async () => {

    const myMessage = new Message('aKey', 'aSender', 'message text', 'aType', null, null, new Date());

    let sentSuccessfully  = await myWarehouse.send(myMessage, '+16512692904');

    expect (sentSuccessfully).toEqual('sent');

    sentSuccessfully  = await myWarehouse.send(myMessage, '+16512692904');

    expect (sentSuccessfully).toEqual('notSent-tooSoon');
})

it ('isItTimeToSendMessage - first message send', async () => {

    let currrentTime = new Date(2022, 2, 3, 12, 0, 0);

    const isItTime = myWarehouse.isItTimeToSendMessage(null, currrentTime, 100);

    expect (isItTime).toBeTruthy();

})

it ('isItTimeToSendMessage - second message send - too soon', async () => {

    let timeOfLastMessageSend = new Date(2022, 2, 3, 11, 59, 0);
    let currrentTime = new Date(2022, 2, 3, 12, 0, 0);

    const isItTime = myWarehouse.isItTimeToSendMessage(timeOfLastMessageSend, currrentTime, 300000); // 5 fims

    expect (isItTime).toBeFalsy();

})

it ('isItTimeToSendMessage - second message send - waited long enough', async () => {

    let timeOfLastMessageSend = new Date(2022, 2, 3, 11, 54, 0);
    let currrentTime = new Date(2022, 2, 3, 12, 0, 0);

    const isItTime = myWarehouse.isItTimeToSendMessage(timeOfLastMessageSend, currrentTime, 300000); // 5 fims

    expect (isItTime).toBeTruthy();

})