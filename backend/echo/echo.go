// Package echo is written to as closely as possible
// mirror the behaviour of the C++ implementation in grpc/grpc-web:
// https://github.com/grpc/grpc-web/blob/92aa9f8fc8e7af4aadede52ea075dd5790a63b62/net/grpc/gateway/examples/echo/echo_service_impl.cc
package echo

import (
	"context"
	"io"
	"time"

	"github.com/golang/protobuf/ptypes"
	"github.com/johanbrandhorst/grpc-web-compatibility-test/backend/proto"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

var _ echo.EchoServiceServer = (*Server)(nil)

type Server struct{}

// One request followed by one response
// The server returns the client message as-is.
func (s Server) Echo(ctx context.Context, req *echo.EchoRequest) (*echo.EchoResponse, error) {
	return &echo.EchoResponse{
		Message: req.GetMessage(),
	}, nil
}

// Sends back abort status.
func (s Server) EchoAbort(ctx context.Context, req *echo.EchoRequest) (*echo.EchoResponse, error) {
	return nil, status.Error(codes.Aborted, "Aborted from server side.")
}

// One empty request, ZERO processing, followed by one empty response
// (minimum effort to do message serialization).
func (s Server) NoOp(ctx context.Context, req *echo.Empty) (*echo.Empty, error) {
	return new(echo.Empty), nil
}

// One request followed by a sequence of responses (streamed download).
// The server will return the same client message repeatedly.
func (s Server) ServerStreamingEcho(req *echo.ServerStreamingEchoRequest, srv echo.EchoService_ServerStreamingEchoServer) error {
	d, err := ptypes.Duration(req.GetMessageInterval())
	if err != nil {
		return status.Error(codes.InvalidArgument, "invalid duration")
	}
	for i := int32(0); i < req.GetMessageCount(); i++ {
		select {
		case <-srv.Context().Done():
			return status.FromContextError(srv.Context().Err()).Err()
		case <-time.After(d):
		}
		err := srv.Send(&echo.ServerStreamingEchoResponse{
			Message: req.GetMessage(),
		})
		if err != nil {
			return err
		}
	}
	return nil
}

// One request followed by a sequence of responses (streamed download).
// The server abort directly.
func (s Server) ServerStreamingEchoAbort(req *echo.ServerStreamingEchoRequest, srv echo.EchoService_ServerStreamingEchoAbortServer) error {
	err := srv.Send(&echo.ServerStreamingEchoResponse{
		Message: req.GetMessage(),
	})
	if err != nil {
		return err
	}
	return status.Error(codes.Aborted, "Aborted from server side.")
}

// A sequence of requests followed by one response (streamed upload).
// The server returns the total number of messages as the result.
func (s Server) ClientStreamingEcho(srv echo.EchoService_ClientStreamingEchoServer) error {
	var msgs int32
	for {
		_, err := srv.Recv()
		if err != nil {
			if err == io.EOF {
				break
			}
			return err
		}

		msgs++
	}

	return srv.SendAndClose(&echo.ClientStreamingEchoResponse{
		MessageCount: msgs,
	})
}

// A sequence of requests with each message echoed by the server immediately.
// The server returns the same client messages in order.
// E.g. this is how the speech API works.
func (s Server) FullDuplexEcho(srv echo.EchoService_FullDuplexEchoServer) error {
	for {
		msg, err := srv.Recv()
		if err != nil {
			if err == io.EOF {
				return nil
			}
			return err
		}

		err = srv.Send(&echo.EchoResponse{
			Message: msg.GetMessage(),
		})
		if err != nil {
			return err
		}
	}
}

// A sequence of requests followed by a sequence of responses.
// The server buffers all the client messages and then returns the same
// client messages one by one after the client half-closes the stream.
// This is how an image recognition API may work.
func (s Server) HalfDuplexEcho(srv echo.EchoService_HalfDuplexEchoServer) error {
	var msgs []*echo.EchoRequest
	for {
		msg, err := srv.Recv()
		if err != nil {
			if err == io.EOF {
				break
			}
			return err
		}
		msgs = append(msgs, msg)
	}

	for _, msg := range msgs {
		err := srv.Send(&echo.EchoResponse{
			Message: msg.GetMessage(),
		})
		if err != nil {
			return err
		}
	}

	return nil
}
