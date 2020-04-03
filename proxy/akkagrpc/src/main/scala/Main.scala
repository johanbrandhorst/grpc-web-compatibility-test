import akka.actor.ActorSystem
import akka.grpc.scaladsl.WebHandler
import akka.http.scaladsl.{ Http, HttpConnectionContext }
import akka.stream.{ ActorMaterializer, Materializer }
import com.typesafe.config.ConfigFactory

import grpc.gateway.testing._
import grpc.gateway.testing.impl.EchoServiceImpl

import scala.concurrent.ExecutionContext

object Main {
  def main(args: Array[String]): Unit = {
    val conf = ConfigFactory
      .parseString("akka.http.server.preview.enable-http2 = on")
      .withFallback(ConfigFactory.defaultApplication())

    implicit val sys: ActorSystem = ActorSystem("HelloWorld", conf)
    implicit val mat: Materializer = ActorMaterializer()
    implicit val ec: ExecutionContext = sys.dispatcher

    Http()
      .bindAndHandleAsync(
        WebHandler.grpcWebHandler(EchoServiceHandler.partial(new EchoServiceImpl())),
        interface = "0.0.0.0",
        port = 8080,
        connectionContext = HttpConnectionContext())
        .foreach { binding => println(s"gRPC-Web server bound to: ${binding.localAddress}") }
	}
}