module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'www/js/**/*.js', '!www/js/**/*.min.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'www/styles/scss/partials/*.scss'],
      tasks: ['jshint', 'concat', 'uglify', 'sass', 'cssmin']
    },
	
	sass: {                              // Task
		dist: {                            // Target
		  options: {                       // Target options
			style: 'expanded'
		  },
		  files: {                         // Dictionary of files
			'www/styles/css/index.css': 'www/styles/scss/index.scss',       // 'destination': 'source'
		  }
		}
	},
	
	pkg: grunt.file.readJSON('package.json'),
	concat: {
		options: {
		  stripBanners: true,
		  banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %> */',
		}, 
		dist: {
		  src: ['www/js/partials/*.js'],
		  dest: 'www/js/index.js',
		},
	},
	  
	uglify: {
		options: {
		  mangle: false
		},
		my_target: {
		  files: {
			'www/js/index.min.js': ['www/js/index.js']
		  }
		}
	},

	cssmin: {
	  options: {
		shorthandCompacting: false,
		roundingPrecision: -1
	  },
	  target: {
		files: {
		  'www/styles/css/index.min.css': ['www/styles/css/index.css']
		}
	  }
	}
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');


  grunt.registerTask('build', ['sass', 'cssmin']);

};