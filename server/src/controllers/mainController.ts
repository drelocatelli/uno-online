import { ConnectedSocket, MessageBody, OnConnect, OnDisconnect, OnMessage, SocketController } from "socket-controllers";
import type { Socket } from "socket.io";
import { Service } from "typedi";

@SocketController()
@Service()
export class MainController {
    @OnConnect()
    connection(@ConnectedSocket() socket: Socket) {
        console.log('user connected, socket id:', socket.id);
    }

    @OnDisconnect()
    disconnect(@ConnectedSocket() socket: Socket) {
        console.log('client disconected');
    }

    @OnMessage('test')
    hello(@ConnectedSocket() socket: Socket, @MessageBody() message: any) {
        console.log('Hello,', socket.id, message);
    }
}