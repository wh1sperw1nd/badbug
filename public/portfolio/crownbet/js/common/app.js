/**
 * Created by mkhymochka on 14.07.2016.
 */
var mainApp = angular.module("CrownBet.Responsible.Gambling", ['ngRoute', 'ngAnimate','ui.bootstrap']).run(function($rootScope,$location) {
    setTimeout(function () {
        window.scrollTo(0,0);
    },100)
	//default setting after reload page
	var pathArray = $location.url().split("/");
	$rootScope.currentPageId=pathArray[1]
	$rootScope.currentSubPageId=pathArray[2]

	//on page changed
	$rootScope.$on( "$routeChangeSuccess", function(event, next, current) {
        setTimeout(function () {
            window.scrollTo(0,0);
        },100)
		clearInterval($rootScope.slidingInterval)
		var pathArray = $location.url().split("/");
		$rootScope.currentPageId=pathArray[1]
		$rootScope.currentSubPageId=pathArray[2]
		// $rootScope.initFooter()
	})
});


mainApp.configApp = {
    serverHost :"http://10.37.4.189:47100/",
    sliderInterval: 5000,
    menuUrl: "./js/models/menu.json",
    linksUrl: "./js/models/links.json",
    homePageContentUrl : "./js/models/content/home.json",
    ourCommitmentContentUrl : "./js/models/content/ourCommitment.json",
    stayingInControlContentUrl : "./js/models/content/stayingInControl.json",
    toolsContentUrl : "./js/models/content/tools.json",
    helpContentUrl : "./js/models/content/help.json",
    familyAndFriendsContentUrl : "./js/models/content/familyAndFriends.json",
    calculatorFormUrl: "./js/models/calculatorForm.json"
};