import { grpc } from "@improbable-eng/grpc-web";
import { Duration } from "google-protobuf/google/protobuf/duration_pb";
import {
  EchoServiceClient,
  ServiceError,
  Status
} from "../proto/echo_pb_service";
import {
  EchoRequest,
  EchoResponse,
  ServerStreamingEchoRequest,
  ServerStreamingEchoResponse
} from "../proto/echo_pb";

const host = "http://" + window.location.hostname + ":8080";
var client = new EchoServiceClient(host, {
  transport: grpc.CrossBrowserHttpTransport({
    withCredentials: false
  }),
  debug: true
});

function makeEchoRequest() {
  const req = new EchoRequest();
  req.setMessage("test");
  client.echo(req, function (
    err: ServiceError | null,
    resp: EchoResponse | null
  ) {
    if (err != null) {
      console.log("Unary error");
      console.log("Error:", err.message);
      console.log("Code:", err.code);
      console.log("Metadata:", err.metadata);
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
  client.echoAbort(req, function (
    err: ServiceError | null,
    resp: EchoResponse | null
  ) {
    if (err != null) {
      console.log("Unary error (as expected)");
      console.log("Error:", err.message);
      console.log("Code:", err.code);
      console.log("Metadata:", err.metadata);
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
  const srv = client.serverStreamingEcho(req);
  srv.on("data", function (msg: ServerStreamingEchoResponse) {
    console.log("Streaming success");
    console.log("Message:", msg.getMessage());
  });
  srv.on("end", function () {
    console.log("Server stream finished");
  });
  srv.on("status", function (status: Status) {
    if (status.code != grpc.Code.OK) {
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
  const srv = client.serverStreamingEchoAbort(req);
  srv.on("data", function (msg: ServerStreamingEchoResponse) {
    console.log("Streaming success");
    console.log("Message:", msg.getMessage());
  });
  srv.on("end", function () {
    console.log("Server stream finished");
  });
  srv.on("status", function (status: Status) {
    if (status.code != grpc.Code.OK) {
      console.log("Got streaming error (as expected)");
      console.log("Error:", status.details);
      console.log("Code:", status.code);
      console.log("Metadata:", status.metadata);
    }
  });
}

makeServerStreamingEchoAbortRequest();
