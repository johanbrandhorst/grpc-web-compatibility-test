export class ClientStreamingEchoRequest {
  constructor ();
  getMessage(): string;
  setMessage(a: string): void;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ClientStreamingEchoRequest;
}

export class ClientStreamingEchoResponse {
  constructor ();
  getMessageCount(): number;
  setMessageCount(a: number): void;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ClientStreamingEchoResponse;
}

export class EchoRequest {
  constructor ();
  getMessage(): string;
  setMessage(a: string): void;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => EchoRequest;
}

export class EchoResponse {
  constructor ();
  getMessage(): string;
  setMessage(a: string): void;
  getMessageCount(): number;
  setMessageCount(a: number): void;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => EchoResponse;
}

export class Empty {
  constructor ();
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Empty;
}

export class ServerStreamingEchoRequest {
  constructor ();
  getMessage(): string;
  setMessage(a: string): void;
  getMessageCount(): number;
  setMessageCount(a: number): void;
  getMessageInterval(): number;
  setMessageInterval(a: number): void;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ServerStreamingEchoRequest;
}

export class ServerStreamingEchoResponse {
  constructor ();
  getMessage(): string;
  setMessage(a: string): void;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ServerStreamingEchoResponse;
}

