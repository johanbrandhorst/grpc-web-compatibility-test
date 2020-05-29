FROM python:3.7

WORKDIR /usr/src/app

RUN pip install grpcio-tools sonora

COPY . .

RUN python -m grpc.tools.protoc \
    --proto_path=proto/echo \
    --python_out=proxy/grpcwsgi/ \
    --grpc_python_out=proxy/grpcwsgi/ \
    proto/echo/echo.proto

ENTRYPOINT ["python", "./proxy/grpcwsgi/server.py"]
