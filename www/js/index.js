/*! smartcarpool - v1.0.0 - 2016-10-29 */var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    
    emailGuests: function() {
    	console.log("You clicked on email guest!");
    },
    
    snooze: function() {
    	console.log("You clicked on snooze!");
    },

    accept: function() {
    	console.log("You clicked on accept!");
    },

    reject: function() {
    	console.log("You clicked on reject!");
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        document.getElementById("ShareApp").addEventListener("click", function() {
        	window.plugins.socialsharing.share('Click on the below link to download the SmartCarPool App: ', null, null, 'https://goo.gl/4weRCY');

        });
        
        var push = PushNotification.init({
            android: {
                senderID: "800359287342",
                iconColor: "#0091EA",
            },
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            },
            ios: {
                alert: "true",
                badge: true,
                sound: 'false'
            },
            windows: {}
        });
        
        push.on('registration', function(data) {
            console.log(data.registrationId);
        });
        
        push.on('notification', function(data) {
            console.log(data.message);
            console.log(data.title);
            console.log(data.count);
            console.log(data.sound);
            console.log(data.image);
            console.log(data.additionalData);
        });
        push.on('error', function(e) {
            console.log("Error:: ", e.message);
        });
        
        
//        PushNotification.hasPermission(function(data) {
//            if (data.isEnabled) {
//                alert('isEnabled');
//            }
//        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        

        console.log('Received Event: ' + id);
    }
};

app.initialize();
angular.module("login", [])


.controller("loginController", function() {
	console.log("Testing");
	alert("hi");
});




angular.module("signup", [])


.controller("loginController", function() {
	console.log("Testing");
	alert("signup");
});



