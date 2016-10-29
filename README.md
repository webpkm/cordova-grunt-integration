# cordova-grunt-integration

Initial cordova project setup with grunt.

      In this example grunt is use for 
      1. SCSS to css compilation
      2. CSS minification
      3. Js files combine in a single js file
      4. Js file linting
      5. Js file minification

## Installation

This requires cordova 5.0+

### Cordova Installation

   Download Node JS from https://nodejs.org/en/download/

    $cordova create cordova-grunt-integration com.example.cordova-grunt-integration cordova-grunt-integration

### Install cordova
    $ sudo npm install -g cordova

### Create new cordova project

      $cordova create cordova-grunt-integration com.example.cordova-grunt-integration cordova-grunt-integration

### Add cordova platforms

     $ cordova platform add android
     $ cordova platform add browser


### Dependecy Installation

### grunt-cli
    $ npm install -g grunt-cli
    $ npm install grunt --save-dev
    $ npm init
    
### Ruby 
  Download ruby from http://rubyinstaller.org/downloads/

      $ gem install gem --source http://rubygems.org

### Grunt Plugin Dependecy Installation

    $ npm install grunt-contrib-watch --save-dev
    $ npm install grunt-contrib-uglify --save-dev
    $ npm install grunt-contrib-jshint --save-dev
    $ npm install grunt-contrib-sass --save-dev
    $ npm install grunt-contrib-concat --save-dev

## Eclipse Setup
First download the Eclipse software
http://archive.eclipse.org/technology/epp/downloads/release/luna/R/eclipse-java-luna-R-win32.zip

### Android SDK setup 
Help -> Install New Software
Add this link to install
https://dl-ssl.google.com/android/eclipse/


### Download ANDROID SDK

https://developer.android.com/studio/index.html#downloads

### Enable Developer Options
1. Go to about phone
2. 5 times tap on it.
3. It will enable the Developer options
http://blog.syncios.com/enable-developer-optionsusb-debugging-mode-on-devices-with-android-4-2-jelly-bean/



### Enable USB Debugging



First download the USB driver for Nexus download from here
https://developer.android.com/studio/run/win-usb.html#top

Follow these steps to install the driver
https://developer.android.com/studio/run/oem-usb.html#InstallingDriver

