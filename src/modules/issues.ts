import { IssueService } from './../services/issueService';
import { Issue } from './../model/issue';
import { User } from './../model/user';
import { UserService } from './../services/userService'
import { Option } from './../model/option'
import { inject, NewInstance } from 'aurelia-framework';

import { ValidationController } from 'aurelia-validation';

@inject(UserService, IssueService, NewInstance.of(ValidationController))
export class Issues {
    private _issues: Issue[];
    private _issueService: IssueService;
    private _userService: UserService;
    private _newIssue: Issue;
    private _currentUser: User;
    private _validationController: ValidationController;
    private _isErrorVisible: boolean;

    get validationController() {
        return this._validationController;
    }

    get newIssue() {
        return this._newIssue;
    }

    get issues() {
        return this._issues;
    }

    get isErrorVisible() {
        return this._isErrorVisible;
    }

    constructor(userService: UserService, issueService: IssueService, validationController: ValidationController) {
        this._issueService = issueService;
        this._userService = userService;
        this._validationController = validationController;
    }

    activate() {
        this._issues = this._issueService.list();
        this._newIssue = new Issue();
    }

    public addIssue() {
        this._newIssue.author = this._userService.currentUser;
        this._newIssue.setRequiredUsers(this._userService.getAllUsers());

        this._validationController.validate().then(resul => {
            if (resul.length == 0) {
                this._issueService.add(this._newIssue);
                this._newIssue = new Issue();
                this._isErrorVisible = false;
            } else {
                this._isErrorVisible = true;
            }
        });
    }

    public addOption() {
        this._newIssue.addEmptyOption();
    }

    public removeOption(option:Option){
        this._newIssue.removeOption(option);
    }
}