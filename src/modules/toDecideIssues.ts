import { UserService } from './../services/userService'
import { IssueService } from './../services/issueService'
import { inject } from 'aurelia-framework';

@inject(UserService, IssueService)

export class ToDecideIssues {
    issueService: IssueService;
    userService: UserService;

    constructor(userService: UserService, issueService: IssueService) {
        this.issueService = issueService;
        this.userService = userService;
    }
}