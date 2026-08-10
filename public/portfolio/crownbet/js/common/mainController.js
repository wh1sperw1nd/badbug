mainApp.controller('mainController', function($scope, $http, $sce, $rootScope, $window) {
    $http.get(mainApp.configApp.menuUrl).success(function(responce){
        $scope.menus = responce
        mainApp.menus = $scope.menus;
        mainApp.sliderInterval = mainApp.configApp.sliderInterval
    })
    $http.get(mainApp.configApp.linksUrl).success(function(responce){
        $scope.links = responce
    })
    $scope.openMenuMobileTab = function(){
        $("#mobileMenu").removeClass("closed").addClass("open");
        $("#mobileMenuShadow").css("display","block");
    };
    $scope.closeMenuMobileTab = function(){
        setTimeout(function () {
            $("#mobileMenu").removeClass("open").addClass("closed");
            $("#mobileMenuShadow").css("display","none");
        },300)
    };
    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };
    $scope.scrollPageToTop =function () {
        window.scrollTo(0,0);
    }
    $scope.hideQuickLinksMenu = function (e) {
        e.stopPropagation();
        if($("#quickLinks").prop('checked')){
            $("#quickLinks").prop('checked',false)
        }
    }
    $scope.setSubMenuItemsWidth = function (submenus) {

        if(window.innerWidth < 1024 && submenus){
            if(submenus.length == 1)
                return "width100";
            if(submenus.length == 2)
                return "width49";
            else if(submenus.length == 3)
                return "width33";
            else if(submenus.length == 4)
                return "width24";
        }
        else return "width25";
    }
    angular.element($window).bind("resize", function(e) {
        $scope.setSubMenuItemsWidth($rootScope.submenus)
    })
});

