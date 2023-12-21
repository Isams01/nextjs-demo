'use client';

import { useEffect } from "react";
import {WebSocketSubject, webSocket} from 'rxjs/webSocket';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const sendHelloTimes = async (times: number, wsClient: WebSocketSubject<string>) => {
  const keysArr = new Array(times).fill(1).map((_, i) => i);
  for (const time of keysArr) {
    console.log('sending hello');
    wsClient.next(`Hello ${time}`);
    await sleep(2000)
  }
  wsClient.complete();
}

let started = false;

export default function WebsocketPage() {
  useEffect(() => {
    if (!started) {
      started = true;
      console.log('connecting to websocket ws://express:3001');
      const socket$ = webSocket<string>({
        url: 'ws://express:3001',
        openObserver: {
          next: (ev) => {
            console.log('open observer next', ev)
            sendHelloTimes(50, socket$);
          },
          error: (err) => {
            console.error('open error', err);
          },
        },
        closeObserver: {
          next: (ev) => {
            console.log('close observer next', ev)
          },
          error: (err) => {
            console.error('close error', err);
          },
        },
      });

      socket$.subscribe({
        next: (ev) => {
          console.log(typeof (ev));
          console.log(ev);
        },
        error: (err) => {
          console.error('socket$ error', err);
        },
        complete: (...args) => {
          console.log('socket$ complete', args);
        },
      });
    }
  }, []);

  return (
    <h1>Websocket</h1>
  )
}