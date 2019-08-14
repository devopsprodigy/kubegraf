module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.initConfig({
    clean: ['dist'],

    copy: {
      dist_js: {
        expand: true,
        cwd: 'src',
        src: ['**/*.ts', '**/*.d.ts'],
        dest: 'dist'
      },
      dist_html: {
        expand: true,
        cwd: 'src',
        src: ['**/*.html', '**/*.json'],
        dest: 'dist'
      },
      dist_img: {
        expand: true,
        flatten: true,
        cwd: 'src/img',
        src: ['*.*'],
        dest: 'dist/img/'
      },
      dist_img_ds: {
        expand: true,
        flatten: true,
        cwd: 'src/datasource/img',
        src: ['*.*'],
        dest: 'dist/datasource/img/'
      },
      dist_statics: {
        expand: true,
        flatten: true,
        src: ['src/plugin.json', 'LICENSE', 'README.md', 'src/query_help.md'],
        dest: 'dist/'
      }
    },

    typescript: {
      build: {
        src: ['dist/**/*.ts', '!**/*.d.ts'],
        dest: 'dist',
        options: {
          module: 'system',
          target: 'es5',
          rootDir: 'dist/',
          declaration: true,
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          sourceMap: true,
          noImplicitAny: false,
          moduleResolution: "node"
        }
      }
    },

    sass: {
      build: {
        files: [
            {
                expand: true,
                cwd: 'src/sass',
                src: ['*.sass'],
                dest: 'dist/css',
                ext: '.css'
            }
        ]
      }
    },

    watch: {
      files: ['src/**/*.ts', 'src/**/*.html', 'src/**/*.sass', 'src/images/*.*', 'src/dashboards/*.json', 'src/plugin.json', 'README.md', 'src/query_help.md', 'src/datasource/plugin.json'],
      tasks: ['default'],
      options: {
        debounceDelay: 250,
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', [
    'clean',
    'sass',
    'copy:dist_js',
    'typescript:build',
    'copy:dist_html',
    'copy:dist_img',
    'copy:dist_img_ds',
    'copy:dist_statics',
  ]);
};
