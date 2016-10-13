import { UserService } from './../services/userService'
import { IssueService } from './../services/issueService'
import { User } from './../model/user'
import { Issue } from './../model/issue'

import { inject } from 'aurelia-framework'

@inject(UserService, IssueService)
export class Decisions {

    private currentUser: User;
    private issueService: IssueService;

    private _issues: Issue[];

    get issues() {
        return this._issues;
    }
    constructor(userService: UserService, issueService: IssueService) {
        this.currentUser = userService.getCurrentUser();
        this.issueService = issueService;
    }

    activate() {
        this._issues = this.issueService.getDecidedIssues();
    }
}