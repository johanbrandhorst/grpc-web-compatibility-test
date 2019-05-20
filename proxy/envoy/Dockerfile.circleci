FROM envoyproxy/envoy:latest
FROM circleci/golang:latest-node-browsers

COPY --from=0 /usr/local/bin/envoy /usr/local/bin/envoy
