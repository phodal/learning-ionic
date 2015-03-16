angular.module('starter.controllers', ['starter.factory', 'hljs'])

	.config(function (hljsServiceProvider) {
	hljsServiceProvider.setOptions({
		// replace tab with 4 spaces
		tabReplace: '    '
	});
})
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

.controller('QuizCtrl', function($scope, $stateParams, $http, quizFactory) {
	$scope.level = $stateParams.level;
	$http.get('assets/data/lv' + $stateParams.level + '.json').then(function(data) {
		$scope.level_langeuages = data.data;
	});

	$scope.start = function() {
		$scope.id = 0;
		//$scope.quizOver = true;
		$scope.inProgress = true;
		$scope.getQuestion();
	};

	$scope.reset = function() {
		$scope.inProgress = false;
		$scope.score = 0;
	};

	$scope.getQuestion = function() {
		var q = quizFactory.getQuestion($scope.id, $scope.level);
		if(q) {
			$scope.question = q.question;
			$scope.options = q.options;
			$scope.answer = q.answer;
			$scope.answerMode = true;
		} else {
			$scope.quizOver = true;
		}
	};

	$scope.checkAnswer = function() {
		if(!$('input[name=answer]:checked').length) return;

		var ans = $('input[name=answer]:checked').val();

		if(ans == $scope.options[$scope.answer]) {
			$scope.score++;
			$scope.correctAns = true;
		} else {
			$scope.correctAns = false;
		}

		$scope.answerMode = false;
	};

	$scope.nextQuestion = function() {
		$scope.id++;
		$scope.getQuestion();
	};

	$scope.reset();
})

.controller('WikiCtrl', function($scope, $stateParams, $http) {
		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}

		$scope.level = $stateParams.level;
		$http.get('assets/data/results.json').then(function(data) {
			var results = [];
			angular.forEach(data.data, function(each_level){
				angular.forEach(each_level, function(each_language){
					var language = capitalizeFirstLetter(each_language.language.split('.')[0]);
					angular.extend(each_language, {'language_name': language});
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
});