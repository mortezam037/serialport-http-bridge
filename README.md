# SerialPort HTTP Bridge

A lightweight Node.js bridge for reading data from a serial port and exposing the latest received value through a simple HTTP API.

The project is designed for applications that need to connect legacy or industrial serial devices to modern web applications through a simple REST endpoint.

## ✨ Features

* 🔌 Serial port communication using `serialport`
* ⚡ Real-time serial data reception
* 🌐 Lightweight Node.js HTTP server
* 🔗 REST endpoint for retrieving the latest received value
* 🌍 CORS support for frontend applications
* 🏭 Suitable for industrial and legacy devices
* 🪶 Minimal dependencies and simple architecture

## 🏗️ Architecture

```text
┌─────────────────────┐
│   Serial Device     │
│                     │
│   COM1 / RS-232     │
└──────────┬──────────┘
           │
           │ 9600 baud
           ▼
┌─────────────────────┐
│     Node.js         │
│                     │
│   SerialPort API    │
└──────────┬──────────┘
           │
           │ Latest Value
           ▼
┌─────────────────────┐
│    HTTP Server      │
│      :8081          │
└──────────┬──────────┘
           │
           │ GET /get_data
           ▼
┌─────────────────────┐
│   Web Application   │
│   / Client / API    │
└─────────────────────┘
```

## 🚀 How It Works

The application opens `COM1` using the following serial configuration:

```text
Port:       COM1
Baud Rate:  9600
Data Bits:  8
Stop Bits:  1
Parity:     None
```

Whenever data is received from the serial port, the application extracts the numeric value and stores it in memory.

The latest value can then be retrieved through:

```http
GET /get_data
```

Example response:

```json
{
  "response": "12345"
}
```

## 📦 Requirements

* Node.js
* npm
* A serial device connected to the computer
* Available serial port (default: `COM1`)

## 🔧 Installation

Clone the repository:

```bash
git clone https://github.com/mortezam037/SerialPort-Listening-Port.git
```

Enter the project directory:

```bash
cd SerialPort-Listening-Port
```

Install dependencies:

```bash
npm install
```

## ▶️ Running the Server

Start the application with:

```bash
node server.js
```

If everything is configured correctly, the server will start on:

```text
http://localhost:8081
```

You should see:

```text
Server running at http://localhost:8081/
```

## 🔌 Serial Port Configuration

The serial connection is currently configured directly inside `server.js`:

```javascript
const parser = new SerialPort({
  path: 'COM1',
  baudRate: 9600,
  dataBits: 8,
  stopBits: 1,
  parity: 'none'
});
```

To use another serial port, change:

```javascript
path: 'COM1'
```

For example:

```javascript
path: 'COM3'
```

or:

```javascript
path: '/dev/ttyUSB0'
```

for Linux systems.

## 🌐 API

### Get Latest Serial Data

```http
GET /get_data
```

Example:

```bash
curl http://localhost:8081/get_data
```

Response:

```json
{
  "response": "12345"
}
```

The endpoint always returns the latest value received from the serial device.

## 💻 Frontend Example

The API can be consumed from a browser application:

```javascript
fetch('http://localhost:8081/get_data')
  .then(response => response.json())
  .then(data => {
    console.log(data.response);
  });
```

Because CORS is enabled, the API can be accessed from a separate frontend application.

## 🔄 Data Flow

```text
Serial Device
     │
     ▼
 COM1
     │
     ▼
 Node.js SerialPort
     │
     ▼
 Extract Numeric Data
     │
     ▼
 Store Latest Value
     │
     ▼
 GET /get_data
     │
     ▼
 JSON Response
```

## 🏭 Use Cases

This type of bridge can be useful when integrating older serial-based equipment with modern applications.

Typical examples include:

* Industrial controllers
* Electronic scales
* Measurement devices
* Access-control systems
* POS and receipt systems
* Barcode and serial scanners
* Laboratory equipment
* Embedded devices
* RS-232/serial sensors
* Legacy hardware integrations

## ⚙️ Configuration

| Parameter    | Default     |
| ------------ | ----------- |
| Serial Port  | `COM1`      |
| Baud Rate    | `9600`      |
| Data Bits    | `8`         |
| Stop Bits    | `1`         |
| Parity       | `None`      |
| HTTP Host    | `localhost` |
| HTTP Port    | `8081`      |
| API Endpoint | `/get_data` |

## 📁 Project Structure

```text
SerialPort-Listening-Port/
│
├── server.js
└── README.md
```

## 🔐 Security Note

This project is intentionally lightweight and is primarily designed for local or trusted network environments.

Before exposing the HTTP server to an untrusted network, consider adding:

* Authentication
* Request validation
* Restricted CORS origins
* HTTPS
* Rate limiting
* Input/output validation
* Proper serial-port error handling

## 🛠️ Possible Improvements

Future versions could introduce:

* Environment-based configuration
* Configurable serial port
* Configurable baud rate
* Multiple serial ports
* WebSocket support
* Automatic reconnection
* Serial connection monitoring
* Structured logging
* Health-check endpoint
* Docker support
* Authentication
* TypeScript support
* Better error handling

## 📜 License

No license has currently been specified for this repository.

If you intend to make the project open source, consider adding an appropriate license.

## 👨‍💻 Author

**Morteza Moradzadeh**

GitHub:
https://github.com/mortezam037

---

⭐ If this project is useful to you, consider giving it a star.
