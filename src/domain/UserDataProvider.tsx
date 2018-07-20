import { User } from './User';

export interface UserDataProvider {
     users: Array<User>;
     getUsersForUserOfCategory(aUser: User): Array<User>;
} 
