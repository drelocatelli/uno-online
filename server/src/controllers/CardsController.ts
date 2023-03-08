import { ConnectedSocket, EmitOnSuccess, MessageBody, OnMessage, SocketController } from "socket-controllers";
import type { Socket } from "socket.io";
import { Service } from "typedi";
import { CardRepository } from "../repository/card";
import transmit from "../services/transmit";
import type { ICard } from "../types/card";

@SocketController()
@Service()
export class CardsController {

    @OnMessage('card:global')
    @EmitOnSuccess('card:saved')
    global(@ConnectedSocket() socket: Socket, @MessageBody() card: ICard, callback: any) {
        console.log('card:global', card)
        CardRepository.store(card);
        return 'opa';
        // socket.emit('card:global', CardRepository.get());
        // transmit(socket, 'card:global', CardRepository.get());
    }

}