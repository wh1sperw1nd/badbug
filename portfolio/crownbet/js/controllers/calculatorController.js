mainApp.controller('CalculatorController', function ($scope, $http, $location) {

    $http.get(mainApp.configApp.calculatorFormUrl).success(function (responce) {
        $scope.calculatorFormFields = responce;
        $scope.calculatorFields = {};
        for (var keyPage in  $scope.calculatorFormFields) {
            for (var keyField in $scope.calculatorFormFields[keyPage].fields) {
                $scope.calculatorFields[$scope.calculatorFormFields[keyPage].fields[keyField].short] = $scope.calculatorFormFields[keyPage].fields[keyField].value;
            }
        }
        $scope.showErrorEmpty = [];
        $scope.showErrorDecimal = [];
        $scope.errorRed = [];
        $scope.errorRedCircle = [];
        $scope.testError = [];
    });

    var validator = function (val) {

        var noneComma = $scope.removeComma($scope.calculatorFields[val]);

        if ($scope.calculatorFields[val]=="") {

        } else {
            $scope.showErrorEmpty[val] = false
            $scope.errorRed[val] = '';
            $scope.errorRedCircle[val] = '';
            if (isNaN(parseFloat($scope.calculatorFields[val]))) {
                $scope.calculatorFields[val] = $scope.setComma($scope.calculatorFields[0])
                // $scope.showErrorDecimal[val] = true;
                // $scope.errorRed[val] = 'error';
                // $scope.errorRedCircle[val] = 'valid-error';
                // $scope.testError.push("error");
            } else {
                $scope.calculatorFields[val] = $scope.setComma($scope.calculatorFields[val]);
                $scope.showErrorDecimal[val] = false;
                $scope.errorRed[val] = '';
                $scope.errorRedCircle[val] = '';
            }
        }


    };

    $scope.submitForm = function (page) {
        $scope.showErrorEmpty = [];
        $scope.showErrorDecimal = [];
        $scope.errorRed = [];
        $scope.errorRedCircle = [];
        $scope.testError = [];
        for (var key in $scope.calculatorFormFields[page].fields){
            validator($scope.calculatorFormFields[page].fields[key].short)
        }
        if ($scope.testError.length == 0) {
            $scope.goToPage(page + 2)
        }
    };


    $scope.goToPage = function (page) {

        if (page == 1) {
            $scope.showOnceButton = true
        } else {
            $scope.showOnceButton = false
        }
        $scope.showPage = [];
        $scope.showPage[page] = true;
        $scope.showCircle = false;
        setActiveCircleFormPage(page);
    };

    $scope.resultPageShow = function () {
        $scope.showPage = [];
        $scope.showPage[6] = true;
    };

    var setActiveCircleFormPage = function (page) {
        if (page == 6) {
            $scope.showCircle = false
        }
        else {
            $scope.showCircle = true;
            $(".circle").removeClass("active");
            for (var i = 1; i <= page; i++) {
                $("#circle-page-" + (i - 1)).addClass("active");
            }
        }
    };

    $scope.printResults = function () {
        window.print();
    };

    $scope.goToPage(1);

    $scope.getTotalIncome = function () {
        if (!$scope.calculatorFields
            ||!$scope.calculatorFields.payAfterTax
            ||!$scope.calculatorFields.pensionIncome
            ||!$scope.calculatorFields.investmentIncome
            ||!$scope.calculatorFields.otherIncome)
            return 0;

        var totalIncome =
            parseFloat($scope.removeComma($scope.calculatorFields.payAfterTax)) +
            parseFloat($scope.removeComma($scope.calculatorFields.pensionIncome)) +
            parseFloat($scope.removeComma($scope.calculatorFields.investmentIncome)) +
            parseFloat($scope.removeComma($scope.calculatorFields.otherIncome));
        return totalIncome;
    };

    $scope.getTotalHousehold = function () {
        if (!$scope.calculatorFields||!$scope.calculatorFields.food
            ||!$scope.calculatorFields.mortgageRent
            ||!$scope.calculatorFields.councilTax
            ||!$scope.calculatorFields.householdBills
            ||!$scope.calculatorFields.otherHousehold)
            return 0;
        var totalHousehold =
            parseFloat($scope.removeComma($scope.calculatorFields.food)) +
            parseFloat($scope.removeComma($scope.calculatorFields.mortgageRent)) +
            parseFloat($scope.removeComma($scope.calculatorFields.councilTax)) +
            parseFloat($scope.removeComma($scope.calculatorFields.householdBills)) +
            parseFloat($scope.removeComma($scope.calculatorFields.otherHousehold));
        return totalHousehold;
    };

    $scope.getTotalGambling = function () {
        if (!$scope.calculatorFields
            ||!$scope.calculatorFields.gambling)
            return 0;
        return parseFloat($scope.removeComma($scope.calculatorFields.gambling))
    };

    $scope.getTotalLeisure = function () {
        if (!$scope.calculatorFields
            ||!$scope.calculatorFields.goingOut
            ||!$scope.calculatorFields.alcoholCigarettes
            ||!$scope.calculatorFields.holidays
            ||!$scope.calculatorFields.otherLeisure)
            return 0;
        var totalLeisure =
            parseFloat($scope.removeComma($scope.calculatorFields.goingOut)) +
            parseFloat($scope.removeComma($scope.calculatorFields.alcoholCigarettes)) +
            parseFloat($scope.removeComma($scope.calculatorFields.holidays)) +
            parseFloat($scope.removeComma($scope.calculatorFields.otherLeisure));
        return totalLeisure;
    };

    $scope.getTotalTravel = function () {
        if (!$scope.calculatorFields
            ||!$scope.calculatorFields.gettingToWork
            ||!$scope.calculatorFields.car
            ||!$scope.calculatorFields.otherTravel
        )
            return 0;
        var totalTravel =
            parseFloat($scope.removeComma($scope.calculatorFields.gettingToWork)) +
            parseFloat($scope.removeComma($scope.calculatorFields.car)) +
            parseFloat($scope.removeComma($scope.calculatorFields.otherTravel));
        return  totalTravel;
    };

    $scope.getTotalSpending = function () {
        if (!$scope.calculatorFields)
            return 0;
        return $scope.getTotalHousehold() + $scope.getTotalGambling() + $scope.getTotalLeisure() + $scope.getTotalTravel()
    };

    $scope.prepareNumber = function (n) {
        var s = Number(n).toFixed(2);
        for (var i = s.length / 3 - 2; i > 0; i--) s = s.replace(/(\d)(\d{3}[^\d])/, "$1,$2");
        return s;
    };

    $scope.setComma = function (e) {
        var val = e;
        var regex = new RegExp(",", "g");
        if(typeof e === "object"){
            val = e.target.value;
        }
        if(regex.test(val)){
            val = val.replace(regex, '');
        }
        val = parseFloat(val).toFixed(2);
        if (isNaN(val)) {
            val = 0
        }
        if(typeof e === "object"){
            e.target.value = $scope.prepareNumber(val);
            $scope.calculatorFields[e.target.id] = $scope.prepareNumber(val);
            validator(e.target.id);
        }
        else{
            return $scope.prepareNumber(val)
        }
    };

    $scope.removeComma = function (e) {

        var val = e;

        if(typeof e === "object" && e!=null){
            val = e.target.value;
        }

        console.log(val)

        var regex = new RegExp(",", "g");
        if(typeof e === "object" && e!=null){
            if(val == "0.00") {
                e.target.value = ""
            }else{

                e.target.value = val.replace(regex, '');
                console.log(e)
                if (e.target.selectionStart){
                    e.target.selectionStart = 0;
                }
            }

        }
        else if(e!=null){
            return val.replace(regex, '');
        }



    }
});




