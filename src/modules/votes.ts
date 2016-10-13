import { UserService } from './../services/userService'
import { IssueService } from './../services/issueService'
import { Decision } from './../model/decision'

import { inject } from 'aurelia-framework'

@inject(IssueService)
export class Votes {

    private issueService: IssueService;

    private _votes: Decision[];

    get votes() {
        return this._votes;
    }
    constructor(issueService: IssueService) {
        this.issueService = issueService;
    }

    activate() {
        this._votes = this.issueService.getAllDecisions();
    }

}