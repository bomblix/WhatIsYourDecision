import { User } from './../model/user'

export class UserService {
    users = [
        new User("User 1", 1),
        new User("User 2", 2),
        new User("User 3", 3),
        new User("User 4", 4)
    ];
    currentUser: User;

    getAllUsers() {
        return this.users;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    switchUser(user: User) {
        this.currentUser = user;
    }
}