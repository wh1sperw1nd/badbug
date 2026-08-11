mainApp.controller('HomeController', function($scope, $http, $location, $uibModal,$rootScope) {
    $http.get(mainApp.configApp.homePageContentUrl).success(function(responce){
        $scope.content = responce;
        $scope.imageUrlCodeOfPractice = $scope.content.panelContent[0].imageUrl;
        $scope.imageUrltakeABreak = $scope.content.panelContent[1].imageUrl;

//        mainApp.setBannerSliding();
    });

    $scope.changeSlide = function (el) {
	    this.setBannerSliding()
        var slide = $(el.currentTarget).data("num");
        $(".fs-quick-btn").removeClass("active");
        $(el.currentTarget).addClass("active");
        $(".fs-slide").css("opacity","0");
        $("#slide-" + slide).css("opacity","1");
    }
	$scope.setBannerSliding = function () {
        var i = 2;
        if ($rootScope.slidingInterval)
            clearInterval($rootScope.slidingInterval);
        else i = 1;
        $rootScope.slidingInterval = setInterval(function () {
            if (i > 3) i = 1;
            $(".fs-quick-btn").removeClass("active");
            $(".fs-slide").css("opacity","0");
            $("#btn-"+ i).addClass("active");
            $("#slide-" + i).css("opacity","1");
            i++;
        }.bind(this), 10000);

    }
	$scope.setBannerSliding();


});

mainApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});