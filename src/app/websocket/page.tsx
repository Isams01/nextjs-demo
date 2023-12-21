'use client';

import { useEffect } from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const sendHelloTimes = async (times: number, wsClient: WebSocket) => {
  const keysArr = new Array(times).fill(1).map((_, i) => i);
  for (const time of keysArr) {
    console.log('sending hello');
    wsClient.send(`Hello ${time}`);
    await sleep(2000)
  }
  wsClient.close();
}

let started = false;

export default function WebsocketPage() {
  useEffect(() => {
    if (!started) {
      started = true;
      console.log('connecting to websocket ws://express:3001');
      const ws = new WebSocket('ws://express:3001');
      ws.onopen = () => {
        console.log('connected');
        sendHelloTimes(40, ws);
      };
      ws.onmessage = evt => {
        console.log(typeof (evt.data));
        console.log(evt.data);
      };
      ws.onclose = (event) => {
        console.log('disconnected', event);
      };
      ws.onerror = err => {
        console.error(
          'Socket encountered error: ',
          err
        );
        ws.close();
      };    
    }
  }, []);

  return (
    <h1>Websocket</h1>
  )
}