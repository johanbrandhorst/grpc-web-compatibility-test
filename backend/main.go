package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"net"
	"os"

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
	addr := fmt.Sprintf("0.0.0.0:%d", *gRPCPort)
	lis, err := net.Listen("tcp", addr)
	if err != nil {
		log.Fatalln("Failed to listen:", err)
	}

	s := grpc.NewServer()

	pbEcho.RegisterEchoServiceServer(s, &echo.Server{})

	// Serve gRPC Server
	log.Info("Serving gRPC on ", addr)
	log.Fatal(s.Serve(lis))
}
