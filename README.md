# Test results

## Client to express

- Client recieves messages as buffer
- Express server not available:

  ```bash
    Error: getaddrinfo ENOTFOUND express
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:107:26) {
      errno: -3007,
      code: 'ENOTFOUND',
      syscall: 'getaddrinfo',
      hostname: 'express'
    }
  ```

- Express server disconnects during connection:

  ```bash
    closed 1006 <Buffer > # Buffer is empty
  ```

- Express server cut while container running:

  ```bash
    closed 1006
  ```

- Express server not running but container running:

  ```bash
    Error: connect ECONNREFUSED 172.30.0.4:3001
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1555:16) {
      errno: -111,
      code: 'ECONNREFUSED',
      syscall: 'connect',
      address: '172.30.0.4',
      port: 3001
    }
    closed 1006
  ```

## Application to express

- Application recieves messages as event (`event.data`)
- Express server not available:
  - Websocket error triggered:

  ```bash
    WebSocket connection to 'ws://express:3001/' failed: Error in connection establishment: net::ERR_NAME_NOT_RESOLVED
  ```

  - Close event triggered:

  ```typescript
    event.code = 1006;
    event.reason = "";
  ```

- Express server disconnects during connection:

  - Triggers CloseEvent (has reason and code)

  ```typescript
  event.code = 1006;
  event.reason = "";
  ```

- Express server cut while container running:

  - Error sending message: `webSocket is already in CLOSING or CLOSED state.`

  ```typescript
  event.code = 1006;
  event.reason = "";
  ```

- Express server not running but container running:

  - Error event emitted
  - Close event emitted

  ```bash
    Error event:
    webSocket connection to 'ws://express:3001/' failed: Error in connection establishment: net::ERR_CONNECTION_REFUSED
  ```

  ```typescript
  event.code = 1006;
  event.reason = "";
  ```

## Rxjs websocket to express

- Application recieves messages as is, not type MessageEvent. If a string is sent a string is received on WebsocketSubject
- Express server not available:

  - Triggers stream error event, message is type `Event` with `event.type = error`:
  - Websocket error triggered:

  ```bash
    WebSocket connection to 'ws://express:3001/' failed: Error in connection establishment: net::ERR_NAME_NOT_RESOLVED
  ```

  - Close event triggered

    ```typescript
      event.code = 1006;
      event.reason = "";
    ```

- Express server disconnects during connection:

  - Triggers stream error event, Event emitted is CloseEvent:
  - Triggers close event

  ```typescript
    event.code = 1006;
    event.reason = "";
  ```

- Express server cut while container running:

  - Close triggered

  ```typescript
  event.code = 1006;
  event.reason = "";
  ```

  - stream error or type CloseEvent event emitted

- Express server not running but container running:

  - stream error event emitted
  - Close event emitted

  ```bash
    Error event:
    webSocket connection to 'ws://express:3001/' failed: Error in connection establishment: net::ERR_CONNECTION_REFUSED
  ```

  ```typescript
  event.code = 1006;
  event.reason = "";
  ```
