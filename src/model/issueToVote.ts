import { Issue } from './issue';
import { Option } from './option'

export class IssueToVote {
    private _issue: Issue;
    private _selectedOption: Option;

    get issue() {
        return this._issue;
    }

    get selectedOption() {
        return this._selectedOption;
    }

    set selectedOption(value: Option) {
        this._selectedOption = value;
    }

    constructor(issue: Issue) {
        this._issue = issue;
    }
}