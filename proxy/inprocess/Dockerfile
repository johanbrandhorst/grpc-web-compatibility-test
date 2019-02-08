FROM golang:latest

COPY . /go/src/github.com/johanbrandhorst/grpc-web-compatibility-test

ENV CGO_ENABLED 0

RUN go build -o /inprocess github.com/johanbrandhorst/grpc-web-compatibility-test/proxy/inprocess

FROM scratch

COPY --from=0 /inprocess /inprocess

ENTRYPOINT ["/inprocess"]
