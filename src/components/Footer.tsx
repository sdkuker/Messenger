import * as React from 'react';

class Footer extends React.Component {

    defaultMessage = 'Your Message';

    constructor() {
        super({});
        this.messageLeft = this.messageLeft.bind(this);
        this.messageEntered = this.messageEntered.bind(this);
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

    messageLeft(event: React.FormEvent<HTMLInputElement>) {
        console.log('I just left');
    }

    messageEntered(event: React.FormEvent<HTMLInputElement>) {
        console.log('I just got here');
    }

    enterClicked(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.keyCode === 13) {
            console.log('Enter was clicked');
        }
        
    }
}

export default Footer;
