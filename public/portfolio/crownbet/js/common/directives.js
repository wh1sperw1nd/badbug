mainApp.directive('subMenu',function(){
	return {
		templateUrl:'./js/views/sub-menu.html',
		transclude: true
	}
})


mainApp.directive('footerFloating',function($window,$document,$rootScope){
	return {
		templateUrl:'./js/views/footer-floating.html',
		link:function(scope,element,attrs){
			$rootScope.initFooter=function(){
				setTimeout(function(){
					window.scrollTo(0,0);
					setFooterFloating()
				},100)
			}
			var footerStyles=getComputedStyle(document.getElementsByClassName('footer')[0])
			var footerHeight=parseInt(footerStyles.height)-parseInt(footerStyles.paddingTop);
			function setFooterFloating(){
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				scope.isFixedFooter=document.body.scrollHeight+70>(scrollTop+document.body.offsetHeight+footerHeight);
				scope.$apply()
			}
			angular.element($window).bind("scroll",function(){setFooterFloating();})
			$rootScope.initFooter()

		}
	}
});

mainApp.directive("decimals", function () {
    return  {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function(fieldEmpty) {
				console.log("!!!")
			});
		}
	};
});