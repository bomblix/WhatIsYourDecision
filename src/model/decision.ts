import { Issue } from './issue'
import { Option } from './option'
import { User } from './user';

export class Decision {

    private _issue: Issue;
    private _option: Option;
    private _user: User;

    get issue(): Issue {
        return this._issue;
    }

    get option(): Option {
        return this._option;
    }

    get userName(): string {
        return this._user.name;
    }

    constructor(issue: Issue, option: Option, user: User) {
        this._issue = issue;
        this._option = option;
        this._user = user;
    }
}