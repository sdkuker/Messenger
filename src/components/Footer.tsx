import * as React from 'react';

class Footer extends React.Component {

    defaultMessage = 'Your Message';

    constructor() {
        super({});
        this.messageLeft = this.messageLeft.bind(this);
        this.messageEntered = this.messageEntered.bind(this);
        this.enterClicked = this.enterClicked.bind(this);
    }

    public render() {
        return (
            <footer className="footer">
             <div className="form-group">
                    <input
                        type="text"
                        name="myInput"
                        defaultValue={this.defaultMessage}
                        onBlur={this.messageLeft}
                        onFocus={this.messageEntered}
                        onKeyUp={this.enterClicked}
                        className="form-control"
                    />
                </div>
            </footer>
        );
    }

    /*
    * don't do anything when they tab out
    */ 
    messageLeft(event: React.FormEvent<HTMLInputElement>) {
        console.log('I just left and the contents was: ' + event.currentTarget.value);
    }

    messageEntered(event: React.FormEvent<HTMLInputElement>) {
        console.log('Message entered and currentTarget.value is: ' + event.currentTarget.value);
        if (event.currentTarget.value === this.defaultMessage) {
            event.currentTarget.value = '';
        }
    }

    /*
    * only send the message when enter is clicked
    */ 
    enterClicked(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.keyCode === 13) {
            console.log('Enter was clicked and contents was: ' + event.currentTarget.value);
        }
        
    }
}

export default Footer;
