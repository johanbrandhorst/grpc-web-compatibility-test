import sys
from wsgiref.simple_server import make_server

import grpc

import grpcWSGI.server

import echo_pb2
import echo_pb2_grpc


class Echo(echo_pb2_grpc.EchoServiceServicer):
    def Echo(self, request, context):
        return echo_pb2.EchoResponse(message=request.message)
    
    def EchoAbort(self, request, context):
        context.set_code(grpc.StatusCode.ABORTED)

    def ServerStreamingEcho(self, request, context):
        for _ in range(10):
            yield echo_pb2.EchoResponse(message=request.message)

    def ServerStreamingEchoAbort(self, request, context):
        for _ in range(5):
            yield echo_pb2.EchoResponse(message=request.message)
        context.set_code(grpc.StatusCode.ABORTED)


def main(args):
    grpc_wsgi_app = grpcWSGI.server.grpcWSGI(None)

    with make_server("", 8080, grpc_wsgi_app) as httpd:
        echo_pb2_grpc.add_EchoServiceServicer_to_server(Echo(), grpc_wsgi_app)
        httpd.serve_forever()


if __name__ == "__main__":
    sys.exit(main(sys.argv))