import * as grpcWeb from "grpc-web";

import { EchoServiceClient } from "./proto/EchoServiceClientPb";
import { Duration } from "google-protobuf/google/protobuf/duration_pb";

import {
  EchoRequest,
  EchoResponse,
  ServerStreamingEchoRequest,
  ServerStreamingEchoResponse
} from "./proto/echo_pb";

import { assert } from '../grpcWeb/node_modules/chai';

var client: EchoServiceClient;

before(async () => {
  // Set host using --grpc-host param to karma
  const host: string = (<any>window).__karma__.config.grpcHost;
  client = new EchoServiceClient(host, {}, {});
})

describe('grpc client', function () {
  it('EchoRequest', function (done) {
    const req = new EchoRequest();
    req.setMessage("test");
    client.echo(req, {}, function (
      err: grpcWeb.Error | null,
      resp: EchoResponse | null
    ) {
      assert.equal(err, null);
      assert.notEqual(resp, null);
      assert.equal(resp!.getMessage(), "test")
      done();
    });
  });

  it('EchoAbortRequest', function (done) {
    const req = new EchoRequest();
    req.setMessage("test");
    client.echoAbort(req, {}, function (
      err: grpcWeb.Error | null,
      resp: EchoResponse | null
    ) {
      assert.equal(err!.code, grpcWeb.StatusCode.ABORTED);
      assert.isNull(resp);
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

    srv.on("status", function (status: grpcWeb.Status) {
      assert.equal(status.code, grpcWeb.StatusCode.OK);
    });

    srv.on("end", function () {
      assert.equal(recvCount, 5);
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

    // This test is expected to fail due to an unhandled exception
    // inside gRPC-Web. We expect it to happen and only pass the
    // test if it actually happens.

    window.onerror = function (message, file, line, col, error) {
      assert.include(<string>message, "b.i is not a function");
      done();
      return false;
    };

    const srv = client.serverStreamingEchoAbort(req);

    srv.on("end", function () {
      assert(false);
    });
  });
});
