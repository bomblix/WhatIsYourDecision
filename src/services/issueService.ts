import { Issue } from '../model/issue';
import { User } from './../model/user';
import { Decision } from './../model/decision';
import { Option } from './../model/option';

import { IssueToVote } from './../model/issueToVote';

export class IssueService {
    private _issues: Issue[];

    constructor() {
        this._issues = new Array<Issue>();
    }

    public add(issue: Issue) {
        this._issues.push(issue);
    }

    public list(): Issue[] {
        return this._issues;
    }

    public getIssuesToVote(user: User): IssueToVote[] {
        return this._issues.filter(row => row.canUserVote(user)).map(x => new IssueToVote(x));
    }

    public getUserDecisions(user: User): Decision[] {
        let result = Array<Decision>();
        this._issues.forEach(x => {
            var decision = x.getUserDecision(user);
            if (decision !== undefined) {
                result.push(decision)
            }
        });
        return result;
    }

    public getAllDecisions(): Decision[] {
        let result = Array<Decision>();
        this._issues.forEach(x => {
            result = result.concat(x.getAllDecision());
        });
        return result;
    }


    public getDecidedIssues(): Issue[] {
        return this._issues.filter(x => x.isDecided);
    }

    public vote(issue: Issue, selectedOption: Option, user: User): boolean {
        if (issue.canUserVote(user)) {
            selectedOption.vote(user);
            return true;
        }
        return false;
    }
}