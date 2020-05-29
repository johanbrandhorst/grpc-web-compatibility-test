FROM golang:latest

COPY . /src

ENV CGO_ENABLED 0
ENV GO111MODULE on

RUN cd /src && go build -o /backend ./backend

FROM scratch

COPY --from=0 /backend /backend

ENTRYPOINT ["/backend"]
