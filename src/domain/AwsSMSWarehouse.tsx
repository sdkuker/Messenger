import { SNSClient, PublishCommand, PublishCommandInput, SNSClientConfig} from '@aws-sdk/client-sns';
import { Message } from './Message';

export enum smsEvent {
    Login = "LOGIN",
    EntryAdded = "ENTRY-ADDED"
}

export class AwsSMSWarehouse {

    // 10 mins = 1000 millis/sec * 60 sec/min * 10 min
    milliSecondsToWaitBetweenSMSMessageSends = 1000 * 60 * 10;
    timeLastSMSSent: Date | null;
    mySNSClient: SNSClient;

    constructor(awsAccessKeyId: string, awsSecretAccessKay: string) {
        const myCredentials = {accessKeyId: awsAccessKeyId, secretAccessKey: awsSecretAccessKay};
        const myConfig : SNSClientConfig = {region: 'us-east-1', credentials: myCredentials}
       // const myConfig : SNSClientResolvedConfig = {accessKeyId: '1', secretAccessKey: '2', region: 'us-east-1'};
        this.mySNSClient = new SNSClient(myConfig)
        this.timeLastSMSSent = null;
    }

    // always send login messages.  if it's entry-added and if it's time, send the sms message.  
    // Phone number in format +1aaabbcccc.
    send = async (anEvent: smsEvent, recipientPhoneNumber: string | null) => {

        let sentStatus = 'unknown';
        const currentTime = new Date();

        if (smsEvent.Login == anEvent || 
            this.isItTimeToSendMessage(this.timeLastSMSSent, currentTime, this.milliSecondsToWaitBetweenSMSMessageSends)) {
            if (recipientPhoneNumber) {
                try {
                    const myInput : PublishCommandInput = {Message: anEvent.valueOf(), PhoneNumber: recipientPhoneNumber};
                    const myCommand = new PublishCommand(myInput);
                    let response =  await this.mySNSClient.send(myCommand);
                    console.log(response);
                    sentStatus = 'sent';
                    if (smsEvent.EntryAdded == anEvent) {
                         this.timeLastSMSSent = currentTime;
                    }
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
