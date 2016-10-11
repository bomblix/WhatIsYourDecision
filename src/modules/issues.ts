import { IssueService } from './../services/issueService';
import { Issue } from './../model/issue';
import { User } from './../model/user';
import { UserService } from './../services/userService'
import { inject } from 'aurelia-framework';

@inject(UserService, IssueService)

export class Issues {
    issues: Issue[];
    issueService: IssueService;
    userService: UserService;
    newIssue: Issue;
    currentUser: User;

    constructor(userService: UserService, issueService: IssueService) {
        this.issueService = issueService;
        this.userService = userService;
    }

    activate(){
        this.issues = this.issueService.list();
    }

    addIssue() {
        this.newIssue.author = this.userService.currentUser;
        this.issueService.add(this.newIssue);
        this.newIssue = null;
    }
}