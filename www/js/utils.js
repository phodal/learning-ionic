var app = angular.module('starter.utils', [])
.factory('utilsFactory', function() {
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	return {
		capitalizeFirstLetter: capitalizeFirstLetter
	};
});