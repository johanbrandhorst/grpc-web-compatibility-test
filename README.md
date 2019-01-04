# grpc-web-compatibility-test

Test various implementations of gRPC-Web Clients with various implementations of gRPC-Web proxies

## Definitions

### Clients

- `improbable`

  The client created by Improbable, leveraging Fetch/XHR,
  available at https://github.com/improbable-eng/grpc-web/tree/master/ts.
  It uses the `application/grpc-web` content-type.

- `grpcweb`

  The client created by Google and the gRPC organisation,
  available at https://github.com/grpc/grpc-web, generated with `mode=grpcweb`.
  It uses XHR and the `application/grpc-web` content-type.
  It does not support server-side streaming.

- `grpcwebtext`

  The client created by Google and the gRPC organisation,
  available at https://github.com/grpc/grpc-web, generated with `mode=grpcwebtext`.
  It uses XHR and the `application/grpc-web-text` content-type.

#### Non-gRPC-Web clients tested

- `improbable-ws`

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

- `envoy`

  The Envoy Proxy HTTP filter implementation created for the `grpc/grpc-web` project,
  available at https://github.com/envoyproxy/envoy/tree/master/source/extensions/filters/http/grpc_web.
  It supports XHR and both the `application/grpc-web` and `application/grpc-web-text` content-types.

Footnote: The websocket transport is not part of the grpc-web spec.

## Requirements

`docker`, `docker-compose`.

## Running

1. Start the gRPC server
   ```bash
   $ docker-compose up -d echo-server
   ```
1. Start the proxy of your choice (`envoy` or `grpcwebproxy`)
   ```bash
   $ docker-compose up -d grpcwebproxy
   ```
1. Start the frontend of your choice (`improbable`, `improbable-ws`, `grpcweb`, `grpcwebtext`)
   ```bash
   $ docker-compose up -d improbable
   ```
1. Open the browser to http://localhost, watch the browser console for output.
1. Don't forget to kill the containers afterwards
   ```bash
   $ docker-compose down
   ```

## Compatbility status

| Proxy / Client | `improbable` | `grpcweb` | `grpcwebtext` | `improbable-ws` [1] |
| -------------- | ------------ | --------- | ------------- | ------------------- |
| `envoy`        | ✔️           | ✔️️       | ✔️            | ❌                  |
| `grpcwebproxy` | ✔️️          | ✔️        | ✔️            | ✔️️                 |

1. `improbable-ws` implements a non-standard websocket transport.

## Capability matrix

| Client / Feature    | `application/grpc-web` | `application/grpc-web-text` | Unary | Server Streams | Client+Bidi streaming |
| ------------------- | ---------------------- | --------------------------- | ----- | -------------- | --------------------- |
| `improbable`        | ✔️ ️                   | ❌                          | ✔️    | ✔️             | ❌                    |
| `grpcweb`           | ✔️ ️                   | ❌                          | ✔️    | ❌ [1]         | ❌                    |
| `grpcwebtext`       | ❌ ️                   | ✔️️                         | ✔️    | ✔️             | ❌                    |
| `improbable-ws` [2] | ✔️ ️                   | ❌                          | ✔️    | ✔️             | ✔️️                   |

1. `grpcweb` allows server streaming methods to be called, but it doesn't return data until the stream has closed.
   [(issue)](https://github.com/grpc/grpc-web/issues/344)
2. `improbable-ws` implements a non-standard websocket transport for client-side and bi-directional streams.
