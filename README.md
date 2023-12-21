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

## Chrome setup

- install XQuartz
- Enable X11 forwarding, XQuartz -> Preferences -> Security, and check the option "Allow connections from network clients".
- Allow Docker to connect to the X server, `xhost + <your-ip>`
- Set display environment variable `export DISPLAY=<your-ip>:0`

## Application to express

- Application recieves messages as string (`event.data`)
- Express server not available:

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
