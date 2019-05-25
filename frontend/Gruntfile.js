module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        karma: {
            options: {
                configFile: 'karma.conf.js',
                client: {
                    grpcHost: grunt.option('grpc-host')
                },
                singleRun: true,
                autoWatch: false
            },

            improbable: {
                files: [
                    { src: ['improbable/*Spec.ts'], watched: false }
                ],
            },

            improbableWS: {
                files: [
                    { src: ['improbableWS/*Spec.ts'], watched: false }
                ],
            },

            grpcWeb: {
                files: [
                    { src: ['grpcWeb/*Spec.ts'], watched: false }
                ],
            },

            grpcWebText: {
                files: [
                    { src: ['grpcWebText/*Spec.ts'], watched: false }
                ],
            },
        }
    });
};
