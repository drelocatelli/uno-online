import { ConnectedSocket, MessageBody, OnMessage, SocketController } from "socket-controllers";
import type { Socket } from "socket.io";
import { Service } from "typedi";
import transmit from "../services/transmit";
import { Users } from "../services/users";

@SocketController()
@Service()
export class UserController {
    players : Users = new Users();
    
    @OnMessage('user:login')
    enter(@ConnectedSocket() socket: Socket, @MessageBody() message: any) {
        transmit(socket, 'user:logged', this.players.add({socketId: socket.id, username: message}));
    }
}