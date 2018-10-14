FROM golang:latest

COPY . /go/src/github.com/johanbrandhorst/grpc-web-compatibility-test

ENV CGO_ENABLED 0

RUN cd /go/src/github.com/johanbrandhorst/grpc-web-compatibility-test && \
    go build -o /grpcwebproxy ./vendor/github.com/improbable-eng/grpc-web/go/grpcwebproxy

FROM scratch

COPY --from=0 /grpcwebproxy /grpcwebproxy

ENTRYPOINT ["/grpcwebproxy"]
