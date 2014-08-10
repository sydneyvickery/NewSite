module.exports = function(grunt) {

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

		express: {
		  all: {
			options: {
			 	port: 8080,
		        hostname: "0.0.0.0",
		        bases: [__dirname],  // Replace with the directory you want the files served from
		                             // Make sure you don't use `.` or `..` in the path as Express
		                             // is likely to return 403 Forbidden responses if you do
		                             // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
				livereload: true
		    }
		  }
		},
		
        uglify: {
		    build: {
		        src: 'js/base.js',
		        dest: 'build/js/base.min.js'
		    }
		},
		sass: {
			options: {
				outputStyle: 'compressed'
			},
			dist: {
				files: {
					'styles/style.css': 'styles/style.scss'
				}
			}
		},
		autoprefixer: {
			dist: {
				files: {
					'styles/style.css': 'styles/style.css'
		        }
		    }
		},
		cssmin: {
		  combine: {
		    files: {
		      'build/styles/style.css': 'styles/style.css'
		    }
		  }
		},
		watch: {
			livereload: {
				files: ['!node_modules/**','*.html', 'js/**/*.js', 'styles/**/*.scss','img/**/*.{png,jpg,jpeg,gif}'],
				tasks: ['sass'],
				options: {
					livereload: true
				}
			}
		}

    });

    grunt.registerTask('default', ['express','watch']);
    grunt.registerTask('build', ['uglify','sass','autoprefixer','cssmin']);

};