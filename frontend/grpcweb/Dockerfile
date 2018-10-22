FROM golang:latest

COPY . /go/src/github.com/johanbrandhorst/grpc-web-compatibility-test

ENV CGO_ENABLED 0

RUN go build -o /frontend github.com/johanbrandhorst/grpc-web-compatibility-test/frontend/grpcweb

FROM node:latest

COPY . /home/node/src

RUN cd /home/node/src/frontend/grpcweb && npm install && ./node_modules/.bin/webpack

FROM scratch

COPY --from=0 /frontend /frontend
COPY --from=1 /home/node/src/frontend/grpcweb/html /html

EXPOSE 10000

ENTRYPOINT ["/frontend", "--root-dir", "/html", "--port", "10000"]
