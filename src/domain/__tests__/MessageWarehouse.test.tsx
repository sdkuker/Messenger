import { Message } from '../Message';
import { MessageWarehouse } from '../MessageWarehouse';
import { StaticMessageDataProvider } from '../StaticMessageDataProvider';
import { computed, observe } from 'mobx';

let myDataProvider = new StaticMessageDataProvider(null);
let myWarehouse = new MessageWarehouse(myDataProvider);
let myMessages = computed(() => myWarehouse.messages);

it('Successfully acquired initial messages', () => {
    expect(myDataProvider.messages.length).toEqual(2);
    expect(myDataProvider.messages[0].sender).toEqual('Steve');
    expect(myDataProvider.messages[0].text).toEqual('Steves first message');
    expect(myDataProvider.messages[1].sender).toEqual('Michelle');
    expect(myDataProvider.messages[1].text).toEqual('Michelles first message');

});

it('Add a message and see if its observable', () => {
    let messageCount = myWarehouse.dataProvider.messages.length;
    expect (messageCount).toEqual(2);
    const disposer = observe(myMessages, ( change ) => {
        messageCount = change.object.length;
        expect(change.object.length).toEqual(3);
        expect(change.object[0].sender).toEqual('Steve');
        expect(change.object[0].text).toEqual('Steves first message');
        expect(change.object[1].sender).toEqual('Michelle');
        expect(change.object[1].text).toEqual('Michelles first message');
        expect(change.object[2].sender).toEqual('george');
        expect(change.object[2].text).toEqual('hi');

    });
    myDataProvider.add(new Message('4', 'george', 'hi', 'text', null, null, null));
});
