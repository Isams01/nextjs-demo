const axios = require('axios');
const ws = require('ws');

const wsClient = new ws('ws://express:3001');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendHelloTimes = async (times) => {
  for (const time of Array(times).keys()) {
    console.log('sending hello');
    wsClient.send(`Hello ${time}`);
    await sleep(2000)
  }
  wsClient.close();
}

wsClient.on('open', () => {
  console.log('opened');
  sendHelloTimes(10);
});

wsClient.on('message', (message) => {
  console.log('message', message.toString());
});

wsClient.on('close', (code, reason) => {
  console.log('closed', code, reason.toString());
});

wsClient.on('error', (error) => {
  console.log(error);
});
