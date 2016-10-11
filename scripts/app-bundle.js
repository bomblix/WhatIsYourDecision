define('model/user',["require", "exports"], function (require, exports) {
    "use strict";
    var User = (function () {
        function User(name, id) {
            this.name = name;
            this.id = id;
        }
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
                { route: ['decisions'], name: 'decisions', moduleId: './modules/decisions', nav: true, title: 'My decisions' },
            ]);
            this.router = router;
        };
        App.prototype.setUser = function () {
            this.userService.switchUser(this.currentUser);
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
        function Option(value) {
            this.value = value;
        }
        return Option;
    }());
    exports.Option = Option;
});

define('model/issue',["require", "exports"], function (require, exports) {
    "use strict";
    var Issue = (function () {
        function Issue() {
        }
        Issue.prototype.splitOptions = function () {
        };
        return Issue;
    }());
    exports.Issue = Issue;
});

define('modules/decisions',["require", "exports"], function (require, exports) {
    "use strict";
    var Decisions = (function () {
        function Decisions() {
        }
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

define('services/issueService',["require", "exports"], function (require, exports) {
    "use strict";
    var IssueService = (function () {
        function IssueService() {
            this.issues = new Array();
        }
        IssueService.prototype.add = function (issue) {
            this.issues.push(issue);
            console.log("New issue added");
        };
        IssueService.prototype.list = function () {
            return this.issues;
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
define('modules/issues',["require", "exports", './../services/issueService', './../services/userService', 'aurelia-framework'], function (require, exports, issueService_1, userService_1, aurelia_framework_1) {
    "use strict";
    var Issues = (function () {
        function Issues(userService, issueService) {
            this.issueService = issueService;
            this.userService = userService;
        }
        Issues.prototype.activate = function () {
            this.issues = this.issueService.list();
        };
        Issues.prototype.addIssue = function () {
            this.newIssue.author = this.userService.currentUser;
            this.issueService.add(this.newIssue);
            this.newIssue = null;
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
            this.issueService = issueService;
            this.userService = userService;
        }
        ToDecideIssues = __decorate([
            aurelia_framework_1.inject(userService_1.UserService, issueService_1.IssueService), 
            __metadata('design:paramtypes', [userService_1.UserService, issueService_1.IssueService])
        ], ToDecideIssues);
        return ToDecideIssues;
    }());
    exports.ToDecideIssues = ToDecideIssues;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\t<require from=\"bootstrap/css/bootstrap.css\"></require>\n\n\t<div class=\"container\">\n\t\t<nav class=\"navbar navbar-default\">\n\t\t\t<div class=\"container-fluid\">\n\t\t\t\t<!-- Brand and toggle get grouped for better mobile display -->\n\t\t\t\t<div class=\"navbar-header\">\n\t\t\t\t\t<button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\"\n\t\t\t\t\t\taria-expanded=\"false\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n\t\t\t\t\t<a class=\"navbar-brand\" href=\"#\">What is your decision?</a>\n\t\t\t\t</div>\n\n\t\t\t\t<!-- Collect the nav links, forms, and other content for toggling -->\n\t\t\t\t<div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n\t\t\t\t\t<ul class=\"nav navbar-nav\">\n\t\t\t\t\t\t<li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n\t\t\t\t\t\t\t<a href.bind=\"row.href\">${row.title}</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\n\t\t\t\t\t<form class=\"navbar-form navbar-right\">\n\t\t\t\t\t\t<select value.bind=\"currentUser\" change.trigger=\"setUser()\">\n        <option repeat.for=\"item of users\" model.bind=\"item\">${item.name}</option>\n      </select>\n\t\t\t\t\t</form>\n\n\t\t\t\t</div>\n\t\t\t\t<!-- /.navbar-collapse -->\n\t\t\t</div>\n\t\t\t<!-- /.container-fluid -->\n\t\t</nav>\n\n\t\t<div class=\"page-host\">\n\t\t\t<router-view></router-view>\n\t\t</div>\n\n\t</div>\n\n\t<footer class=\"footer text-center\">\n\t\tPowered by WhatIsYourDecision team\n\t</footer>\n\n</template>"; });
define('text!modules/decisions.html', ['module'], function(module) { module.exports = "<template>\r\n    your decisions\r\n</template>"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template>\r\n    Welcom in WhatIsYourDecision application.\r\n</template>"; });
define('text!modules/issues.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n\t<h3>Add new issue</h3>\r\n\r\n\t<form submit.trigger=\"addIssue()\" class=\"form-horizontal\">\r\n\t\t<div class=\"form-group\">\r\n\t\t\t<label for=\"issueName\" class=\"col-sm-2 control-label\">Name</label>\r\n\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t<input type=\"text\" value.bind=\"newIssue.name\" id=\"issueName\" class=\"form-control\" />\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"form-group\">\r\n\t\t\t<label for=\"issueDesription\" class=\"col-sm-2 control-label\">Desciption</label>\r\n\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t<textarea value.bind=\"newIssue.description\" id=\"issueDesription\" class=\"form-control\"></textarea>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"form-group\">\r\n\t\t\t<label for=\"issueDesription\" class=\"col-sm-2 control-label\">Options</label>\r\n\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t<input type=\"text\" value.bind=\"newIssue.optionsFlat\" id=\"issueOptions\" class=\"form-control\" />\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"form-group\">\r\n\t\t\t<div class=\"col-sm-offset-2 col-sm-10\">\r\n\t\t\t\t<button type=\"submit\" class=\"btn btn-default\">Add issue</button>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</form>\r\n\r\n\t<div repeat.for=\"item of issues\">\r\n\t\t<div class=\"list-group\">\r\n\t\t\t<div class=\"list-group-item\">\r\n\t\t\t\t<dl>\r\n\t\t\t\t\t<dt>${item.name} by <cite>${item.author.name}</cite></dt>\r\n\t\t\t\t\t<dd>${item.description}</dd>\r\n\t\t\t\t</dl>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>"; });
define('text!modules/toDecideIssues.html', ['module'], function(module) { module.exports = "<template>\r\n    List of issues waiting for your decision\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map