package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"google.golang.org/grpc"
	"google.golang.org/grpc/grpclog"

	"github.com/johanbrandhorst/grpc-web-compatibility-test/backend/echo"
	pbEcho "github.com/johanbrandhorst/grpc-web-compatibility-test/backend/proto"
)

var (
	gRPCPort = flag.Int("grpc_port", 10000, "The gRPC server port")
)

var log grpclog.LoggerV2

func init() {
	log = grpclog.NewLoggerV2(os.Stdout, ioutil.Discard, ioutil.Discard)
	grpclog.SetLoggerV2(log)
}

func main() {
	flag.Parse()

	gs := grpc.NewServer()
	pbEcho.RegisterEchoServiceServer(gs, &echo.Server{})

	of := func(_ string) bool {
		return true
	}
	srv := http.Server{
		Addr: fmt.Sprintf(":%d", *gRPCPort),
		Handler: grpcweb.WrapServer(gs,
			grpcweb.WithWebsockets(true),
			grpcweb.WithOriginFunc(of),
		),
	}

	// Serve gRPC Server
	log.Info("Serving gRPC on ", srv.Addr)
	log.Fatal(srv.ListenAndServe())
}
