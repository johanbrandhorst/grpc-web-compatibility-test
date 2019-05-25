# grpc-web-compatibility-test
[![CircleCI](https://img.shields.io/circleci/project/github/johanbrandhorst/grpc-web-compatibility-test/master.svg?style=flat-square)](https://circleci.com/gh/johanbrandhorst/grpc-web-compatibility-test)

Test various implementations of gRPC-Web Clients with various implementations of gRPC-Web proxies

## Definitions

### Clients

- `improbable`

  The client created by Improbable, leveraging Fetch/XHR,
  available at https://github.com/improbable-eng/grpc-web/tree/master/ts.
  It uses the `application/grpc-web` content-type.

- `grpcWeb`

  The client created by Google and the gRPC organisation,
  available at https://github.com/grpc/grpc-web, generated with `mode=grpcweb`.
  It uses XHR and the `application/grpc-web` content-type.
  It does not support server-side streaming.

- `grpcWebText`

  The client created by Google and the gRPC organisation,
  available at https://github.com/grpc/grpc-web, generated with `mode=grpcwebtext`.
  It uses XHR and the `application/grpc-web-text` content-type.

#### Non-gRPC-Web clients tested

- `improbableWS`

  The client created by Improbable, leveraging an experimental websocket transport,
  available at https://github.com/improbable-eng/grpc-web/tree/master/ts.
  It uses the `application/grpc-web` content-type. It is not part of the
  gRPC-Web spec, and not recommended for production use.

### Proxies

- `grpcwebproxy`

  The proxy created by Improbable,
  available at https://github.com/improbable-eng/grpc-web/tree/master/go/grpcwebproxy.
  It supports both Fetch/XHR and websockets transports.
  It supports the `application/grpc-web` content-type only.

- `inprocess`

  The same as `grpcwebproxy`, but running as an in-process proxy to a Go gRPC
  server.
  It supports both Fetch/XHR and websockets transports.
  It supports the `application/grpc-web` content-type only.

- `envoy`

  The Envoy Proxy HTTP filter implementation created for the `grpc/grpc-web` project,
  available at https://github.com/envoyproxy/envoy/tree/master/source/extensions/filters/http/grpc_web.
  It supports XHR and both the `application/grpc-web` and `application/grpc-web-text` content-types.

- `grpcwsgi`

  A Python WSGI compatible implementation of gRPC-Web, available at https://github.com/public/grpcWSGI.
  It supports Fetch/XHR only.
  It supports `application/grpc-web` only.

Note: The websocket transport is not part of the grpc-web spec.

## Requirements

`docker`, `docker-compose`.

## Running

1. Start the server implementation of your choice (`envoy`, `grpcwebproxy`, `inprocess`, `grpcwsgi`)
   ```bash
   $ docker-compose up -d grpcwebproxy
   ```
2. Run the frontend tests of your choice (`improbable`, `improbableWS`, `grpcWeb`, `grpcWebtext`)
   ```bash
   $ docker-compose run frontend karma:improbable --grpc-host=http://inprocess:8080
   ```

Note: The `inprocess` and `grpcwsgi` proxies do not require `echo-server` to be running,
they include the server themselves. `envoy` and `grpcwebproxy` will automatically start
the `echo-server` container on up.

## Compatbility status

| Proxy / Client | `improbable` | `grpcWeb` | `grpcWebText` | `improbableWS` [1] |
| -------------- | ------------ | --------- | ------------- | ------------------- |
| `envoy`        | ✔️           | ✔️️       | ✔️            | ❌                   |
| `grpcwebproxy` | ✔️️          | ✔️        | ✔️            | ✔️️                 |
| `inprocess`    | ✔️️          | ✔️        | ✔️            | ✔️️                 |
| `grpcwsgi`     | ❌            | ❌         | ❌             | ❌                   |

1. `improbable-ws` implements a non-standard websocket transport.

## Capability matrix

| Client / Feature    | `application/grpc-web` | `application/grpc-web-text` | Unary | Server Streams | Client+Bidi streaming |
| ------------------- | ---------------------- | --------------------------- | ----- | -------------- | --------------------- |
| `improbable`        | ✔️ ️                   | ❌                           | ✔️    | ✔️             | ❌                     |
| `grpcWeb`           | ✔️ ️                   | ❌                           | ✔️    | ❌ [1]          | ❌                     |
| `grpcWebText`       | ❌ ️                    | ✔️️                         | ✔️    | ✔️             | ❌                     |
| `improbableWS` [2] | ✔️ ️                   | ❌                           | ✔️    | ✔️             | ✔️️                   |
| `grpcwsgi`          | ✔️ ️                   | ❌                           | ✔️    | ✔️             | ❌                     |

1. `grpcWeb` allows server streaming methods to be called, but it doesn't return data until the stream has closed.
   [(issue)](https://github.com/grpc/grpc-web/issues/344)
2. `improbable-ws` implements a non-standard websocket transport for client-side and bi-directional streams.

## Building

Most of the build is managed by docker-compose but you may also want to manually rebuild some
other things sometimes. Makefile commands are provided for building the protobuf bindings for
all implementations and for rebuilding the Envoy container used in CI as this needs additional
configuration.

To rebuild the protobuf bindings just run `make generate` and commit the new bindings. You
will probably only need to do this when adding a new implementation.

To rebuild the Envoy CI image, run `make envoy-circle-image`. If you happen to be a contributor
you'll also be able to do `docker push public/grpcweb-testing-envoy:latest` to push the new image
to Docker Hub.
