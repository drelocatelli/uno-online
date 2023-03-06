import 'reflect-metadata';
import { SocketControllers } from 'socket-controllers';
import Container from 'typedi';
import { MainController } from './controllers/mainController';
import { UserController } from './controllers/UsersController';

new SocketControllers({
    port: 3000,
    container: Container,
    controllers: [MainController, UserController]
});