angular.module('starter.controllers', ['starter.factory'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('LevelSelectCtrl', function($scope) {
  $scope.levels = [
    { title: 'Level 1', id: 1 },
    { title: 'Level 2', id: 2 },
    { title: 'Level 3', id: 3 },
    { title: 'Level 4', id: 4 }
  ];
})

.controller('QuizCtrl', function($scope, $stateParams, $http) {
	$scope.level = $stateParams.level;
	$http.get('assets/data/lv' + $stateParams.level + '.json').then(function(data) {
		$scope.level_langeuages = data.data;
	});
})

.controller('WikiCtrl', function($scope, $stateParams, $http) {
		$scope.level = $stateParams.level;
		$http.get('assets/data/results.json').then(function(data) {
			var results = [];
			angular.forEach(data.data, function(each_level){
				angular.forEach(each_level, function(each_language){
					results.push(each_language)
				});
			});
			$scope.languages = results;
		});
})

.controller('WikiDetailCtrl', function($scope, $stateParams, quizFactory, $http) {
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	var language_info = $stateParams.language_info.split("+"),
	level = language_info[0],
	file_name = language_info[1],
	language = capitalizeFirstLetter(file_name.split('.')[0]);

	$scope.language = language;
	$http.get('assets/'+  level + '/' + file_name).then(function(data) {
		$scope.hello_world = data.data;
	});
	$scope.text =quizFactory.getQuestion($stateParams.languageId);
});