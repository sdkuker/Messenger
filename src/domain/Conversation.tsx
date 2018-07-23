import { User } from './User';

export class Conversation {
    participantOne: User;
    participantTwo: User;

    constructor(firstParticipant: User, secondParticipant: User) {
        this.participantOne = firstParticipant;
        this.participantTwo = secondParticipant;
    }

    key = () => {
        if (this.participantOne.name > this.participantTwo.name) {
            return this.participantOne.name + '-' + this.participantTwo.name;
        } else {
            return this.participantTwo.name + '-' + this.participantOne.name;
        } 
    }
}
