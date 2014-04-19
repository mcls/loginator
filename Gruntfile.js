module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodewebkit: {
      options: {
        build_dir: './build',
        mac: true,
        win: false,
        linux32: false,
        linux64: false
      },
      src: [
        './package.json',
        './index.*',
        './lib/**/*',
        './build/*.js',
        './build/*.css',
        '!./node_modules/grunt*/**']
    },
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');

  // Default task(s).
  grunt.registerTask('default', ['nodewebkit']);

};
