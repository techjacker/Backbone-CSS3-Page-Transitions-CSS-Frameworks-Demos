module.exports = function( grunt ) {
  'use strict';

  grunt.initConfig({

    // specify an alternate install location for Bower
    bower: {
      dir: 'app/components'
    },

    // generate application cache manifest
    // manifest:{
    //   dest: ''
    // },

    watch: {
      reload: {
        files: [
          'app/*.html',
          'app/styles/**/*.css',
          'app/scripts/**/*.js',
          'app/scripts/**/*.ejs',
          'app/images/**/*'
        ],
        tasks: 'reload'
      }
    },

    lint: {
      files: [
        'Gruntfile.js',
        'app/scripts/*.js',
        'app/scripts/collections/**/*.js',
        'app/scripts/helpers/**/*.js',
        'app/scripts/models/**/*.js',
        'app/scripts/routes/**/*.js',
        'app/scripts/templates/**/*.js',
        'app/scripts/views/**/*.js'
        // 'test/**/*.js'
        // 'app/scripts/**/*.js'
        // 'test/**/*.js'
      ]
    },

    // specifying JSHint options and globals
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#specifying-jshint-options-and-globals
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true,
        Backbone: false
      }
    },

    // Build configuration
    // -------------------

    // the staging directory used during the process
    staging: 'temp',
    // final build output
    output: 'dist',

    mkdirs: {
      staging: 'app/'
    },

    // Below, all paths are relative to the staging directory, which is a copy
    // of the app/ directory. Any .gitignore, .ignore and .buildignore file
    // that might appear in the app/ tree are used to ignore these values
    // during the copy process.

    // concat styles/**/*.css files, inline @import, output a single minified css
    // css: {
    //   // 'styles/main.css': ['styles/**/*.css']
    //   'styles/main.css': ['styles/*.css']
    // },

    // renames JS/CSS to prepend a hash of their contents for easier
    // versioning
    rev: {
      js: 'scripts/**/*.js'
      // css: 'styles/**/*.css'
      // img: 'images/**'
    },

    // usemin handler should point to the file containing
    // the usemin blocks to be parsed
    'usemin-handler': {
      html: 'index.html'
    },

    // update references in HTML/CSS to revved files
    usemin: {
      html: ['**/*.html'],
      css: ['**/*.css'],
      tpl: ['**/*.tpl'],
      js: ['**/*.js']
    },

    // HTML minification
    html: {
      files: ['**/*.html']
    },

    // Optimizes JPGs and PNGs (with jpegtran & optipng)
    img: {
      dist: '<config:rev.img>'
    }
  });

  // Alias the `test` task to run the `mocha` task instead
  // grunt.registerTask('test', 'mocha');
  // grunt.registerTask('build', 'concat css min rev usemin');
  // grunt.registerTask('build', 'concat css min img rev usemin');

};
