import * as assert from 'assert';
import { grpc } from "@improbable-eng/grpc-web";
import { Duration } from "google-protobuf/google/protobuf/duration_pb";
import {
  EchoServiceClient,
  ServiceError,
  Status
} from "./proto/echo_pb_service";
import {
  EchoRequest,
  EchoResponse,
  ServerStreamingEchoRequest,
  ServerStreamingEchoResponse
} from "./proto/echo_pb";

var client: EchoServiceClient;

before(async () => {
  // Set host using --grpc-host param to karma
  const host: string = (<any>window).__karma__.config.grpcHost;

  client = new EchoServiceClient(host, {
    transport: grpc.CrossBrowserHttpTransport({
      withCredentials: false
    }),
    debug: true
  });
})

describe('grpc client', function () {
  it('EchoRequest', function (done) {
    const req = new EchoRequest();
    req.setMessage("test");
    client.echo(req, function (
      err: ServiceError | null,
      resp: EchoResponse | null
    ) {
      assert(err === null);
      assert(resp !== null);
      assert(resp!.getMessage() == "test")
      done();
    });
  });

  it('EchoAbortRequest', function (done) {
    const req = new EchoRequest();
    req.setMessage("test");
    client.echoAbort(req, function (
      err: ServiceError | null,
      resp: EchoResponse | null
    ) {
      assert(err!.code == grpc.Code.Aborted);
      assert(resp === null);
      done();
    });
  });

  it('ServerStreamingEchoRequest', function (done) {
    const req = new ServerStreamingEchoRequest();
    req.setMessageCount(5);
    var interval = new Duration();
    interval.setSeconds(1);
    req.setMessageInterval(interval);
    req.setMessage("test");
    const srv = client.serverStreamingEcho(req);

    var recvCount = 0;

    srv.on("data", function (msg: ServerStreamingEchoResponse) {
      assert(msg.getMessage() === 'test');
      recvCount += 1;
    });

    srv.on("status", function (status: Status) {
      assert(status.code == grpc.Code.OK);
      assert(recvCount == 5);
      done();
    });
  }).timeout(10000);

  it('ServerStreamingEchoAbortRequest', function (done) {
    const req = new ServerStreamingEchoRequest();
    req.setMessageCount(5);
    var interval = new Duration();
    interval.setSeconds(1);
    req.setMessageInterval(interval);
    req.setMessage("test");
    const srv = client.serverStreamingEchoAbort(req);

    var recvCount = 0;

    srv.on("data", function (msg: ServerStreamingEchoResponse) {
      assert(msg.getMessage() == "test");
      recvCount += 1;
    });

    srv.on("status", function (status: Status) {
      assert(status.code == grpc.Code.Aborted);
      assert(recvCount < 5);
      done();
    });
  });
});