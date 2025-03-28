import * as React from 'react';
import { MessageWarehouse } from '../domain/MessageWarehouse';
import { UserWarehouse } from '../domain/UserWarehouse';
import { AwsSMSWarehouse, smsEvent } from '../domain/AwsSMSWarehouse';
import { Message } from '../domain/Message';
import { User } from '../domain/User';
import  Email   from '../vendor/smtp-3.0.0';

interface PropValues {
    messageWarehouse: MessageWarehouse;
    loggedInUser: User;
    userWarehouse: UserWarehouse;
    awsSMSWarehouse: AwsSMSWarehouse;
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
                            <div className="form-control">
                                <div>
                                    <input
                                        type="file"
                                        name="myFileInput"
                                        onChange={(e) => this.fileSelected(e.target.files)}
                                        ref={this.inputImageRef}
                                        className="btn-sm"
                                    />
                                    <input 
                                        type="button"
                                        value="Send E-Mail"
                                        onClick={this.sendEmailButtonClicked}
                                        className="btn-sm"
                                    />
                                </div>
                            </div>
                    </div>
                </div>
            </footer>
        );
    }

    sendEmailButtonClicked = () => {

        const currentDate = new Date();
        let recipientUser = this.props.userWarehouse.partnerUser;
        let recipientUserEmailAddress = 'sdkuker@gmail.com';
        if (recipientUser) {
            if (recipientUser.emailAddress) {
                recipientUserEmailAddress = recipientUser.emailAddress;
            }
        }

        let senderEmailAddress = 'sdkuker@gmail.com';
        // if (this.props.loggedInUser.emailAddress) {
        //     senderEmailAddress = this.props.loggedInUser.emailAddress;
        // }

        Email.send({
            Host : 'smtp.elasticemail.com',
            Username : 'sdkuker@gmail.com',
            Password : 'E6269DE9F485AA7E5C10395E91A5A72C0C1F',
            To : recipientUserEmailAddress,
            From : senderEmailAddress,
            Subject : this.props.loggedInUser.name + ' posted something on Stevieware Messenger',
            Body : 'It was posted on: ' + currentDate.toLocaleDateString() + ' at: ' + currentDate.toLocaleTimeString()
        }).then(
            message => alert('email sent from: ' + senderEmailAddress + ' to: ' + recipientUserEmailAddress + 
                             ' with return message: ' + message)
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
                var self = this;
                var maxWidth = 300;
                var maxHeight = 225;
                var reader = new FileReader();
                // eslint-disable-next-line no-loop-func
                reader.onload = function () {
                    var originalImage = new Image();
                    originalImage.addEventListener('load', function () {
                        var width = originalImage.width;
                        var height = originalImage.height;
                        if (width > height) {
                            if (width > maxWidth) {
                                height *= maxWidth / width;
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width *= maxHeight / height;
                                height = maxHeight;
                            }
                        }
                        var reducedSizeCanvas = document.createElement('canvas');
                        reducedSizeCanvas.width = width;
                        reducedSizeCanvas.height = height;
                        var reducedSizeCtx = reducedSizeCanvas.getContext('2d');
                        if (reducedSizeCtx) {
                            reducedSizeCtx.drawImage(   originalImage, 0, 0, originalImage.width, 
                                                        originalImage.height, 0, 0, 
                                                        reducedSizeCanvas.width, reducedSizeCanvas.height);
                            var rotatedCanvas = document.createElement('canvas');
                            rotatedCanvas.width = reducedSizeCanvas.height;
                            rotatedCanvas.height = reducedSizeCanvas.width;
                            var rotatedCtx = rotatedCanvas.getContext('2d');
                            if (rotatedCtx) {
                                self.rotateImage(reducedSizeCanvas, rotatedCtx, rotatedCanvas);
                                var rotatedImage = rotatedCanvas.toDataURL('image/png', 0.5);
                                const myMessage = new Message(  '1',
                                                                self.props.loggedInUser.name,
                                                                rotatedImage,
                                                                'image',
                                                                rotatedCanvas.width,
                                                                rotatedCanvas.height,
                                                                null);
                                self.props.messageWarehouse.add(myMessage);
                                self.inputImageRef.current.value = '';
                            }

                        }
                    });
                    var originalImageReaderResults = reader.result;
                    if (originalImageReaderResults && typeof originalImageReaderResults === 'string') {
                        originalImage.src = originalImageReaderResults;
                    }
                };
                reader.readAsDataURL(selectorFiles[index]);
            }
        }
    }

    rotateImage(    originalImage: HTMLImageElement | HTMLCanvasElement, rotatedSizeCtx: CanvasRenderingContext2D,
                    rotatedSizeCanvas: HTMLCanvasElement) {
        // rotatedSizeCtx.clearRect(0, 0, rotatedSizeCanvas.width, rotatedSizeCanvas.height);
        // rotatedSizeCtx.save();
        rotatedSizeCtx.translate(rotatedSizeCanvas.width / 2, rotatedSizeCanvas.height / 2);
        rotatedSizeCtx.rotate(90 * Math.PI / 180);
        rotatedSizeCtx.drawImage(originalImage, - originalImage.width / 2, - originalImage.height / 2);
        // rotatedSizeCtx.drawImage(   originalImage, 0, 0, originalImage.width, originalImage.height, 0, 0, 
        //                            rotatedSizeCanvas.width, rotatedSizeCanvas.height);
        rotatedSizeCtx.restore();
    }

    /*
    * only send the message when enter is clicked
    */
    async enterClicked(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.keyCode === 13) {
            if (event.currentTarget.value) {
                if (event.currentTarget.value !== this.defaultMessage) {
                    const myMessage = new Message(
                        '1',
                        this.props.loggedInUser.name,
                        event.currentTarget.value,
                        'text',
                        null,
                        null,
                        null);
                    await this.props.messageWarehouse.add(myMessage);
                    this.inputTextRef.current.value = '';
                    if (this.props.userWarehouse.loggedInUser.nofifyConversationParterOfUpdate) {
                        await this.props.awsSMSWarehouse.send(smsEvent.EntryAdded, this.props.userWarehouse.partnerUser.phoneNumber);
                    }
                }
            }
        }
    }
}

export default Footer;
