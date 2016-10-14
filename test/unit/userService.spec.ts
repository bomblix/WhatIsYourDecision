import { Container } from 'aurelia-dependency-injection';
import { User } from './../../src/model/user';
import { UserService } from './../../src/services/userService';

describe("The UserService", () => {
    let userService: UserService;

    beforeEach(() => {
        new Container().makeGlobal();
        userService = new UserService();
    });

    it("Change user",()=>{
        let user = new User("Tester",1);
        userService.switchUser(user);

        expect(userService.getCurrentUser()).toEqual(user);
    });

});