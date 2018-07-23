import * as React from 'react';
import { MessageWarehouse } from '../domain/MessageWarehouse';
import { Message } from '../domain/Message';
import { User } from '../domain/User';

interface PropValues {
    messageWarehouse: MessageWarehouse;
    loggedInUser: User;
}

class Footer extends React.Component<PropValues, {}> {

    defaultMessage = 'Your Message';
     // tslint:disable-next-line
    inputTextRef: any;

    constructor(props: PropValues) {
        super(props);
        this.messageLeft = this.messageLeft.bind(this);
        this.messageEntered = this.messageEntered.bind(this);
        this.enterClicked = this.enterClicked.bind(this);
        this.inputTextRef = React.createRef();
    }

    public render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="form-group">
                        <input
                            type="text"
                            name="myInput"
                            defaultValue={this.defaultMessage}
                            onBlur={this.messageLeft}
                            onFocus={this.messageEntered}
                            onKeyUp={this.enterClicked}
                            className="form-control"
                            ref={this.inputTextRef}
                        />
                    </div>
                </div>
            </footer>
        );
    }

    /*
    * don't do anything when they tab out
    */
    messageLeft(event: React.FormEvent<HTMLInputElement>) {
        // console.log('I just left and the contents was: ' + event.currentTarget.value);
    }

    messageEntered(event: React.FormEvent<HTMLInputElement>) {
        // console.log('Message entered and currentTarget.value is: ' + event.currentTarget.value);
        if (event.currentTarget.value === this.defaultMessage) {
            event.currentTarget.value = '';
        }
    }

    /*
    * only send the message when enter is clicked
    */
    enterClicked(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.keyCode === 13) {
            if (event.currentTarget.value) {
                if (event.currentTarget.value !== this.defaultMessage) {
                    const myMessage = new Message('1', this.props.loggedInUser.name, event.currentTarget.value);
                    this.props.messageWarehouse.add(myMessage);
                    this.inputTextRef.current.value = '';
                }
            }
        }
    }
}

export default Footer;
