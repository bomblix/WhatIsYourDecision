import { IssueService } from './../services/issueService';
import { Issue } from './../model/issue';
import { User } from './../model/user';
import { UserService } from './../services/userService'
import { Option } from './../model/option'
import { inject } from 'aurelia-framework';

@inject(UserService, IssueService)

export class Issues {
    private _issues: Issue[];
    private _issueService: IssueService;
    private _userService: UserService;
    private _newIssue: Issue;
    private _currentUser: User;

    get newIssue() {
        return this._newIssue;
    }

    get issues() {
        return this._issues;
    }

    constructor(userService: UserService, issueService: IssueService) {
        this._issueService = issueService;
        this._userService = userService;
    }

    activate() {
        this._issues = this._issueService.list();
        this._newIssue = new Issue();
    }

    public addIssue() {
        this._newIssue.author = this._userService.currentUser;
        this._newIssue.setRequiredUsers(this._userService.getAllUsers());

        this._issueService.add(this._newIssue);
        this._newIssue = new Issue();
    }

    public addOption() {
        this._newIssue.options.push(new Option());
    }
}