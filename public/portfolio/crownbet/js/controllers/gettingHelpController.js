mainApp.controller('GettingHelpController', function($scope, $http, $location,$rootScope) {
//    if(mainApp.slidingInterval)
//        mainApp.clearBannerSlidingInterval();
    $rootScope.submenus = mainApp.menus[4].submenu;
    $scope.menu = mainApp.menus[4];
    $http.get(mainApp.configApp.helpContentUrl).success(function(responce){
        $scope.content = responce
    });

});