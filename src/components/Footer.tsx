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
    // tslint:disable-next-line
    inputImageRef: any;

    constructor(props: PropValues) {
        super(props);
        this.messageLeft = this.messageLeft.bind(this);
        this.messageEntered = this.messageEntered.bind(this);
        this.enterClicked = this.enterClicked.bind(this);
        this.inputTextRef = React.createRef();
        this.inputImageRef = React.createRef();
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
                        <input
                            type="file"
                            name="myFileInput"
                            onChange={(e) => this.fileSelected(e.target.files)}
                            ref={this.inputImageRef}
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
        if (event.currentTarget.value === this.defaultMessage) {
            event.currentTarget.value = '';
        }
    }

    // tslint:disable-next-line
    fileSelected(selectorFiles: FileList | null) {
        if (selectorFiles) {
            for (var index = 0; index < selectorFiles.length; index++) {
                if (selectorFiles[index].type.match(/image.*/)) {
                    var self = this;
                    var reader = new FileReader();
                    reader.onload = function () {
                        var myImage = reader.result;
                        const myMessage = new Message('1', self.props.loggedInUser.name, myImage, 'image', null);
                        self.props.messageWarehouse.add(myMessage);
                        self.inputImageRef.current.value = '';
                    };
                    reader.readAsDataURL(selectorFiles[index]);
                }

            }
        }
    }

    /*
    * only send the message when enter is clicked
    */
    enterClicked(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.keyCode === 13) {
            if (event.currentTarget.value) {
                if (event.currentTarget.value !== this.defaultMessage) {
                    const myMessage = new Message(
                        '1',
                        this.props.loggedInUser.name,
                        event.currentTarget.value,
                        'text',
                        null);
                    this.props.messageWarehouse.add(myMessage);
                    this.inputTextRef.current.value = '';
                }
            }
        }
    }
}

export default Footer;
