FROM python:3.7

WORKDIR /usr/src/app

COPY . .

RUN pip install grpcio-tools grpcWSGI

RUN python -m grpc.tools.protoc \
    --proto_path=proto/echo \
    --python_out=proxy/grpcwsgi/ \
    --grpc_python_out=proxy/grpcwsgi/ \
    proto/echo/echo.proto

ENTRYPOINT exec python ./proxy/grpcwsgi/server.py