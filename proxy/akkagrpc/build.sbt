enablePlugins(AkkaGrpcPlugin)

libraryDependencies += "ch.megard" %% "akka-http-cors" % "0.4.2"


lazy val root = (project in file("."))
  .settings(
    inThisBuild(List(
      organization := "test",
      scalaVersion := "2.13.1"
    )),
    name := "Akka gRPC Compatibility Test"
  )