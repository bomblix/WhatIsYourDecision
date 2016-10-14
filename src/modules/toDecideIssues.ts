import { UserService } from './../services/userService'
import { IssueService } from './../services/issueService'
import { IssueToVote } from './../model/issueToVote'

import { inject } from 'aurelia-framework';

@inject(UserService, IssueService)

export class ToDecideIssues {
    private _issueService: IssueService;
    private _userService: UserService;

    issues: IssueToVote[];

    constructor(userService: UserService, issueService: IssueService) {
        this._issueService = issueService;
        this._userService = userService;
    }

    activate() {
        this.issues = this._issueService.getIssuesToVote(this._userService.getCurrentUser());
    }

    public vote(issueToVote: IssueToVote) {
        let user = this._userService.getCurrentUser();
        if (this._issueService.vote(issueToVote.issue, issueToVote.selectedOption, user)) {
            this.issues = this._issueService.getIssuesToVote(this._userService.getCurrentUser());
        }
    }
}