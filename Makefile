generate:
	docker run --rm -v $$(pwd):/repo jfbrandhorst/grpc-web-generators \
		protoc -I/repo/proto/echo \
		--js_out=import_style=closure:/repo/frontend/grpcwebtext/proto/ \
		--grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:/repo/frontend/grpcwebtext/proto/ \
		--js_out=import_style=closure:/repo/frontend/grpcweb/proto/ \
		--grpc-web_out=import_style=commonjs+dts,mode=grpcweb:/repo/frontend/grpcweb/proto/ \
		--js_out=import_style=commonjs,binary:/repo/frontend/improbable/proto \
		--ts_out=service=true:/repo/frontend/improbable/proto \
		--js_out=import_style=commonjs,binary:/repo/frontend/improbable-ws/proto \
		--ts_out=service=true:/repo/frontend/improbable-ws/proto \
		--go_out=plugins=grpc,path=source_relative,import_path=github.com/johanbrandhorst/grpc-web-compatibility-test/backend/proto/echo:/repo/backend/proto/ \
		/repo/proto/echo/echo.proto
