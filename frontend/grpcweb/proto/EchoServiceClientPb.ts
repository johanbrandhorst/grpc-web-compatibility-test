/**
 * @fileoverview gRPC-Web generated client stub for grpc.gateway.testing
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_duration_pb from 'google-protobuf/google/protobuf/duration_pb';

import {
  ClientStreamingEchoRequest,
  ClientStreamingEchoResponse,
  EchoRequest,
  EchoResponse,
  Empty,
  ServerStreamingEchoRequest,
  ServerStreamingEchoResponse} from './echo_pb';

export class EchoServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; }) {
    if (!options) options = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoEcho = new grpcWeb.AbstractClientBase.MethodInfo(
    EchoResponse,
    (request: EchoRequest) => {
      return request.serializeBinary();
    },
    EchoResponse.deserializeBinary
  );

  echo(
    request: EchoRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: EchoResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/grpc.gateway.testing.EchoService/Echo',
      request,
      metadata || {},
      this.methodInfoEcho,
      callback);
  }

  methodInfoEchoAbort = new grpcWeb.AbstractClientBase.MethodInfo(
    EchoResponse,
    (request: EchoRequest) => {
      return request.serializeBinary();
    },
    EchoResponse.deserializeBinary
  );

  echoAbort(
    request: EchoRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: EchoResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/grpc.gateway.testing.EchoService/EchoAbort',
      request,
      metadata || {},
      this.methodInfoEchoAbort,
      callback);
  }

  methodInfoNoOp = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: Empty) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  noOp(
    request: Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/grpc.gateway.testing.EchoService/NoOp',
      request,
      metadata || {},
      this.methodInfoNoOp,
      callback);
  }

  methodInfoServerStreamingEcho = new grpcWeb.AbstractClientBase.MethodInfo(
    ServerStreamingEchoResponse,
    (request: ServerStreamingEchoRequest) => {
      return request.serializeBinary();
    },
    ServerStreamingEchoResponse.deserializeBinary
  );

  serverStreamingEcho(
    request: ServerStreamingEchoRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/grpc.gateway.testing.EchoService/ServerStreamingEcho',
      request,
      metadata || {},
      this.methodInfoServerStreamingEcho);
  }

  methodInfoServerStreamingEchoAbort = new grpcWeb.AbstractClientBase.MethodInfo(
    ServerStreamingEchoResponse,
    (request: ServerStreamingEchoRequest) => {
      return request.serializeBinary();
    },
    ServerStreamingEchoResponse.deserializeBinary
  );

  serverStreamingEchoAbort(
    request: ServerStreamingEchoRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/grpc.gateway.testing.EchoService/ServerStreamingEchoAbort',
      request,
      metadata || {},
      this.methodInfoServerStreamingEchoAbort);
  }

}

