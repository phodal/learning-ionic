// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'hc.marked'])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
	  if(window.plugins && window.plugins.AdMob) {
		  var admob_key = device.platform == "Android" ? "ANDROID_PUBLISHER_KEY" : "IOS_PUBLISHER_KEY";
		  var admob = window.plugins.AdMob;
		  admob.createBannerView(
			  {
				  'publisherId': 'ca-app-pub-3662578183051823/5276849408',
				  'adSize': admob.AD_SIZE.BANNER,
				  'bannerAtTop': false
			  },
			  function() {
				  admob.requestAd(
					  { 'isTesting': false },
					  function() {
						  admob.showAd(true);
					  },
					  function() { console.log('failed to request ad'); }
				  );
			  },
			  function() { console.log('failed to create banner view'); }
		  );
	  }
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(['markedProvider', function(markedProvider) {
	markedProvider.setOptions({gfm: true});
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html"
  })

  .state('app.about', {
	  url: "/about",
	  views: {
		  'menuContent': {
			  templateUrl: "templates/about.html"
		  }
	  }
  })

  .state('app.wiki', {
    url: "/wiki",
    views: {
      'menuContent': {
        templateUrl: "templates/wiki.html",
        controller: 'WikiCtrl'
      }
    }
  })
  .state('app.language', {
	  url: "/language/:language_info",
	  views: {
		  'menuContent': {
			  templateUrl: "templates/wiki_detail.html",
			  controller: 'WikiDetailCtrl'
		  }
	  }
  })
    .state('app.levelSelect', {
      url: "/level",
      views: {
        'menuContent': {
          templateUrl: "templates/level.html",
          controller: 'LevelSelectCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/level/:level",
    views: {
      'menuContent': {
        templateUrl: "templates/level_quiz.html",
        controller: 'QuizCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/level');
});
