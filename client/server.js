require('dotenv').config();
const handler = require('serve-handler');
const http = require('http');

const server = http.createServer((request, response) => {
    return handler(request, response, {
        public: 'public',
    });
});

server.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Running at http://localhost:${process.env.PORT}`);
});
