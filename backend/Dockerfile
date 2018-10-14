FROM golang:latest

COPY . /go/src/github.com/johanbrandhorst/grpc-web-compatibility-test

ENV CGO_ENABLED 0

RUN go build -o /backend github.com/johanbrandhorst/grpc-web-compatibility-test/backend

FROM scratch

COPY --from=0 /backend /backend

ENTRYPOINT ["/backend"]
