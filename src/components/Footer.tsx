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
                 var self = this;
                 var reader = new FileReader();
                 reader.onload = function() {
                    var reducedSizeCanvas = document.createElement('canvas');
                    reducedSizeCanvas.width = 250;
                    reducedSizeCanvas.height = 300;
                    var reducedSizeCtx = reducedSizeCanvas.getContext('2d');
                    var originalImage = new Image();
                    originalImage.addEventListener('load', function () {
                        if (reducedSizeCtx) {
                            // reducedSizeCtx.drawImage(  originalImage, 
                            //                 reducedSizeCanvas.width / 2 - originalImage.width / 2, 
                            //                 reducedSizeCanvas.height / 2 - originalImage.width / 2);
                            // self.rotateImage(originalImage, reducedSizeCtx, reducedSizeCanvas);
                            reducedSizeCtx.drawImage(   originalImage, 0, 0, originalImage.width, originalImage.height, 
                                                        0, 0, reducedSizeCanvas.width, reducedSizeCanvas.height);
                            var reducedImage = reducedSizeCanvas.toDataURL('image/png', 0.5);
                            const myMessage = new Message(  '1', 
                                                            self.props.loggedInUser.name, 
                                                            reducedImage, 
                                                            'image',
                                                            reducedSizeCanvas.width,
                                                            reducedSizeCanvas.height,
                                                            null);
                            self.props.messageWarehouse.add(myMessage);
                            self.inputImageRef.current.value = '';
                        }    
                    });
                    var originalImageReaderResults = reader.result;
                    if (originalImageReaderResults &&  typeof originalImageReaderResults === 'string') {
                        originalImage.src = originalImageReaderResults;
                    }
                 };
                 reader.readAsDataURL(selectorFiles[index]);
             }
        }
    }

    rotateImage(    originalImage: HTMLImageElement, reducedSizeCtx: CanvasRenderingContext2D, 
                    reducedSizeCanvas: HTMLCanvasElement) {
        reducedSizeCtx.clearRect(0, 0, reducedSizeCanvas.width, reducedSizeCanvas.height);
        reducedSizeCtx.save();
        reducedSizeCtx.translate(reducedSizeCanvas.width / 2, reducedSizeCanvas.height / 2);
        reducedSizeCtx.rotate(90 * Math.PI / 180);
        // reducedSizeCtx.drawImage(originalImage, - originalImage.width / 2, - originalImage.height / 2);
        reducedSizeCtx.drawImage(   originalImage, 0, 0, originalImage.width, originalImage.height, 0, 0, 
                                    reducedSizeCanvas.width, reducedSizeCanvas.height);
        reducedSizeCtx.restore();
    }

    /*
    * only send the message when enter is clicked
    */
    enterClicked(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.keyCode === 13) {
            if (event.currentTarget.value) {
                if (event.currentTarget.value !== this.defaultMessage) {
                    const myMessage = new Message(  '1', 
                                                    this.props.loggedInUser.name, 
                                                    event.currentTarget.value, 
                                                    'text', 
                                                    null,
                                                    null,
                                                    null);
                    this.props.messageWarehouse.add(myMessage);
                    this.inputTextRef.current.value = '';
                }
            }
        }
    }
}

export default Footer;
