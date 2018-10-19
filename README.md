# grpc-web-compatibility-test
Test various implementations of gRPC-Web Clients with various implementations of gRPC-Web proxies

## Definitions

* `improbable`
    The client created by Improbable, leveraging Fetch/XHR,
    available at https://github.com/improbable-eng/grpc-web/tree/master/ts.
    It uses the `application/grpc-web+proto` content-type.
* `improbable-ws`
    The client created by Improbable, leveraging websockets,
    available at https://github.com/improbable-eng/grpc-web/tree/master/ts.
    It uses the `application/grpc-web+proto` content-type.
* `grpcwebproxy`
    The proxy created by Improbable,
    available at https://github.com/improbable-eng/grpc-web/tree/master/go/grpcwebproxy.
    It supports both Fetch/XHR and websockets transports.
    It supports the `application/grpc-web+proto` content-type only.
* `grpcweb`,
    The client created by Google and the gRPC organisation,
    available at https://github.com/grpc/grpc-web.
    It uses XHR and the `application/grpc-web+proto` content-type.
* `grpcwebtext`
    The client created by Google and the gRPC organisation,
    available at https://github.com/grpc/grpc-web.
    It uses XHR and the `application/grpc-web-text` content-type.
* `envoy`
    The Envoy Proxy HTTP filter implementation created for the `grpc/grpc-web` project,
    available at https://github.com/envoyproxy/envoy/tree/master/source/extensions/filters/http/grpc_web.
    It supports XHR and both the `application/grpc-web+proto` and `application/grpc-web-text` content-types.

Footnote: The websocket transport is not part of the grpc-web spec.

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

| Proxy / Client | `improbable` | `improbable-ws` | `grpcweb` | `grpcwebtext` |
|----------------|--------------|-----------------|-----------|---------------|
| `grpcwebproxy` | ✔️            | ✔️               | ✔️         | ❌ [(issue)](https://github.com/improbable-eng/grpc-web/issues/254) |
| `envoy`        | ✔            | ❌              | ✔️         | ✔             |

Footnote: `improbable-ws` implements a non-standard websocket transport.

## Capability matrix

| Client / Feature | `application/grpc-web+proto` | `application/grpc-web-text` | Unary+Server Streams | Client+Bidi streaming |
|------------------|------------------------------|-----------------------------|----------------------|-----------------------|
| `improbable`     | ✔                 ️           | ❌                          | ✔                    | ❌                    |
| `improbable-ws`  | ✔                 ️           | ❌                          | ✔                    | ✔️                     |
| `grpcweb`        | ✔   ️                         | ❌                          | ✔                    | ❌                    |
| `grpcwebtext`    | ❌   ️                        | ✔️                           | ✔                    | ❌                    |
