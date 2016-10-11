import { Issue } from '../model/issue';

export class IssueService{
    private issues : Issue[];

    constructor(){
        this.issues = new Array<Issue>();
    }

    add(issue: Issue){
        this.issues.push(issue);
        console.log("New issue added");
    }

    list(){
        return this.issues;
    }

}