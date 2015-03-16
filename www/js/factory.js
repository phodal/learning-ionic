var app = angular.module('starter.factory', [])
.factory('quizFactory', function($http) {
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function generateQuestion(data){
		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}

		var id = getRandomInt(0, data.length);
		var language = capitalizeFirstLetter(data[id].language.split('.')[0]);

		var question = {
			question: 'Choice language with exist code',
			options: ["HTML", language, "CSS"],
			answer: 2
		};
		return question;
	}

	var getQuestion = function (id, data) {
		var questions = data;
		var question = generateQuestion(data);

		if (id < questions.length + 1) {
			return question;
		} else {
			return false;
		}
	};

	return {
		getQuestion: getQuestion
	};
});