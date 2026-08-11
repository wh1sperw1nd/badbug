mainApp.controller('FamilyAndFriendsController', function($scope, $http, $location,$rootScope) {
//    if(mainApp.slidingInterval)
//        mainApp.clearBannerSlidingInterval();

    $scope.submenus = mainApp.menus[5].submenu;
    $scope.menu = mainApp.menus[5];
    $http.get(mainApp.configApp.familyAndFriendsContentUrl).success(function(responce){
        $scope.content = responce
    });


});