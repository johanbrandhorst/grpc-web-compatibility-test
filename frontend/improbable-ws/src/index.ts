import { grpc } from "@improbable-eng/grpc-web";
import { Duration } from "google-protobuf/google/protobuf/duration_pb";
import {
  EchoServiceClient,
  ServiceError,
  Status,
  EchoService
} from "../proto/echo_pb_service";
import {
  EchoRequest,
  EchoResponse,
  ServerStreamingEchoRequest,
  ServerStreamingEchoResponse,
  ClientStreamingEchoRequest,
  ClientStreamingEchoResponse
} from "../proto/echo_pb";

const host = "http://localhost:8080";
var client = new EchoServiceClient(host, {
  transport: grpc.WebsocketTransport(),
  debug: true
});

function makeEchoRequest() {
  const req = new EchoRequest();
  req.setMessage("test");
  client.echo(req, function(
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
  client.echoAbort(req, function(
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
  srv.on("data", function(msg: ServerStreamingEchoResponse) {
    console.log("Streaming success");
    console.log("Message:", msg.getMessage());
  });
  srv.on("end", function() {
    console.log("Server stream finished");
  });
  srv.on("status", function(status: Status) {
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
  srv.on("data", function(msg: ServerStreamingEchoResponse) {
    console.log("Streaming success");
    console.log("Message:", msg.getMessage());
  });
  srv.on("end", function() {
    console.log("Server stream finished");
  });
  srv.on("status", function(status: Status) {
    if (status.code != grpc.Code.OK) {
      console.log("Got streaming error (as expected)");
      console.log("Error:", status.details);
      console.log("Code:", status.code);
      console.log("Metadata:", status.metadata);
    }
  });
}

makeServerStreamingEchoAbortRequest();

function makeClientStreamingEchoRequest() {
  const req = new ClientStreamingEchoRequest();
  req.setMessage("test");
  const srv = client.clientStreamingEcho();
  srv.on("end", function() {
    console.log("Client stream finished");
  });
  srv.on("status", function(status: Status) {
    if (status.code != grpc.Code.OK) {
      console.log("Got streaming error");
      console.log("Error:", status.details);
      console.log("Code:", status.code);
      console.log("Metadata:", status.metadata);
    }
  });
  srv.write(req);
  srv.write(req);
  srv.write(req);
  srv.write(req);
  srv.write(req);
  srv.end();
}

makeClientStreamingEchoRequest();

function makeFullDuplexEchoRequest() {
  const req = new EchoRequest();
  req.setMessage("test");

  const srv = client.fullDuplexEcho();
  srv.on("data", function(msg: EchoResponse) {
    console.log("Message received");
    console.log("Message:", msg.getMessage());
  });
  srv.on("end", function() {
    console.log("Server stream finished");
  });
  srv.on("status", function(status: Status) {
    if (status.code != grpc.Code.OK) {
      console.log("Got streaming error");
      console.log("Error:", status.details);
      console.log("Code:", status.code);
      console.log("Metadata:", status.metadata);
    }
  });
  srv.write(req);
  srv.write(req);
  srv.write(req);
  srv.write(req);
  srv.write(req);
  srv.end();
}

makeFullDuplexEchoRequest();

function makeHalfDuplexEchoRequest() {
  const req = new EchoRequest();
  req.setMessage("test");

  const srv = client.halfDuplexEcho();
  srv.on("data", function(msg: EchoResponse) {
    console.log("Message received");
    console.log("Message:", msg.getMessage());
  });
  srv.on("end", function() {
    console.log("Server stream finished");
  });
  srv.on("status", function(status: Status) {
    if (status.code != grpc.Code.OK) {
      console.log("Got streaming error");
      console.log("Error:", status.details);
      console.log("Code:", status.code);
      console.log("Metadata:", status.metadata);
    }
  });
  srv.write(req);
  srv.write(req);
  srv.write(req);
  srv.write(req);
  srv.write(req);
  srv.end();
}

makeHalfDuplexEchoRequest();
