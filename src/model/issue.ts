import { User } from './user';
import { Option } from './option';
import { Decision } from './decision';

import { inject } from 'aurelia-framework'

export class Issue {
    private _name: string;
    private _description: string;
    private _author: User;
    private _options: Option[];

    private _requiredUsers: User[];

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get author() {
        return this._author;
    }

    set author(value) {
        this._author = value;
    }

    get options() {
        return this._options;
    }

    get numberOfVotes() {
        return this.getAllVotes().length;
    }

    get numberOfRequiredVotes() {
        return this._requiredUsers.length;
    }

    get isDecided() {
        return this.numberOfVotes == this.numberOfRequiredVotes;
    }

    get decision() {
        // stupid solution ;)
        if (this._options.length == 0) {
            return "";
        }
        let sorted = this._options.sort((x, y) => y.votes.length - x.votes.length);
        return sorted[0].text;
    }

    constructor() {
        this._options = new Array<Option>();
    }

    public canUserVote(user: User) {
        return !this.getAllVotes().some(x => x == user);
    }

    public setRequiredUsers(users: User[]) {
        this._requiredUsers = users;
    }

    public getUserDecision(user: User) {
        let decision = undefined;
        let issue = this;

        for (var i = 0; i < this._options.length; i++) {
            if (this._options[i].votes.some(x => x == user)) {
                decision = new Decision(issue, this._options[i], user);
                break;
            }
        }
        return decision;
    }

    public getAllDecision() {
        let decisions = new Array<Decision>();
        let issue = this;

        this._options.forEach(x => {
            x.votes.forEach(y => {
                decisions.push(new Decision(issue, x, y));
            });
        })
        return decisions;
    }

    private getAllVotes() {
        let array = new Array<User>();
        this._options.forEach(x => array = array.concat(x.votes));
        return array;
    }

}