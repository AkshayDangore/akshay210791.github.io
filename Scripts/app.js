(function () {
    var app = angular.module("app", []);
    app.controller("appCtrl", appCtrl);
    app.$inject = ['$scope'];
    function appCtrl($scope) {

        Initialize();
        function Initialize() {
            createAndSetupClient("52446d2cd4f84c72be0ef88546e743f7", "en-US")
        }
        $scope.outputText = "";
        $scope.onClickSpeak = start;        
        var client;         

        //function setText(text) {
        //    $scope.outputText += text + "\n";
        //}

        function start() {
            $scope.startBtnDisabled = true;
            client.startMicAndContinuousRecognition();
        }

        function stop() {
            $scope.startBtnDisabled = false;
            client.endMicAndContinuousRecognition();
        }

        function createAndSetupClient(key, language) {
            $scope.startBtnDisabled = false;

            if (client) {
                stop();
            }

            client = new BingSpeech.RecognitionClient(key, language);

            client.onFinalResponseReceived = function (response) {
                $scope.outputText += response + "\n";
                $scope.$apply();
            }

            client.onError = function (code, requestId) {
                console.log("<Error with request n°" + requestId + ">");
            }
        }
        
    }
})()