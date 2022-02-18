const http = require('http');

function rqListener() {

}

const server= http.createServer((req, res) => {

});

server.listen(8080,'127.0.0.1',()=>{
    console.log('We are listening to requests on port 8080');
});