const { SerialPort } = require('serialport')
const http = require('http');
let express = require('express')
let app = express();
const server = http.createServer(app);
const parser = new SerialPort({ path: 'COM1', baudRate: 9600, dataBits: 8, stopBits: 1, parity: 'none'})

const hostname = 'localhost';
var port = 8081;
var w = 0;

parser.on('data', function(data) {
  let dataString = data.toString().match(/(\d+)/);
  let response = dataString[0];
  w=response;
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
    next();
});

app.get('/get_data', function(req, res) {
    res.json({ response: w});
});
