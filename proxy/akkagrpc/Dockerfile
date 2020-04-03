FROM adoptopenjdk:8-jdk-hotspot

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get update && \
	apt-get -qq -y install curl wget unzip zip

RUN curl -s "https://get.sdkman.io" | bash
RUN source "$HOME/.sdkman/bin/sdkman-init.sh"; sdk install sbt 1.3.8
RUN $HOME/.sdkman/candidates/sbt/current/bin/sbt --version

COPY proxy/akkagrpc/build.sbt /akka-grpc/build.sbt
COPY proxy/akkagrpc/project/ /akka-grpc/project
COPY proto/ /akka-grpc/src/main/protobuf
COPY vendor/github.com/golang/protobuf/ptypes/duration/duration.proto /akka-grpc/src/main/protobuf/google/protobuf/duration.proto
COPY proxy/akkagrpc/src /akka-grpc/src

WORKDIR /akka-grpc
RUN $HOME/.sdkman/candidates/sbt/current/bin/sbt compile

CMD $HOME/.sdkman/candidates/sbt/current/bin/sbt run