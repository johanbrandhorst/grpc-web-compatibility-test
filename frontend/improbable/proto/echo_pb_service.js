// package: grpc.gateway.testing
// file: echo.proto

var echo_pb = require("./echo_pb");
var grpc = require("grpc-web-client").grpc;

var EchoService = (function () {
  function EchoService() {}
  EchoService.serviceName = "grpc.gateway.testing.EchoService";
  return EchoService;
}());

EchoService.Echo = {
  methodName: "Echo",
  service: EchoService,
  requestStream: false,
  responseStream: false,
  requestType: echo_pb.EchoRequest,
  responseType: echo_pb.EchoResponse
};

EchoService.EchoAbort = {
  methodName: "EchoAbort",
  service: EchoService,
  requestStream: false,
  responseStream: false,
  requestType: echo_pb.EchoRequest,
  responseType: echo_pb.EchoResponse
};

EchoService.NoOp = {
  methodName: "NoOp",
  service: EchoService,
  requestStream: false,
  responseStream: false,
  requestType: echo_pb.Empty,
  responseType: echo_pb.Empty
};

EchoService.ServerStreamingEcho = {
  methodName: "ServerStreamingEcho",
  service: EchoService,
  requestStream: false,
  responseStream: true,
  requestType: echo_pb.ServerStreamingEchoRequest,
  responseType: echo_pb.ServerStreamingEchoResponse
};

EchoService.ServerStreamingEchoAbort = {
  methodName: "ServerStreamingEchoAbort",
  service: EchoService,
  requestStream: false,
  responseStream: true,
  requestType: echo_pb.ServerStreamingEchoRequest,
  responseType: echo_pb.ServerStreamingEchoResponse
};

EchoService.ClientStreamingEcho = {
  methodName: "ClientStreamingEcho",
  service: EchoService,
  requestStream: true,
  responseStream: false,
  requestType: echo_pb.ClientStreamingEchoRequest,
  responseType: echo_pb.ClientStreamingEchoResponse
};

EchoService.FullDuplexEcho = {
  methodName: "FullDuplexEcho",
  service: EchoService,
  requestStream: true,
  responseStream: true,
  requestType: echo_pb.EchoRequest,
  responseType: echo_pb.EchoResponse
};

EchoService.HalfDuplexEcho = {
  methodName: "HalfDuplexEcho",
  service: EchoService,
  requestStream: true,
  responseStream: true,
  requestType: echo_pb.EchoRequest,
  responseType: echo_pb.EchoResponse
};

exports.EchoService = EchoService;

function EchoServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

EchoServiceClient.prototype.echo = function echo(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(EchoService.Echo, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

EchoServiceClient.prototype.echoAbort = function echoAbort(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(EchoService.EchoAbort, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

EchoServiceClient.prototype.noOp = function noOp(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(EchoService.NoOp, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

EchoServiceClient.prototype.serverStreamingEcho = function serverStreamingEcho(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(EchoService.ServerStreamingEcho, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.end.forEach(function (handler) {
        handler();
      });
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

EchoServiceClient.prototype.serverStreamingEchoAbort = function serverStreamingEchoAbort(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(EchoService.ServerStreamingEchoAbort, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.end.forEach(function (handler) {
        handler();
      });
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

EchoService.prototype.clientStreamingEcho = function clientStreamingEcho() {
  throw new Error("Bi-directional streaming is not currently supported");
}

EchoService.prototype.fullDuplexEcho = function fullDuplexEcho() {
  throw new Error("Client streaming is not currently supported");
}

EchoService.prototype.halfDuplexEcho = function halfDuplexEcho() {
  throw new Error("Client streaming is not currently supported");
}

exports.EchoServiceClient = EchoServiceClient;

