/**
 * Created by mkhymochka on 26.07.2016.
 */
mainApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/home', {
        title:"Responsible Gambling with CrownBet",
        templateUrl:"./js/views/home/home.html",
        controller: "HomeController"
    }).
    when('/fostering-responsible-gambling/commitment', {
        title:"CrownBet’s Customer Commitment",
        templateUrl: './js/views/ourCommitment/policy.html',
        controller: 'OurCommitmentController'
    }).
    when('/fostering-responsible-gambling/greater-control', {
        title:"Opting Out of Marketing",
        templateUrl: './js/views/ourCommitment/codeOfPractice.html',
        controller: 'OurCommitmentController'
    }).
    when('/fostering-responsible-gambling/voluntary-measures', {
        title:"Responsible Gambling Measures",
        templateUrl: './js/views/ourCommitment/voluntaryMeasures.html',
        controller: 'OurCommitmentController'
    }).
    when('/staying-in-control/track-your-spending', {
        title:"Track Your Spending",
        templateUrl: './js/views/stayingInControl/accountDetails.html',
        controller: 'StayingInControlController'
    }).
    when('/staying-in-control/deposit-limits', {
        title:"Setting Deposit Limits",
        templateUrl: './js/views/stayingInControl/depositLimits.html',
        controller: 'StayingInControlController'
    }).
    when('/staying-in-control/take-a-break', {
        title:"Take A Break",
        templateUrl: './js/views/stayingInControl/takeABreak.html',
        controller: 'StayingInControlController'
    }).
    when('/staying-in-control/self-exclusion', {
        title:"Self Exclusion from Gambling",
        templateUrl: './js/views/stayingInControl/selfExclusion.html',
        controller: 'StayingInControlController'
    }).
    when('/tools/questionnaire', {
        title:"Gambling Questionnaire",
        templateUrl: './js/views/tools/questionnaire.html',
        controller: 'ToolsController'
    }).
    when('/tools/calculator', {
        title:"Gambling Assessment Calculator",
        templateUrl: './js/views/tools/calculator.html',
        controller: 'ToolsController'
    }).
    when('/getting-help/getting-help', {
        templateUrl: './js/views/gettingHelp/faceToFaceHelp.html',
        controller: 'GettingHelpController'
    }).
    when('/getting-help/face-to-face-help', {
        title:"Face-To-Face Gambling Help",
        templateUrl: './js/views/gettingHelp/faceToFaceHelp.html',
        controller: 'GettingHelpController'
    }).
    when('/getting-help/help-by-phone', {
        title:"Gambling Counselling by Phone",
        templateUrl: './js/views/gettingHelp/helpByPhone.html',
        controller: 'GettingHelpController'
    }).
    when('/getting-help/chaplaincy', {
        title:"Chaplaincy Support for Gambling",
        templateUrl: './js/views/gettingHelp/chaplaincy.html',
        controller: 'GettingHelpController'
    }).
    when('/getting-help/financial-counselling', {
        title:"Financial Counselling and Assistance",
        templateUrl: './js/views/gettingHelp/financialCounselling.html',
        controller: 'GettingHelpController'
    }).
    when('/family-and-friends/helping-others', {
        title:"Helping Others | Gambling Help",
        templateUrl: './js/views/familyAndFriends/familyAndFriends.html',
        controller: 'FamilyAndFriendsController'
    }).
    when('/family-and-friends/protecting-minors', {
        title:"Protecting Minors from Gambling",
        templateUrl: './js/views/familyAndFriends/protectingMinors.html',
        controller: 'FamilyAndFriendsController'
    }).
    otherwise({
        redirectTo: '/home'
    });

}]).run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);