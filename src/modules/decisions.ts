import { IssueService } from './../services/issueService'
import { Issue } from './../model/issue'

import { inject } from 'aurelia-framework'

@inject(IssueService)
export class Decisions {

    private issueService: IssueService;

    private _issues: Issue[];

    get issues() {
        return this._issues;
    }
    constructor(issueService: IssueService) {
        this.issueService = issueService;
    }

    activate() {
        this._issues = this.issueService.getDecidedIssues();
    }
}