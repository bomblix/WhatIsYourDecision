import {User} from './user';

export class Option {
    private _text: string;
    private _votes: User[];

    get votes(){
        return this._votes;
    }

    get text(){
        return this._text;
    }
    
    set text(value){
        this._text = value;
    }

    constructor(){
        this._votes = new Array<User>();
    }

    public vote(user:User){
        this._votes.push(user);
    }
}