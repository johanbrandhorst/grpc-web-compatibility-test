import * as grpcWeb from "grpc-web";

import { EchoServiceClient } from "../proto/EchoServiceClientPb";
import { Duration } from "google-protobuf/google/protobuf/duration_pb";

import {
  EchoRequest,
  EchoResponse,
  ServerStreamingEchoRequest,
  ServerStreamingEchoResponse
} from "../proto/echo_pb";

const host = "http://localhost:8080";
var client = new EchoServiceClient(host, {}, {});

function makeEchoRequest() {
  const req = new EchoRequest();
  req.setMessage("test");
  client.echo(req, {}, function(err: grpcWeb.Error, resp: EchoResponse | null) {
    if (err != undefined) {
      console.log("Unary error");
      console.log("Error:", err.message);
      console.log("Code:", err.code);
    } else {
      console.log("Unary success");
      console.log("Message:", resp!.getMessage());
    }
  });
}

makeEchoRequest();

function makeEchoAbortRequest() {
  const req = new EchoRequest();
  req.setMessage("test");
  client.echoAbort(req, {}, function(
    err: grpcWeb.Error,
    resp: EchoResponse | null
  ) {
    if (err != undefined) {
      console.log("Unary error (as expected)");
      console.log("Error:", err.message);
      console.log("Code:", err.code);
    } else {
      console.log("Unary success");
      console.log("Message:", resp!.getMessage());
    }
  });
}

makeEchoAbortRequest();

function makeServerStreamingEchoRequest() {
  const req = new ServerStreamingEchoRequest();
  req.setMessageCount(5);
  var interval = new Duration();
  interval.setSeconds(1);
  req.setMessageInterval(interval);
  req.setMessage("test");
  const srv = client.serverStreamingEcho(req, {});
  srv.on("data", function(msg: ServerStreamingEchoResponse) {
    console.log("Streaming success");
    console.log("Message:", msg.getMessage());
  });
  srv.on("error", function(err: grpcWeb.Error) {
    console.log("Server stream errored!");
    console.log("Error:", err.message);
    console.log("Code:", err.code);
  });
  srv.on("end", function() {
    console.log("Server stream finished");
  });
  srv.on("status", function(status: grpcWeb.Status) {
    if (status.code != grpcWeb.StatusCode.OK) {
      console.log("Got streaming error");
      console.log("Error:", status.details);
      console.log("Code:", status.code);
      console.log("Metadata:", status.metadata);
    }
  });
}

makeServerStreamingEchoRequest();

function makeServerStreamingEchoAbortRequest() {
  const req = new ServerStreamingEchoRequest();
  req.setMessageCount(5);
  var interval = new Duration();
  interval.setSeconds(1);
  req.setMessageInterval(interval);
  req.setMessage("test");
  const srv = client.serverStreamingEchoAbort(req, {});
  srv.on("data", function(msg: ServerStreamingEchoResponse) {
    console.log("Streaming success");
    console.log("Message:", msg.getMessage());
  });
  srv.on("error", function(err: grpcWeb.Error) {
    console.log("Server stream errored (as expected)");
    console.log("Error:", err.message);
    console.log("Code:", err.code);
  });
  srv.on("end", function() {
    console.log("Server stream finished");
  });
  srv.on("status", function(status: grpcWeb.Status) {
    if (status.code != grpcWeb.StatusCode.OK) {
      console.log("Got streaming error (as expected)");
      console.log("Error:", status.details);
      console.log("Code:", status.code);
      console.log("Metadata:", status.metadata);
    }
  });
}

makeServerStreamingEchoAbortRequest();
