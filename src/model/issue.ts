import { User } from './user';
import { Option } from './option';
import { Decision } from './decision';
import { ValidationRules } from 'aurelia-validation';

import { inject } from 'aurelia-framework'

export class Issue {
    private _name: string;
    private _description: string;
    private _author: User;
    private _options: Option[];

    private _requiredUsers: User[];

    get name(): string {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get author(): User {
        return this._author;
    }

    set author(value) {
        this._author = value;
    }

    get options(): Option[] {
        return this._options;
    }

    get numberOfVotes(): number {
        return this.getAllVotes().length;
    }

    get numberOfRequiredVotes(): number {
        return this._requiredUsers.length;
    }

    get isDecided(): boolean {
        return this.numberOfVotes == this.numberOfRequiredVotes;
    }

    get decision(): string {
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

    public canUserVote(user: User): boolean {
        return !this.getAllVotes().some(x => x == user);
    }

    public setRequiredUsers(users: User[]): void {
        this._requiredUsers = users;
    }

    public getUserDecision(user: User): Decision {
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

    public getAllDecision(): Decision[] {
        let decisions = new Array<Decision>();
        let issue = this;

        this._options.forEach(x => {
            x.votes.forEach(y => {
                decisions.push(new Decision(issue, x, y));
            });
        })
        return decisions;
    }

    public addEmptyOption(): void {
        if (this.options.length < 5) {
            this.options.push(new Option());
        }
    }

    public removeOption(option: Option): void {
        let ind = this.options.findIndex(o => o == option)
        if (ind < 0) {
            return;
        }
        this.options.splice(ind,1);
    }

    private getAllVotes(): User[] {
        let array = new Array<User>();
        this._options.forEach(x => array = array.concat(x.votes));
        return array;
    }

}

ValidationRules
    .ensure('name').required()
    .ensure('description').required()
    .ensure('options').required().minItems(2).maxItems(5)
    .on(Issue);