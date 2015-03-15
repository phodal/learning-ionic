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

.controller('WikiCtrl', function($scope, $stateParams) {
	$scope.languages = [
		{ title: 'dot', id: 1 },
		{ title: 'others', id: 2 },
		{ title: 'hello', id: 3 },
		{ title: 'zero', id: 4 }
	];
})

.controller('WikiDetailCtrl', function($scope, $stateParams, quizFactory) {
	$scope.text =quizFactory.getQuestion($stateParams.languageId);
});