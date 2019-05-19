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
                    { src: ['improbable-ws/*Spec.ts'], watched: false }
                ],
            },

            grpcWeb: {
                files: [
                    { src: ['grpcweb/*Spec.ts'], watched: false }
                ],
            },

            grpcWebText: {
                files: [
                    { src: ['grpcwebtext/*Spec.ts'], watched: false }
                ],
            },
        }
    });
};