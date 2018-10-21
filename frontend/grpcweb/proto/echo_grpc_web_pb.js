/**
 * @fileoverview gRPC-Web generated client stub for grpc.gateway.testing
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_duration_pb = require('google-protobuf/google/protobuf/duration_pb.js')
const proto = {};
proto.grpc = {};
proto.grpc.gateway = {};
proto.grpc.gateway.testing = require('./echo_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.grpc.gateway.testing.EchoServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.grpc.gateway.testing.EchoServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'binary';

  /**
   * @private @const {!proto.grpc.gateway.testing.EchoServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.grpc.gateway.testing.EchoServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.grpc.gateway.testing.EchoRequest,
 *   !proto.grpc.gateway.testing.EchoResponse>}
 */
const methodInfo_Echo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.grpc.gateway.testing.EchoResponse,
  /** @param {!proto.grpc.gateway.testing.EchoRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpc.gateway.testing.EchoResponse.deserializeBinary
);


/**
 * @param {!proto.grpc.gateway.testing.EchoRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.grpc.gateway.testing.EchoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grpc.gateway.testing.EchoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpc.gateway.testing.EchoServiceClient.prototype.echo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpc.gateway.testing.EchoService/Echo',
      request,
      metadata,
      methodInfo_Echo,
      callback);
};


/**
 * @param {!proto.grpc.gateway.testing.EchoRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grpc.gateway.testing.EchoResponse>}
 *     The XHR Node Readable Stream
 */
proto.grpc.gateway.testing.EchoServicePromiseClient.prototype.echo =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.echo(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.grpc.gateway.testing.EchoRequest,
 *   !proto.grpc.gateway.testing.EchoResponse>}
 */
const methodInfo_EchoAbort = new grpc.web.AbstractClientBase.MethodInfo(
  proto.grpc.gateway.testing.EchoResponse,
  /** @param {!proto.grpc.gateway.testing.EchoRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpc.gateway.testing.EchoResponse.deserializeBinary
);


/**
 * @param {!proto.grpc.gateway.testing.EchoRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.grpc.gateway.testing.EchoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grpc.gateway.testing.EchoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpc.gateway.testing.EchoServiceClient.prototype.echoAbort =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpc.gateway.testing.EchoService/EchoAbort',
      request,
      metadata,
      methodInfo_EchoAbort,
      callback);
};


/**
 * @param {!proto.grpc.gateway.testing.EchoRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grpc.gateway.testing.EchoResponse>}
 *     The XHR Node Readable Stream
 */
proto.grpc.gateway.testing.EchoServicePromiseClient.prototype.echoAbort =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.echoAbort(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.grpc.gateway.testing.Empty,
 *   !proto.grpc.gateway.testing.Empty>}
 */
const methodInfo_NoOp = new grpc.web.AbstractClientBase.MethodInfo(
  proto.grpc.gateway.testing.Empty,
  /** @param {!proto.grpc.gateway.testing.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpc.gateway.testing.Empty.deserializeBinary
);


/**
 * @param {!proto.grpc.gateway.testing.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.grpc.gateway.testing.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grpc.gateway.testing.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpc.gateway.testing.EchoServiceClient.prototype.noOp =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpc.gateway.testing.EchoService/NoOp',
      request,
      metadata,
      methodInfo_NoOp,
      callback);
};


/**
 * @param {!proto.grpc.gateway.testing.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grpc.gateway.testing.Empty>}
 *     The XHR Node Readable Stream
 */
proto.grpc.gateway.testing.EchoServicePromiseClient.prototype.noOp =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.noOp(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.grpc.gateway.testing.ServerStreamingEchoRequest,
 *   !proto.grpc.gateway.testing.ServerStreamingEchoResponse>}
 */
const methodInfo_ServerStreamingEcho = new grpc.web.AbstractClientBase.MethodInfo(
  proto.grpc.gateway.testing.ServerStreamingEchoResponse,
  /** @param {!proto.grpc.gateway.testing.ServerStreamingEchoRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpc.gateway.testing.ServerStreamingEchoResponse.deserializeBinary
);


/**
 * @param {!proto.grpc.gateway.testing.ServerStreamingEchoRequest} request The request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.grpc.gateway.testing.ServerStreamingEchoResponse>}
 *     The XHR Node Readable Stream
 */
proto.grpc.gateway.testing.EchoServiceClient.prototype.serverStreamingEcho =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/grpc.gateway.testing.EchoService/ServerStreamingEcho',
      request,
      metadata,
      methodInfo_ServerStreamingEcho);
};


/**
 * @param {!proto.grpc.gateway.testing.ServerStreamingEchoRequest} request The request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.grpc.gateway.testing.ServerStreamingEchoResponse>}
 *     The XHR Node Readable Stream
 */
proto.grpc.gateway.testing.EchoServicePromiseClient.prototype.serverStreamingEcho =
    function(request, metadata) {
  return this.delegateClient_.client_.serverStreaming(this.delegateClient_.hostname_ +
      '/grpc.gateway.testing.EchoService/ServerStreamingEcho',
      request,
      metadata,
      methodInfo_ServerStreamingEcho);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.grpc.gateway.testing.ServerStreamingEchoRequest,
 *   !proto.grpc.gateway.testing.ServerStreamingEchoResponse>}
 */
const methodInfo_ServerStreamingEchoAbort = new grpc.web.AbstractClientBase.MethodInfo(
  proto.grpc.gateway.testing.ServerStreamingEchoResponse,
  /** @param {!proto.grpc.gateway.testing.ServerStreamingEchoRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpc.gateway.testing.ServerStreamingEchoResponse.deserializeBinary
);


/**
 * @param {!proto.grpc.gateway.testing.ServerStreamingEchoRequest} request The request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.grpc.gateway.testing.ServerStreamingEchoResponse>}
 *     The XHR Node Readable Stream
 */
proto.grpc.gateway.testing.EchoServiceClient.prototype.serverStreamingEchoAbort =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/grpc.gateway.testing.EchoService/ServerStreamingEchoAbort',
      request,
      metadata,
      methodInfo_ServerStreamingEchoAbort);
};


/**
 * @param {!proto.grpc.gateway.testing.ServerStreamingEchoRequest} request The request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.grpc.gateway.testing.ServerStreamingEchoResponse>}
 *     The XHR Node Readable Stream
 */
proto.grpc.gateway.testing.EchoServicePromiseClient.prototype.serverStreamingEchoAbort =
    function(request, metadata) {
  return this.delegateClient_.client_.serverStreaming(this.delegateClient_.hostname_ +
      '/grpc.gateway.testing.EchoService/ServerStreamingEchoAbort',
      request,
      metadata,
      methodInfo_ServerStreamingEchoAbort);
};


module.exports = proto.grpc.gateway.testing;

