import { SNSClient, PublishCommand, PublishCommandInput, SNSClientResolvedConfig, SNSClientConfig, PublishCommandOutput} from '@aws-sdk/client-sns';
//import { Credentials } from '@aws.sdk/types';
import { Message } from './Message';

export class AwsSMSWarehouse {

    secondsToWaitBetweenSMSMessageSends = 600;
    timeLastSMSSent: Date;
    mySNSClient: SNSClient;

    constructor(awsAccessKeyId: string, awsSecretAccessKay: string) {
        const myCredentials = {accessKeyId: awsAccessKeyId, secretAccessKey: awsSecretAccessKay};
        const myConfig : SNSClientConfig = {region: 'us-east-1', credentials: myCredentials}
       // const myConfig : SNSClientResolvedConfig = {accessKeyId: '1', secretAccessKey: '2', region: 'us-east-1'};
        this.mySNSClient = new SNSClient(myConfig)
    }

    // if it's time, send the sms message.  Phone number in format +1aaabbcccc.
    send = async (aMessage: Message, recipientPhoneNumber: string) => {

        let successfullySent = false;
        // figure out the timing using the date.
        // if it's time, do the following

        try {
            const myInput : PublishCommandInput = {Message: aMessage.text, PhoneNumber: recipientPhoneNumber};
            const myCommand = new PublishCommand(myInput);
            const dataReturned = await this.mySNSClient.send(myCommand);
            successfullySent = true;
        } catch(error) {
            successfullySent = false;
        } finally {
            return successfullySent;
        }

    }

}
