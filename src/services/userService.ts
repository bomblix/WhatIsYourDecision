import { User } from './../model/user'

export class UserService {
    users = [
        new User("User 1", 1),
        new User("User 2", 2),
        new User("User 3", 3),
        new User("User 4", 4)
    ];
    currentUser: User;

    getAllUsers(): User[] {
        return this.users;
    }

    getCurrentUser(): User {
        return this.currentUser;
    }

    switchUser(user: User): void {
        this.currentUser = user;
    }
}