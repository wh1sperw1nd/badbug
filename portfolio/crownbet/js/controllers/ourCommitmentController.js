mainApp.controller('OurCommitmentController', function($scope, $http, $location,$rootScope) {
//    if(mainApp.slidingInterval)
//        mainApp.clearBannerSlidingInterval();
    $rootScope.submenus = mainApp.menus[1].submenu;
    $http.get(mainApp.configApp.ourCommitmentContentUrl).success(function(responce){
        $scope.content = responce
    });
});