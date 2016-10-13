import { User } from './model/user';
import { RouterConfiguration, Router } from 'aurelia-router';
import { UserService } from './services/userService'
import { inject } from 'aurelia-framework';

@inject(UserService)

export class App {

  router: Router;
  userService: UserService;
  users: User[];
  currentUser: User;

  constructor(UserService) {
    console.log(UserService);
    this.userService = UserService;
    this.users = this.userService.getAllUsers();
  }

  activate() {
    // default currentUser is the first user;
    this.userService.switchUser(this.users[0]);
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'List of issues';
    config.map([
      { route: [''], name: 'home', moduleId: './modules/home', nav: true, title: 'Home' },
      { route: ['issues'], name: 'issues', moduleId: './modules/issues', nav: true, title: 'Issues' },
      { route: ['todecide'], name: 'todecide', moduleId: './modules/toDecideIssues', nav: true, title: 'To decide' },
      { route: ['userVotes'], name: 'userVotes', moduleId: './modules/userVotes', nav: true, title: 'My votes' },
      { route: ['votes'], name: 'votes', moduleId: './modules/votes', nav: true, title: 'Votes' },
      { route: ['decisions'], name: 'decisions', moduleId: './modules/decisions', nav: true, title: 'Decisions' },
    ]);

    this.router = router;
  }

  setUser() {
    this.userService.switchUser(this.currentUser);
    this.router.navigateToRoute("home");
  }
}
