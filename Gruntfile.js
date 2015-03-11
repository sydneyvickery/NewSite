module.exports = function(grunt) {

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

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
					'styles/style.css': 'styles/style.scss',
					'styles/old-ie.css': 'styles/old-ie.scss'
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

		build_html: {
			dev: {
				options: {
	   				templates: ['layout/header.html','layout/footer.html']
			    },
			    expand: true,
			    cwd: 'views/',
			    src: ['*.html'],
			    dest: '.',
			    ext: '.html'
			}
		},
		watch: {
			livereload: {
				files: ['!node_modules/**','!bower_components/**','views/*.html','views/work/*.html','layout/*.html','js/**/*.js', 'styles/**/*.scss','img/**/*.{png,jpg,jpeg,gif}'],
				tasks: ['sass','build_html'],
				options: {
					livereload: true
				}
			}
		}

    });

    grunt.registerTask('default', ['express','watch']);
    grunt.registerTask('build', ['uglify','sass','autoprefixer','cssmin']);

};

