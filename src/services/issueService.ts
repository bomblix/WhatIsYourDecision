import { Issue } from '../model/issue';
import { User } from './../model/user';
import { Decision } from './../model/decision';

import { IssueToVote } from './../model/issueToVote';

export class IssueService {
    private _issues: Issue[];

    constructor() {
        this._issues = new Array<Issue>();
    }

    public add(issue: Issue) {
        this._issues.push(issue);
        console.log("New issue added");
    }

    public list() {
        return this._issues;
    }

    public getIssuesToVote(user: User) {
        return this._issues.filter(row => row.canUserVote(user)).map(x => new IssueToVote(x));
    }

    public getUserDecisions(user: User) {
        let result = Array<Decision>();
        this._issues.forEach(x => {
            var decision = x.getUserDecision(user);
            if (decision !== undefined) {
                result.push(decision)
            }
        });
        return result;
    }

    public getAllDecisions() {
        let result = Array<Decision>();
        this._issues.forEach(x => {
            result = result.concat(x.getAllDecision());
        });
        return result;
    }


    public getDecidedIssues() {
        return this._issues.filter(x => x.isDecided);
    }
}