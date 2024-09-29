import http from 'http';
import { Server } from "socket.io";

const server = http.createServer();
const io = new Server(server);

io.on('connection', client => {
  client.on('event', data => {
    const type = data.type;
    
  });
  client.on('disconnect', () => { /* … */ });
});
server.listen(3000);