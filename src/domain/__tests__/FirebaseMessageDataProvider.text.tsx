import { Message } from '../Message';
import { FirebaseMessageDataProvider } from '../FirebaseMessageDataProvider';

let myDataProvider = new FirebaseMessageDataProvider('steviewaremessenger/dataProviderTest');

it('Successfully instantiated the provider', () => {
    expect(myDataProvider).not.toBeNull();
});

it('Should be no messages initially', () => {
    expect(myDataProvider.messages.length).toEqual(0);
});

it('Added a message', () => {
    myDataProvider.add(new Message('45', 'Steve', 'Steves Message'));
    expect(myDataProvider.messages.length).toEqual(1);
});
