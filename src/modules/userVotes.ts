import { UserService } from './../services/userService'
import { IssueService } from './../services/issueService'
import { User } from './../model/user'
import { Decision } from './../model/decision'

import { inject } from 'aurelia-framework'

@inject(UserService, IssueService)
export class Votes {

    private currentUser: User;
    private issueService: IssueService;

    private _votes: Decision[];

    get votes() {
        return this._votes;
    }
    constructor(userService: UserService, issueService: IssueService) {
        this.currentUser = userService.getCurrentUser();
        this.issueService = issueService;
    }

    activate() {
        this._votes = this.issueService.getUserDecisions(this.currentUser);
    }

}