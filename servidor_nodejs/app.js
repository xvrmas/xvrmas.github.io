// 1. Importem el mòdul 'http'
const http = require('http');

// 2. Definim la localització del servidor
const hostname = '127.0.0.1'; // localhost
const port = 3000;

// 3. Creem el servidor
const server = http.createServer((req, res) => {
  // Responem amb un codi 200 (Èxit) i el tipus de contingut
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  
  // Enviem el missatge final
  res.end('Hola! Aquest és el meu primer servidor amb Node.js 🚀');
});

// 4. Posem el servidor a "escoltar" peticions
server.listen(port, hostname, () => {
  console.log(`El servidor s'està executant a http://${hostname}:${port}/`);
});
