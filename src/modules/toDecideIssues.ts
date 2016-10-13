import { UserService } from './../services/userService'
import { IssueService } from './../services/issueService'
import { IssueToVote } from './../model/issueToVote'

import { inject } from 'aurelia-framework';

@inject(UserService, IssueService)

export class ToDecideIssues {
    issueService: IssueService;
    userService: UserService;

    issues: IssueToVote[];

    constructor(userService: UserService, issueService: IssueService) {
        this.issueService = issueService;
        this.userService = userService;
    }

    activate() {
        this.issues = this.issueService.getIssuesToVote(this.userService.getCurrentUser());
    }

    public vote(issueToVote: IssueToVote) {
        let user = this.userService.getCurrentUser();
        if (issueToVote.issue.canUserVote(user)) {
            issueToVote.selectedOption.vote(user);
            this.issues = this.issueService.getIssuesToVote(this.userService.getCurrentUser());
        }
    }
}