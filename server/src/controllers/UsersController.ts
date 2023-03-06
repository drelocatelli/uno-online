import { ConnectedSocket, MessageBody, OnDisconnect, OnMessage, SocketController } from "socket-controllers";
import type { Socket } from "socket.io";
import { Service } from "typedi";
import transmit from "../services/transmit";
import { Users } from "../services/users";

@SocketController()
@Service()
export class UserController {
    users : Users = new Users();
    
    @OnMessage('user:login')
    enter(@ConnectedSocket() socket: Socket, @MessageBody() message: any) {
        transmit(socket, 'user:logged', this.users.add({id: socket.id, username: message}));
    }

    @OnDisconnect()
    disconnect(@ConnectedSocket() socket: Socket) {
        transmit(socket, 'user:logout', this.users.remove({id: socket.id}));
    }
}