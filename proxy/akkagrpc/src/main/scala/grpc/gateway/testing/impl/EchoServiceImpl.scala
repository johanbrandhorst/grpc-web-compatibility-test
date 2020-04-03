package grpc.gateway.testing.impl

import akka.NotUsed
import akka.actor.ActorSystem
import akka.grpc.GrpcServiceException
import akka.stream.Materializer
import akka.stream.scaladsl.{ Keep, Sink, Source }
import com.google.protobuf.duration.Duration
import grpc.gateway.testing._
import io.grpc.Status
import scala.concurrent.{ ExecutionContext, Future }

class EchoServiceImpl(implicit actorSystem: ActorSystem, mat: Materializer) extends EchoService {
  import actorSystem.dispatcher

  /**
   * One request followed by one response
   * The server returns the client message as-is.
   */
  override def echo(in: EchoRequest): Future[EchoResponse] = Future.successful(EchoResponse(in.message))

  /**
   * Sends back abort status.
   */
  override def echoAbort(in: EchoRequest): Future[EchoResponse] = throw new GrpcServiceException(Status.ABORTED)

  /**
   * One empty request, ZERO processing, followed by one empty response
   * (minimum effort to do message serialization).
   */
  override def noOp(in: Empty): Future[Empty] = Future.successful(Empty())

  /**
   * One request followed by a sequence of responses (streamed download).
   * The server will return the same client message repeatedly.
   */
  override def serverStreamingEcho(in: ServerStreamingEchoRequest): Source[ServerStreamingEchoResponse, NotUsed] = {
    import scala.concurrent.duration._
    val interval = in.messageInterval.map(toFiniteDuration).getOrElse(100.millis)
    Source
      .tick(interval, interval, ServerStreamingEchoResponse(in.message))
      .take(in.messageCount)
      .mapMaterializedValue(_ => NotUsed)
  }

  implicit def toFiniteDuration(d: Duration) = {
    import scala.concurrent.duration._
    d.nanos.nanos + d.seconds.seconds
  }

  /**
   * One request followed by a sequence of responses (streamed download).
   * The server abort directly.
   */
  override def serverStreamingEchoAbort(in: ServerStreamingEchoRequest): Source[ServerStreamingEchoResponse, NotUsed] =
    Source
      .single(ServerStreamingEchoResponse(in.message))
      .concat(Source.failed(new GrpcServiceException(Status.ABORTED)))

  /**
   * A sequence of requests followed by one response (streamed upload).
   * The server returns the total number of messages as the result.
   */
  override def clientStreamingEcho(
      in: Source[ClientStreamingEchoRequest, NotUsed]): Future[ClientStreamingEchoResponse] =
    in.toMat(Sink.fold(0) { case (current, _) => current + 1 })(Keep.right).run().map(ClientStreamingEchoResponse(_))

  /**
   * A sequence of requests with each message echoed by the server immediately.
   * The server returns the same client messages in order.
   * E.g. this is how the speech API works.
   */
  override def fullDuplexEcho(in: Source[EchoRequest, NotUsed]): Source[EchoResponse, NotUsed] =
    in.map(in => EchoResponse(in.message))

  /**
   * A sequence of requests followed by a sequence of responses.
   * The server buffers all the client messages and then returns the same
   * client messages one by one after the client half-closes the stream.
   * This is how an image recognition API may work.
   */
  override def halfDuplexEcho(in: Source[EchoRequest, NotUsed]): Source[EchoResponse, NotUsed] = {
    Source
      .fromFutureSource(
        in.toMat(Sink.collection)(Keep.right).run().map(reqs => Source.fromIterator(() => reqs.iterator)))
      .map(in => EchoResponse(in.message))
      .mapMaterializedValue(_ => NotUsed)
  }
}
