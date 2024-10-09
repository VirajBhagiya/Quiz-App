import http from 'http';

import { Server } from "socket.io";
const server = http.createServer();


export class IoManager {
    private static io: Server;

    public static getIo() {
        if (!this.io) {
            const io = new Server(server, {
                cors: {
                    origin: "https://quiz-app-lime-five.vercel.app/",
                    methods: ["GET", "POST"]
                }
            });
            this.io = io;
        }
        return this.io;
    }

}