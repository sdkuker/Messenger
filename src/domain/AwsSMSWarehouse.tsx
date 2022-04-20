import { SNSClient, PublishCommand, PublishCommandInput, SNSClientConfig} from '@aws-sdk/client-sns';
import { Message } from './Message';

export class AwsSMSWarehouse {

    // 5 mins = 5 * 60 * 1,000
    milliSecondsToWaitBetweenSMSMessageSends = 300000;
    timeLastSMSSent: Date | null;
    mySNSClient: SNSClient;

    constructor(awsAccessKeyId: string, awsSecretAccessKay: string) {
        const myCredentials = {accessKeyId: awsAccessKeyId, secretAccessKey: awsSecretAccessKay};
        const myConfig : SNSClientConfig = {region: 'us-east-1', credentials: myCredentials}
       // const myConfig : SNSClientResolvedConfig = {accessKeyId: '1', secretAccessKey: '2', region: 'us-east-1'};
        this.mySNSClient = new SNSClient(myConfig)
        this.timeLastSMSSent = null;
    }

    // if it's time, send the sms message.  Phone number in format +1aaabbcccc.
    send = async (aMessage: Message, recipientPhoneNumber: string | null) => {

        let sentStatus = 'unknown';
        const currentTime = new Date();

        if (this.isItTimeToSendMessage(this.timeLastSMSSent, currentTime, this.milliSecondsToWaitBetweenSMSMessageSends)) {
            if (recipientPhoneNumber) {
                try {
                    const myInput : PublishCommandInput = {Message: 'Messsage sent', PhoneNumber: recipientPhoneNumber};
                    const myCommand = new PublishCommand(myInput);
                    await this.mySNSClient.send(myCommand);
                    sentStatus = 'sent';
                    this.timeLastSMSSent = currentTime;
                } catch(error) {
                    sentStatus = 'notSent-failed';
                    console.log ('error is: ' + error);
                } 
            } else {
                sentStatus = 'notSent-noRecipientPhoneNumber';
            }
        } else {
                sentStatus = 'notSent-tooSoon';
        }

        return sentStatus;
    }

    isItTimeToSendMessage = (timeLastMessageWasSent: Date | null, currentTime: Date, millisBetweenMessageSends: number) => {

        let itIsTime = false;

        if (timeLastMessageWasSent) {
            // @ts-ignore
            const timeFromLastMessageSend = currentTime.valueOf() - timeLastMessageWasSent.valueOf();
           // console.log('currentTime: ' + currentTime.valueOf() + ' timeLastMessageWasSent: ' + timeLastMessageWasSent.valueOf());
            if (timeFromLastMessageSend >= millisBetweenMessageSends) {
                itIsTime = true;
            } else {
                itIsTime = false;
            }
        } else {
            itIsTime = true;
        }

        return itIsTime;
    }
}
