export class User {

    private _name: string;
    private _id: Number;

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    constructor(name: string, id: Number) {
        this._name = name;
        this._id = id;
    }
}