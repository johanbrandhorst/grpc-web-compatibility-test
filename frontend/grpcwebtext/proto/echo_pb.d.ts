export class Duration {
  constructor();
  getSeconds(): number;
  setSeconds(a: number): void;
  getNanos(): number;
  setNanos(a: number): void;
  toObject(): Duration.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Duration;
}

export namespace Duration {
  export type AsObject = {
    seconds: number;
    nanos: number;
  };
}

export class ClientStreamingEchoRequest {
  constructor();
  getMessage(): string;
  setMessage(a: string): void;
  toObject(): ClientStreamingEchoRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ClientStreamingEchoRequest;
}

export namespace ClientStreamingEchoRequest {
  export type AsObject = {
    Message: string;
  };
}

export class ClientStreamingEchoResponse {
  constructor();
  getMessageCount(): number;
  setMessageCount(a: number): void;
  toObject(): ClientStreamingEchoResponse.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ClientStreamingEchoResponse;
}

export namespace ClientStreamingEchoResponse {
  export type AsObject = {
    MessageCount: number;
  };
}

export class EchoRequest {
  constructor();
  getMessage(): string;
  setMessage(a: string): void;
  toObject(): EchoRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => EchoRequest;
}

export namespace EchoRequest {
  export type AsObject = {
    Message: string;
  };
}

export class EchoResponse {
  constructor();
  getMessage(): string;
  setMessage(a: string): void;
  getMessageCount(): number;
  setMessageCount(a: number): void;
  toObject(): EchoResponse.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => EchoResponse;
}

export namespace EchoResponse {
  export type AsObject = {
    Message: string;
    MessageCount: number;
  };
}

export class Empty {
  constructor();
  toObject(): Empty.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Empty;
}

export namespace Empty {
  export type AsObject = {};
}

export class ServerStreamingEchoRequest {
  constructor();
  getMessage(): string;
  setMessage(a: string): void;
  getMessageCount(): number;
  setMessageCount(a: number): void;
  getMessageInterval(): Duration;
  setMessageInterval(a: Duration): void;
  toObject(): ServerStreamingEchoRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ServerStreamingEchoRequest;
}

export namespace ServerStreamingEchoRequest {
  export type AsObject = {
    Message: string;
    MessageCount: number;
    MessageInterval: Duration;
  };
}

export class ServerStreamingEchoResponse {
  constructor();
  getMessage(): string;
  setMessage(a: string): void;
  toObject(): ServerStreamingEchoResponse.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ServerStreamingEchoResponse;
}

export namespace ServerStreamingEchoResponse {
  export type AsObject = {
    Message: string;
  };
}
