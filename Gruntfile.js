module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodewebkit: {
      options: {
        build_dir: './build', // Where the build version of my node-webkit app is saved
        mac: true,
        win: false,
        linux32: false,
        linux64: false
      },
      src: ['./**/*'] // Your node-webkit app
    },
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');

  // Default task(s).
  grunt.registerTask('default', ['nodewebkit']);

};
