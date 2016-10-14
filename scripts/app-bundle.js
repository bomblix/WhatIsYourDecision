define('model/user',["require", "exports"], function (require, exports) {
    "use strict";
    var User = (function () {
        function User(name, id) {
            this._name = name;
            this._id = id;
        }
        Object.defineProperty(User.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(User.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        return User;
    }());
    exports.User = User;
});

define('services/userService',["require", "exports", './../model/user'], function (require, exports, user_1) {
    "use strict";
    var UserService = (function () {
        function UserService() {
            this.users = [
                new user_1.User("User 1", 1),
                new user_1.User("User 2", 2),
                new user_1.User("User 3", 3),
                new user_1.User("User 4", 4)
            ];
        }
        UserService.prototype.getAllUsers = function () {
            return this.users;
        };
        UserService.prototype.getCurrentUser = function () {
            return this.currentUser;
        };
        UserService.prototype.switchUser = function (user) {
            this.currentUser = user;
        };
        return UserService;
    }());
    exports.UserService = UserService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", './services/userService', 'aurelia-framework'], function (require, exports, userService_1, aurelia_framework_1) {
    "use strict";
    var App = (function () {
        function App(UserService) {
            console.log(UserService);
            this.userService = UserService;
            this.users = this.userService.getAllUsers();
        }
        App.prototype.activate = function () {
            this.userService.switchUser(this.users[0]);
        };
        App.prototype.configureRouter = function (config, router) {
            config.title = 'List of issues';
            config.map([
                { route: [''], name: 'home', moduleId: './modules/home', nav: true, title: 'Home' },
                { route: ['issues'], name: 'issues', moduleId: './modules/issues', nav: true, title: 'Issues' },
                { route: ['todecide'], name: 'todecide', moduleId: './modules/toDecideIssues', nav: true, title: 'To decide' },
                { route: ['userVotes'], name: 'userVotes', moduleId: './modules/userVotes', nav: true, title: 'My votes' },
                { route: ['votes'], name: 'votes', moduleId: './modules/votes', nav: true, title: 'Votes' },
                { route: ['decisions'], name: 'decisions', moduleId: './modules/decisions', nav: true, title: 'Decisions' },
            ]);
            this.router = router;
        };
        App.prototype.setUser = function () {
            this.userService.switchUser(this.currentUser);
            this.router.navigateToRoute("home");
        };
        App = __decorate([
            aurelia_framework_1.inject(userService_1.UserService), 
            __metadata('design:paramtypes', [Object])
        ], App);
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('model/option',["require", "exports"], function (require, exports) {
    "use strict";
    var Option = (function () {
        function Option() {
            this._votes = new Array();
        }
        Object.defineProperty(Option.prototype, "votes", {
            get: function () {
                return this._votes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Option.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (value) {
                this._text = value;
            },
            enumerable: true,
            configurable: true
        });
        Option.prototype.vote = function (user) {
            this._votes.push(user);
        };
        return Option;
    }());
    exports.Option = Option;
});

define('model/issue',["require", "exports", './decision'], function (require, exports, decision_1) {
    "use strict";
    var Issue = (function () {
        function Issue() {
            this._options = new Array();
        }
        Object.defineProperty(Issue.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                this._name = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Issue.prototype, "description", {
            get: function () {
                return this._description;
            },
            set: function (value) {
                this._description = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Issue.prototype, "author", {
            get: function () {
                return this._author;
            },
            set: function (value) {
                this._author = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Issue.prototype, "options", {
            get: function () {
                return this._options;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Issue.prototype, "numberOfVotes", {
            get: function () {
                return this.getAllVotes().length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Issue.prototype, "numberOfRequiredVotes", {
            get: function () {
                return this._requiredUsers.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Issue.prototype, "isDecided", {
            get: function () {
                return this.numberOfVotes == this.numberOfRequiredVotes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Issue.prototype, "decision", {
            get: function () {
                if (this._options.length == 0) {
                    return "";
                }
                var sorted = this._options.sort(function (x, y) { return y.votes.length - x.votes.length; });
                return sorted[0].text;
            },
            enumerable: true,
            configurable: true
        });
        Issue.prototype.canUserVote = function (user) {
            return !this.getAllVotes().some(function (x) { return x == user; });
        };
        Issue.prototype.setRequiredUsers = function (users) {
            this._requiredUsers = users;
        };
        Issue.prototype.getUserDecision = function (user) {
            var decision = undefined;
            var issue = this;
            for (var i = 0; i < this._options.length; i++) {
                if (this._options[i].votes.some(function (x) { return x == user; })) {
                    decision = new decision_1.Decision(issue, this._options[i], user);
                    break;
                }
            }
            return decision;
        };
        Issue.prototype.getAllDecision = function () {
            var decisions = new Array();
            var issue = this;
            this._options.forEach(function (x) {
                x.votes.forEach(function (y) {
                    decisions.push(new decision_1.Decision(issue, x, y));
                });
            });
            return decisions;
        };
        Issue.prototype.getAllVotes = function () {
            var array = new Array();
            this._options.forEach(function (x) { return array = array.concat(x.votes); });
            return array;
        };
        return Issue;
    }());
    exports.Issue = Issue;
});

define('model/decision',["require", "exports"], function (require, exports) {
    "use strict";
    var Decision = (function () {
        function Decision(issue, option, user) {
            this._issue = issue;
            this._option = option;
            this._user = user;
        }
        Object.defineProperty(Decision.prototype, "issue", {
            get: function () {
                return this._issue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Decision.prototype, "option", {
            get: function () {
                return this._option;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Decision.prototype, "userName", {
            get: function () {
                return this._user.name;
            },
            enumerable: true,
            configurable: true
        });
        return Decision;
    }());
    exports.Decision = Decision;
});

define('model/issueToVote',["require", "exports"], function (require, exports) {
    "use strict";
    var IssueToVote = (function () {
        function IssueToVote(issue) {
            this._issue = issue;
        }
        Object.defineProperty(IssueToVote.prototype, "issue", {
            get: function () {
                return this._issue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IssueToVote.prototype, "selectedOption", {
            get: function () {
                return this._selectedOption;
            },
            set: function (value) {
                this._selectedOption = value;
            },
            enumerable: true,
            configurable: true
        });
        return IssueToVote;
    }());
    exports.IssueToVote = IssueToVote;
});

define('services/issueService',["require", "exports", './../model/issueToVote'], function (require, exports, issueToVote_1) {
    "use strict";
    var IssueService = (function () {
        function IssueService() {
            this._issues = new Array();
        }
        IssueService.prototype.add = function (issue) {
            this._issues.push(issue);
        };
        IssueService.prototype.list = function () {
            return this._issues;
        };
        IssueService.prototype.getIssuesToVote = function (user) {
            return this._issues.filter(function (row) { return row.canUserVote(user); }).map(function (x) { return new issueToVote_1.IssueToVote(x); });
        };
        IssueService.prototype.getUserDecisions = function (user) {
            var result = Array();
            this._issues.forEach(function (x) {
                var decision = x.getUserDecision(user);
                if (decision !== undefined) {
                    result.push(decision);
                }
            });
            return result;
        };
        IssueService.prototype.getAllDecisions = function () {
            var result = Array();
            this._issues.forEach(function (x) {
                result = result.concat(x.getAllDecision());
            });
            return result;
        };
        IssueService.prototype.getDecidedIssues = function () {
            return this._issues.filter(function (x) { return x.isDecided; });
        };
        IssueService.prototype.vote = function (issue, selectedOption, user) {
            if (issue.canUserVote(user)) {
                selectedOption.vote(user);
                return true;
            }
            return false;
        };
        return IssueService;
    }());
    exports.IssueService = IssueService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('modules/decisions',["require", "exports", './../services/issueService', 'aurelia-framework'], function (require, exports, issueService_1, aurelia_framework_1) {
    "use strict";
    var Decisions = (function () {
        function Decisions(issueService) {
            this.issueService = issueService;
        }
        Object.defineProperty(Decisions.prototype, "issues", {
            get: function () {
                return this._issues;
            },
            enumerable: true,
            configurable: true
        });
        Decisions.prototype.activate = function () {
            this._issues = this.issueService.getDecidedIssues();
        };
        Decisions = __decorate([
            aurelia_framework_1.inject(issueService_1.IssueService), 
            __metadata('design:paramtypes', [issueService_1.IssueService])
        ], Decisions);
        return Decisions;
    }());
    exports.Decisions = Decisions;
});

define('modules/home',["require", "exports"], function (require, exports) {
    "use strict";
    var Home = (function () {
        function Home() {
        }
        return Home;
    }());
    exports.Home = Home;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('modules/issues',["require", "exports", './../services/issueService', './../model/issue', './../services/userService', './../model/option', 'aurelia-framework'], function (require, exports, issueService_1, issue_1, userService_1, option_1, aurelia_framework_1) {
    "use strict";
    var Issues = (function () {
        function Issues(userService, issueService) {
            this._issueService = issueService;
            this._userService = userService;
        }
        Object.defineProperty(Issues.prototype, "newIssue", {
            get: function () {
                return this._newIssue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Issues.prototype, "issues", {
            get: function () {
                return this._issues;
            },
            enumerable: true,
            configurable: true
        });
        Issues.prototype.activate = function () {
            this._issues = this._issueService.list();
            this._newIssue = new issue_1.Issue();
        };
        Issues.prototype.addIssue = function () {
            this._newIssue.author = this._userService.currentUser;
            this._newIssue.setRequiredUsers(this._userService.getAllUsers());
            this._issueService.add(this._newIssue);
            this._newIssue = new issue_1.Issue();
        };
        Issues.prototype.addOption = function () {
            this._newIssue.options.push(new option_1.Option());
        };
        Issues = __decorate([
            aurelia_framework_1.inject(userService_1.UserService, issueService_1.IssueService), 
            __metadata('design:paramtypes', [userService_1.UserService, issueService_1.IssueService])
        ], Issues);
        return Issues;
    }());
    exports.Issues = Issues;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('modules/toDecideIssues',["require", "exports", './../services/userService', './../services/issueService', 'aurelia-framework'], function (require, exports, userService_1, issueService_1, aurelia_framework_1) {
    "use strict";
    var ToDecideIssues = (function () {
        function ToDecideIssues(userService, issueService) {
            this._issueService = issueService;
            this._userService = userService;
        }
        ToDecideIssues.prototype.activate = function () {
            this.issues = this._issueService.getIssuesToVote(this._userService.getCurrentUser());
        };
        ToDecideIssues.prototype.vote = function (issueToVote) {
            var user = this._userService.getCurrentUser();
            if (this._issueService.vote(issueToVote.issue, issueToVote.selectedOption, user)) {
                this.issues = this._issueService.getIssuesToVote(this._userService.getCurrentUser());
            }
        };
        ToDecideIssues = __decorate([
            aurelia_framework_1.inject(userService_1.UserService, issueService_1.IssueService), 
            __metadata('design:paramtypes', [userService_1.UserService, issueService_1.IssueService])
        ], ToDecideIssues);
        return ToDecideIssues;
    }());
    exports.ToDecideIssues = ToDecideIssues;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('modules/userVotes',["require", "exports", './../services/userService', './../services/issueService', 'aurelia-framework'], function (require, exports, userService_1, issueService_1, aurelia_framework_1) {
    "use strict";
    var Votes = (function () {
        function Votes(userService, issueService) {
            this.currentUser = userService.getCurrentUser();
            this.issueService = issueService;
        }
        Object.defineProperty(Votes.prototype, "votes", {
            get: function () {
                return this._votes;
            },
            enumerable: true,
            configurable: true
        });
        Votes.prototype.activate = function () {
            this._votes = this.issueService.getUserDecisions(this.currentUser);
        };
        Votes = __decorate([
            aurelia_framework_1.inject(userService_1.UserService, issueService_1.IssueService), 
            __metadata('design:paramtypes', [userService_1.UserService, issueService_1.IssueService])
        ], Votes);
        return Votes;
    }());
    exports.Votes = Votes;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('modules/votes',["require", "exports", './../services/issueService', 'aurelia-framework'], function (require, exports, issueService_1, aurelia_framework_1) {
    "use strict";
    var Votes = (function () {
        function Votes(issueService) {
            this.issueService = issueService;
        }
        Object.defineProperty(Votes.prototype, "votes", {
            get: function () {
                return this._votes;
            },
            enumerable: true,
            configurable: true
        });
        Votes.prototype.activate = function () {
            this._votes = this.issueService.getAllDecisions();
        };
        Votes = __decorate([
            aurelia_framework_1.inject(issueService_1.IssueService), 
            __metadata('design:paramtypes', [issueService_1.IssueService])
        ], Votes);
        return Votes;
    }());
    exports.Votes = Votes;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\t<require from=\"bootstrap/css/bootstrap.css\"></require>\n\n\t<div class=\"container\">\n\t\t<nav class=\"navbar navbar-default\">\n\t\t\t<div class=\"container-fluid\">\n\t\t\t\t<!-- Brand and toggle get grouped for better mobile display -->\n\t\t\t\t<div class=\"navbar-header\">\n\t\t\t\t\t<button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\"\n\t\t\t\t\t\taria-expanded=\"false\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n\t\t\t\t\t<a class=\"navbar-brand\" href=\"#\">What is your decision?</a>\n\t\t\t\t</div>\n\n\t\t\t\t<!-- Collect the nav links, forms, and other content for toggling -->\n\t\t\t\t<div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n\t\t\t\t\t<ul class=\"nav navbar-nav\">\n\t\t\t\t\t\t<li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n\t\t\t\t\t\t\t<a href.bind=\"row.href\">${row.title}</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\n\t\t\t\t\t<form class=\"navbar-form navbar-right\">\n\t\t\t\t\t\t<select value.bind=\"currentUser\" change.trigger=\"setUser()\">\n        \t\t\t\t\t<option repeat.for=\"item of users\" model.bind=\"item\">${item.name}</option>\n     \t\t\t\t\t</select>\n\t\t\t\t\t</form>\n\n\t\t\t\t</div>\n\t\t\t\t<!-- /.navbar-collapse -->\n\t\t\t</div>\n\t\t\t<!-- /.container-fluid -->\n\t\t</nav>\n\n\t\t<div class=\"page-host\">\n\t\t\t<router-view></router-view>\n\t\t</div>\n\n\t</div>\n\n\t<footer class=\"footer text-center\">\n\t\tPowered by WhatIsYourDecision team\n\t</footer>\n\n</template>"; });
define('text!modules/decisions.html', ['module'], function(module) { module.exports = "<template>\r\n\t<h3>Decisions</h3>\r\n\r\n\t<div repeat.for=\"item of issues\">\r\n\t\t<div class=\"list-group\">\r\n\t\t\t<div class=\"list-group-item\">\r\n\t\t\t\t<dl>\r\n\t\t\t\t\t<dt>${item.name}</dt>\r\n\t\t\t\t\t<dd>${item.description}</dd>\r\n\r\n\t\t\t\t\t<dd>Decision: <strong>${item.decision}</strong></dd>\r\n\t\t\t\t</dl>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template>\r\n    Welcome in the WhatIsYourDecision application.\r\n</template>"; });
define('text!modules/issues.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n\t<h3>Add new issue</h3>\r\n\r\n\t<form submit.trigger=\"addIssue()\" class=\"form-horizontal\">\r\n\t\t<div class=\"form-group\">\r\n\t\t\t<label for=\"issueName\" class=\"col-sm-2 control-label\">Name</label>\r\n\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t<input type=\"text\" value.bind=\"newIssue.name\" id=\"issueName\" class=\"form-control\" />\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"form-group\">\r\n\t\t\t<label for=\"issueDesription\" class=\"col-sm-2 control-label\">Desciption</label>\r\n\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t<textarea value.bind=\"newIssue.description\" id=\"issueDesription\" class=\"form-control\"></textarea>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"form-group\">\r\n\t\t\t<label for=\"issueDesription\" class=\"col-sm-2 control-label\">Options</label>\r\n\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t<template repeat.for=\"item of newIssue.options\">\r\n\t\t\t\t\t<input type=\"text\" value.bind=\"item.text\">\r\n\t\t\t\t</template>\r\n\t\t\t\t<button click.delegate=\"addOption()\">+</button>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"form-group\">\r\n\t\t\t<div class=\"col-sm-offset-2 col-sm-10\">\r\n\t\t\t\t<button type=\"submit\" class=\"btn btn-default\">Add issue</button>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</form>\r\n\r\n\t<div repeat.for=\"item of issues\">\r\n\t\t<div class=\"list-group\">\r\n\t\t\t<div class=\"list-group-item\">\r\n\t\t\t\t<dl>\r\n\t\t\t\t\t<dt> <span show.bind=\"item.isDecided\" class=\"label label-success\">Decided</span> ${item.name} by <cite>${item.author.name}</cite></dt>\r\n\t\t\t\t\t<dd>${item.description}</dd>\r\n\t\t\t\t\t<ul repeat.for=\"option of item.options \">\r\n\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\t${option.text} [${option.votes.length}]\r\n\t\t\t\t\t\t</li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t\t<dd>Votes ${item.numberOfVotes} / ${item.numberOfRequiredVotes}</dd>\r\n\t\t\t\t</dl>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>"; });
define('text!modules/toDecideIssues.html', ['module'], function(module) { module.exports = "<template>\r\n\t<h3>List of issues waiting for your decision</h3>\r\n\r\n\t<div repeat.for=\"item of issues\">\r\n\t\t<div class=\"list-group\">\r\n\t\t\t<div class=\"list-group-item\">\r\n\t\t\t\t<dl>\r\n\t\t\t\t\t<dt>${item.issue.name} by <cite>${item.issue.author.name}</cite></dt>\r\n\t\t\t\t\t<dd>${item.issue.description}</dd>\r\n\t\t\t\t\t<form submit.delegate=\"vote(item)\">\r\n\t\t\t\t\t\t<ul repeat.for=\"option of item.issue.options \">\r\n\t\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\t\t<input type=\"radio\" model.bind=\"option\" name=\"options\" checked.bind=\"item.selectedOption\" /> ${option.text}\r\n\t\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t<button class=\"btn btn-default\">Vote</button>\r\n\t\t\t\t\t</form>\r\n\t\t\t\t</dl>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n</template>"; });
define('text!modules/userVotes.html', ['module'], function(module) { module.exports = "<template>\r\n\t<h3>My votes</h3>\r\n\r\n\t<div repeat.for=\"item of votes\">\r\n\t\t<div class=\"list-group\">\r\n\t\t\t<div class=\"list-group-item\">\r\n\t\t\t\t<dl>\r\n\t\t\t\t\t<dt>${item.issue.name}</dt>\r\n\t\t\t\t\t<dd>${item.issue.description}</dd>\r\n\r\n\t\t\t\t\t<dd>Your vote: <strong>${item.option.text}</strong></dd>\r\n\t\t\t\t</dl>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>"; });
define('text!modules/votes.html', ['module'], function(module) { module.exports = "<template>\r\n\t<h3>All votes</h3>\r\n\r\n\t<div repeat.for=\"item of votes\">\r\n\t\t<div class=\"list-group\">\r\n\t\t\t<div class=\"list-group-item\">\r\n\t\t\t\t<dl>\r\n\t\t\t\t\t<dt>${item.issue.name}</dt>\r\n\t\t\t\t\t<dd>${item.issue.description}</dd>\r\n\r\n\t\t\t\t\t<dd>User ${item.userName} voted: <strong>${item.option.text}</strong></dd>\r\n\t\t\t\t</dl>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map