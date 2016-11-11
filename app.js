'use strict';

// Declare app level module which depends on views, and components
angular.module('Test', [
  'ngRoute', 'Test.Notification'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  //$locationProvider.hashPrefix('!');
	$routeProvider
	
	.when('/messages', {
		templateUrl: 'message_list_' + appData.getDeviceType() + '.html',
		controller: 'MessageListCtrl'
	})
	
	.when('/messages/:message_id', {
		templateUrl: 'message_details_' + appData.getDeviceType() + '.html',
		controller: 'MessageDetailsCtrl'
	})
	
	.when('/settings', {
		templateUrl: 'notification_settings_' + appData.getDeviceType() + '.html',
		controller: 'NotificationSettingsCtrl'
	})
	
	.otherwise({redirectTo: '/messages'});
	
  //$routeProvider.otherwise({redirectTo: '/view1'});
}])

.controller('MessageListCtrl', ['$scope', '$rootScope', '$location', 'Notification', function($scope, $rootScope, $location, Notification) {
	var notification = Notification.getItem("notification");
	debugger;
	if(angular.isObject(notification) && notification.hasOwnProperty("message")) {
		// Get that notification and redirect user to that page
		var message_id = Notification.setMessages(notification);
		
		localStorage.removeItem("notification");
		
		$location.path('/messages/' + message_id);
		
	} else {
		
		Notification.getMessages()
		.then(function(messageList) {
			$scope.messageList = messageList;
			//$rootScope.messageList = $scope.messageList; //  Assign it in root scope so that we can get in message details page also;
			console.log("$scope.messageList :: ");
			console.log(messageList);
		});
		//$scope.messageList = Notification.getMessages();
	}
    
	$scope.deleteNotifications = function() {
		Notification.deleteMessages();
		$scope.messageList = null;
		alert("All notifications deleted successfully!");
	};
	
	$scope.setMessage = function(notification) {
		Notification.setMessages(notification);
	};
	$scope.runQuery = function() {
		Notification.runQuery();
	};
}])

.controller('MessageDetailsCtrl', ['$scope', '$rootScope', '$routeParams', 'Notification', function($scope, $rootScope, $routeParams, Notification) {
	var messageList = Notification.getMessages() // JSON.parse(localStorage.messageList);
	.then(function(messageList) {
		messageList.forEach(function(message, index) {
			if(message.message_id == $routeParams.message_id){
				$scope.message = message;
				
				if(message.status == 1) { // Check not read then mark it as read 
					message.status = 0; // It's here means user read this message
					Notification.updateMessageStatus(message.message_id);
				}
			}
		});
	});
	
}])

.controller('NotificationSettingsCtrl', ['$rootScope', function($rootScope) {
	$rootScope.header_title = "Notifications Settings";
}])

.controller('MainCtrl', ['$rootScope', function($rootScope) {
	//$roorScope.headerTitle = "Messages";
	$rootScope.header_title = "Messages";
}]);


/* 
 * bootstrap angular manually when the device ready other wise sqlite methods will not work.
 */
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
	angular.element(function() {
		angular.bootstrap(document, ['Test']);
	});
}

