generate:
	docker run --rm -v $$(pwd):/repo jfbrandhorst/grpc-web-generators \
		protoc -I/repo/proto/echo \
		--js_out=import_style=commonjs:/repo/frontend/grpcWebText/proto/ \
		--grpc-web_out=import_style=typescript,mode=grpcwebtext:/repo/frontend/grpcWebText/proto/ \
		--js_out=import_style=commonjs:/repo/frontend/grpcWeb/proto/ \
		--grpc-web_out=import_style=typescript,mode=grpcweb:/repo/frontend/grpcWeb/proto/ \
		--js_out=import_style=commonjs,binary:/repo/frontend/improbable/proto \
		--ts_out=service=true:/repo/frontend/improbable/proto \
		--js_out=import_style=commonjs,binary:/repo/frontend/improbableWS/proto \
		--ts_out=service=true:/repo/frontend/improbableWS/proto \
		--go_out=plugins=grpc,path=source_relative,import_path=github.com/johanbrandhorst/grpc-web-compatibility-test/backend/proto/echo:/repo/backend/proto/ \
		/repo/proto/echo/echo.proto

	docker run --rm -v $$(pwd):/repo jfbrandhorst/grpc-web-generators \
		python3 -m grpc.tools.protoc \
		--proto_path=/repo/proto/echo \
		--python_out=/repo/proxy/grpcwsgi/ \
		--grpc_python_out=/repo/proxy/grpcwsgi/ \
		/repo/proto/echo/echo.proto

envoy-circle-image:
	docker build proxy/envoy --file proxy/envoy/Dockerfile.circleci --tag public/grpcweb-testing-envoy:latest
