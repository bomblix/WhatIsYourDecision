
import { Container } from 'aurelia-dependency-injection';
import { IssueService } from './../../src/services/issueService';
import { Issue } from './../../src/model/issue';
import { Option } from './../../src/model/option';
import { User } from './../../src/model/user';

describe("The IssueService", () => {
    let issueService: IssueService;
    let testUsers: User[] = [new User("tester", 1), new User("tester_2", 2)];
    let createIssue = (): Issue => {
        let issue = new Issue();
        issue.name = "Test";
        issue.description = "Description";

        let option1 = new Option();
        option1.text = "Option1";
        issue.options.push(option1);

        let option2 = new Option();
        option2.text = "Option2";
        issue.options.push(option2);
        issue.setRequiredUsers(testUsers);

        return issue;
    };

    beforeEach(() => {
        new Container().makeGlobal();
        issueService = new IssueService();
    });

    it('Add new issue', () => {
        issueService.add(createIssue());
        expect(issueService.list().length).toEqual(1);
    });

    it('Vote', () => {
        let issue = createIssue();
        issueService.add(issue);
        issueService.vote(issue, issue.options[0], testUsers[0])

        expect(issueService.getAllDecisions().length).toEqual(1);
    });

    it('Double vote with one user', () => {
        let issue = createIssue();
        issueService.add(issue);
        issueService.vote(issue, issue.options[0], testUsers[0])
        issueService.vote(issue, issue.options[0], testUsers[0])

        expect(issueService.getAllDecisions().length).toEqual(1);
    });

    it('Issue should not be decided', () => {
        let issue = createIssue();
        issueService.add(issue);
        issueService.vote(issue, issue.options[0], testUsers[0])

        expect(issue.isDecided).toEqual(false);
    });

    it('Issue should be decided', () => {
        let issue = createIssue();
        issueService.add(issue);
        issueService.vote(issue, issue.options[0], testUsers[0])
        issueService.vote(issue, issue.options[0], testUsers[1])

        expect(issue.isDecided).toEqual(true);
    });

    it('Get decision', () => {
        let issue = createIssue();
        issueService.add(issue);
        issueService.vote(issue, issue.options[0], testUsers[0])
        issueService.vote(issue, issue.options[0], testUsers[1])

        expect(issue.decision).toEqual(issue.options[0].text);
    });

});
