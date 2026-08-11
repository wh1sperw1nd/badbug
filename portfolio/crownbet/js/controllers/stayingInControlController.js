mainApp.controller('StayingInControlController', function($scope, $http, $location,$rootScope) {
//    if(mainApp.slidingInterval)
//        mainApp.clearBannerSlidingInterval();
    $http.get(mainApp.configApp.stayingInControlContentUrl).success(function(responce){
        $scope.content = responce
    });
    $rootScope.submenus = mainApp.menus[2].submenu;
});