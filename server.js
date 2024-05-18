const express = require('express');
const server = express();
const path = require('path');

server.use('/public', express.static(path.join(__dirname, 'public')));

server.get('/', function (req, res) {
    res.sendfile('index.html');
});

server.listen(9000);
console.log('Server running on http://localhost:9000');