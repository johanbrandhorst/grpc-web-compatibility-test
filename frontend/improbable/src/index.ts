import {grpc} from "grpc-web-client";
import {EchoServiceClient, ServiceError} from "../proto/echo_pb_service";
import { EchoRequest, EchoResponse } from "../proto/echo_pb";

const host = "http://localhost:8080";
var client = new EchoServiceClient(host);

const echoRequest = new EchoRequest();
echoRequest.setMessage("test")
client.echo(echoRequest, function(err: ServiceError, response: EchoResponse | null) {
  if (err) /* YOLO truthy */ {
    console.log(err)
  } else {
    console.log(response!.getMessage(), response!.getMessageCount())
  }
});

/*
  const getBookRequest = new GetBookRequest();
  getBookRequest.setIsbn(60929871);
  grpc.unary(BookService.GetBook, {
    request: getBookRequest,
    host: host,
    onEnd: res => {
      const { status, statusMessage, headers, message, trailers } = res;
      console.log("getBook.onEnd.status", status, statusMessage);
      console.log("getBook.onEnd.headers", headers);
      if (status === grpc.Code.OK && message) {
        console.log("getBook.onEnd.message", message.toObject());
      }
      console.log("getBook.onEnd.trailers", trailers);
      queryBooks();
    }
  });
}

getBook();

function queryBooks() {
  const queryBooksRequest = new QueryBooksRequest();
  queryBooksRequest.setAuthorPrefix("Geor");
  const client = grpc.client(BookService.QueryBooks, {
    host: host,
  });
  client.onHeaders((headers: grpc.Metadata) => {
    console.log("queryBooks.onHeaders", headers);
  });
  client.onMessage((message: Book) => {
    console.log("queryBooks.onMessage", message.toObject());
  });
  client.onEnd((code: grpc.Code, msg: string, trailers: grpc.Metadata) => {
    console.log("queryBooks.onEnd", code, msg, trailers);
  });
  client.start();
  client.send(queryBooksRequest);
}
*/
