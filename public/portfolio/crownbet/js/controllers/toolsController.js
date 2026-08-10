mainApp.controller('ToolsController', function($scope, $http, $location,$rootScope) {
    $rootScope.submenus = mainApp.menus[3].submenu;
    $http.get(mainApp.configApp.toolsContentUrl).success(function(responce){
        $scope.content = responce
    });
    $scope.calculatorForm = './js/views/tools/calcForm.html';
});
