import 'reflect-metadata';
import { SocketControllers } from 'socket-controllers';
import Container from 'typedi';
import { CardsController } from './controllers/CardsController';
import { MainController } from './controllers/mainController';
import { UserController } from './controllers/UsersController';
import {Server} from 'socket.io';
import http from 'http';
import express from 'express';
import 'dotenv/config';

const app = express();
const server = http.createServer(app);

const port = process.env.API_PORT ? parseInt(process.env.API_PORT) : 3000;
const client = process.env.CLIENT_URL ?? 'http://localhost:5000';

const io = new Server(server, {
    cors: {
        origin: client,
    }
});

new SocketControllers({
    io,
    port: port,
    container: Container,
    controllers: [MainController, UserController, CardsController]
});

server.listen(port, () => {
    console.log('Server listening');
});