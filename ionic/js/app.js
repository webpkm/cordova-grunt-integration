// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('SmartCarPool', ['ionic', 'SmartCarPool.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MainCtrl'
  })
  
  .state('app.login', {
	  url: '/login',
	  views: {
		  'menuContent': {
			  templateUrl: 'templates/login.html'
		  }
	  }
  })

  .state('app.myprofile', {
    url: '/myprofile',
    views: {
      'menuContent': {
        templateUrl: 'templates/myprofile.html'
      }
    }
  })
  
  .state('app.offer-ride', {
	  url: '/offer-ride',
	  views: {
		  'menuContent': {
			  templateUrl: 'templates/offer-ride.html'
		  }
	  }
  })
  
  .state('app.search-ride', {
	  url: '/search-ride',
	  views: {
		  'menuContent': {
			  templateUrl: 'templates/search-ride.html'
		  }
	  }
  })
  
  .state('app.join-ride', {
	  url: '/join-ride',
	  views: {
		  'menuContent': {
			  templateUrl: 'templates/join-ride.html'
		  }
	  }
  })
  
  .state('app.trips', {
	  url: '/trips',
	  views: {
		  'menuContent': {
			  templateUrl: 'templates/trips.html'
		  }
	  }
  })
  
  .state('app.notifications', {
	  url: '/notifications',
	  views: {
		  'menuContent': {
			  templateUrl: 'templates/notifications.html'
		  }
	  }
  })
  
  .state('app.settings', {
	  url: '/settings',
	  views: {
		  'menuContent': {
			  templateUrl: 'templates/settings.html'
		  }
	  }
  })

  .state('app.aboutus', {
    url: '/aboutus',
    views: {
      'menuContent': {
        templateUrl: 'templates/aboutus.html'
      }
    }
  })

  .state('app.users', {
    url: '/users/:userId',
    views: {
      'menuContent': {
        templateUrl: 'templates/users.html',
        controller: 'UsersCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
