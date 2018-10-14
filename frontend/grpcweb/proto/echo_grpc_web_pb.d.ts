import * as grpcWeb from 'grpc-web';
import {
  ClientStreamingEchoRequest,
  ClientStreamingEchoResponse,
  EchoRequest,
  EchoResponse,
  Empty,
  ServerStreamingEchoRequest,
  ServerStreamingEchoResponse} from './echo_pb';

export class EchoServiceClient {
  constructor (hostname: string,
               credentials: {},
               options: { [s: string]: {}; });

  echo(
    request: EchoRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: EchoResponse) => void
  ): grpcWeb.ClientReadableStream;

  echoAbort(
    request: EchoRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: EchoResponse) => void
  ): grpcWeb.ClientReadableStream;

  noOp(
    request: Empty,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream;

  serverStreamingEcho(
    request: ServerStreamingEchoRequest,
    metadata: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream;

  serverStreamingEchoAbort(
    request: ServerStreamingEchoRequest,
    metadata: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream;

}

