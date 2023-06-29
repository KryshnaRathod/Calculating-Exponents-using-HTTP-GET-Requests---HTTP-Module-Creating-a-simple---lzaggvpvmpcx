const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const chunks = [];

    req.on('data', chunk => {
      const buf = Buffer.from(chunk);
      const str = buf.toString();
      chunks.push(str);
    });

    req.on('end', () => {
      try {
        const data = chunks.join('');
        const obj = JSON.parse(data);
        const num1 = obj.num1;
        const num2 = obj.num2;

        if (!Number.isInteger(num1) || num1 <= 0) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('The operation cannot be performed. "num1" must be a positive integer.');
        } else if (!Number.isInteger(num2) || num2 < 0) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Invalid input. "num2" must be a non-negative integer.');
        } else {
          const result = Math.pow(num1, num2);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end(`The result is ${result}`);
        }
      } catch (error) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Invalid payload. Expected a valid JSON.');
      }
    });
  }
});

module.exports = server;

      
