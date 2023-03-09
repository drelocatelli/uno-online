import { ConnectedSocket, EmitOnSuccess, MessageBody, OnMessage, SocketController } from "socket-controllers";
import type { Socket } from "socket.io";
import { Service } from "typedi";
import { CardRepository } from "../repository/card";
import type { ICard } from "../types/card";

@SocketController()
@Service()
export class CardsController {

    @OnMessage('card:global')
    @EmitOnSuccess('card:global')
    global(@ConnectedSocket() socket: Socket, @MessageBody() card: ICard, callback: any) {
        CardRepository.store(card).onEmpty();
        return CardRepository.get();
    }

    @OnMessage('card:user-count')
    shareUserCardCount(@ConnectedSocket() socket: Socket, @MessageBody() quantity: number, callback: any) {
        console.log(quantity)
    }

}