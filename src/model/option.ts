import { User } from './user';

export class Option {
    private _text: string;
    private _votes: User[];

    get votes(): User[] {
        return this._votes;
    }

    get text(): string {
        return this._text;
    }

    set text(value) {
        this._text = value;
    }

    constructor() {
        this._votes = new Array<User>();
    }

    public vote(user: User): void {
        this._votes.push(user);
    }
}