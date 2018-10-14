// package: grpc.gateway.testing
// file: echo.proto

import * as echo_pb from "./echo_pb";
import {grpc} from "grpc-web-client";

type EchoServiceEcho = {
  readonly methodName: string;
  readonly service: typeof EchoService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof echo_pb.EchoRequest;
  readonly responseType: typeof echo_pb.EchoResponse;
};

type EchoServiceEchoAbort = {
  readonly methodName: string;
  readonly service: typeof EchoService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof echo_pb.EchoRequest;
  readonly responseType: typeof echo_pb.EchoResponse;
};

type EchoServiceNoOp = {
  readonly methodName: string;
  readonly service: typeof EchoService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof echo_pb.Empty;
  readonly responseType: typeof echo_pb.Empty;
};

type EchoServiceServerStreamingEcho = {
  readonly methodName: string;
  readonly service: typeof EchoService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof echo_pb.ServerStreamingEchoRequest;
  readonly responseType: typeof echo_pb.ServerStreamingEchoResponse;
};

type EchoServiceServerStreamingEchoAbort = {
  readonly methodName: string;
  readonly service: typeof EchoService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof echo_pb.ServerStreamingEchoRequest;
  readonly responseType: typeof echo_pb.ServerStreamingEchoResponse;
};

type EchoServiceClientStreamingEcho = {
  readonly methodName: string;
  readonly service: typeof EchoService;
  readonly requestStream: true;
  readonly responseStream: false;
  readonly requestType: typeof echo_pb.ClientStreamingEchoRequest;
  readonly responseType: typeof echo_pb.ClientStreamingEchoResponse;
};

type EchoServiceFullDuplexEcho = {
  readonly methodName: string;
  readonly service: typeof EchoService;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof echo_pb.EchoRequest;
  readonly responseType: typeof echo_pb.EchoResponse;
};

type EchoServiceHalfDuplexEcho = {
  readonly methodName: string;
  readonly service: typeof EchoService;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof echo_pb.EchoRequest;
  readonly responseType: typeof echo_pb.EchoResponse;
};

export class EchoService {
  static readonly serviceName: string;
  static readonly Echo: EchoServiceEcho;
  static readonly EchoAbort: EchoServiceEchoAbort;
  static readonly NoOp: EchoServiceNoOp;
  static readonly ServerStreamingEcho: EchoServiceServerStreamingEcho;
  static readonly ServerStreamingEchoAbort: EchoServiceServerStreamingEchoAbort;
  static readonly ClientStreamingEcho: EchoServiceClientStreamingEcho;
  static readonly FullDuplexEcho: EchoServiceFullDuplexEcho;
  static readonly HalfDuplexEcho: EchoServiceHalfDuplexEcho;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }
export type ServiceClientOptions = { transport: grpc.TransportConstructor; debug?: boolean }

interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}

export class EchoServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: ServiceClientOptions);
  echo(
    requestMessage: echo_pb.EchoRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: echo_pb.EchoResponse|null) => void
  ): void;
  echo(
    requestMessage: echo_pb.EchoRequest,
    callback: (error: ServiceError, responseMessage: echo_pb.EchoResponse|null) => void
  ): void;
  echoAbort(
    requestMessage: echo_pb.EchoRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: echo_pb.EchoResponse|null) => void
  ): void;
  echoAbort(
    requestMessage: echo_pb.EchoRequest,
    callback: (error: ServiceError, responseMessage: echo_pb.EchoResponse|null) => void
  ): void;
  noOp(
    requestMessage: echo_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: echo_pb.Empty|null) => void
  ): void;
  noOp(
    requestMessage: echo_pb.Empty,
    callback: (error: ServiceError, responseMessage: echo_pb.Empty|null) => void
  ): void;
  serverStreamingEcho(requestMessage: echo_pb.ServerStreamingEchoRequest, metadata?: grpc.Metadata): ResponseStream<echo_pb.ServerStreamingEchoResponse>;
  serverStreamingEchoAbort(requestMessage: echo_pb.ServerStreamingEchoRequest, metadata?: grpc.Metadata): ResponseStream<echo_pb.ServerStreamingEchoResponse>;
  clientStreamingEcho(): void;
  fullDuplexEcho(): void;
  halfDuplexEcho(): void;
}

