import { ConnectedSocket, MessageBody, OnConnect, OnDisconnect, OnMessage, SocketController } from "socket-controllers";
import type { Socket } from "socket.io";
import { Service } from "typedi";
import { CardRepository } from "../repository/card";
import { UserRepository } from "../repository/user";

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

    @OnMessage('data:reset') 
    reset(@ConnectedSocket() socket: Socket, @MessageBody() message: any) {
        if(process.env.PASSWORD === message) {
            UserRepository.reset();
            CardRepository.reset();
            socket.emit('data:reset', 'Dados limpos!');
        } else {
            socket.emit('data:resetError', 'Acesso negado!');
        }
    }
    
}