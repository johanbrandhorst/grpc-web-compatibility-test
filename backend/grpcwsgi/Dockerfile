FROM python:3.7

WORKDIR /usr/src/app

COPY . .

RUN ls -l
RUN pip install .
RUN pip install grpcio-tools
RUN python -m grpc.tools.protoc \
    --proto_path=proto/echo \
    --python_out=. \
    --grpc_python_out=. \
    proto/echo/echo.proto

EXPOSE 10000

CMD [ "python", "./server.py" ]