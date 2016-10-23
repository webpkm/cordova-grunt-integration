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
