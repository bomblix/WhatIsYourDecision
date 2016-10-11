import { User } from './user';
import { Option } from './option';
import { inject } from 'aurelia-framework'

export class Issue {
    name: string;
    description: string;
    author: User;
    optionsFlat: string;
    options: Option[];

    constructor(){   
        this.options = new Array<Option>();
        console.log("Options created");
    }
}