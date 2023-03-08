import { ConnectedSocket, MessageBody, OnMessage, SocketController } from "socket-controllers";
import type { Socket } from "socket.io";
import { Service } from "typedi";
import { CardRepository } from "../repository/card";
import transmit from "../services/transmit";
import type { ICard } from "../types/card";

@SocketController()
@Service()
export class CardsController {

    @OnMessage('card:global')
    global(@ConnectedSocket() socket: Socket, @MessageBody() card: ICard) {
        console.log('card', card)
        CardRepository.store(card);
        transmit(socket, 'card:global', CardRepository.get());
    }

}