import { ConnectedSocket, EmitOnFail, EmitOnSuccess, MessageBody, OnMessage, SkipEmitOnEmptyResult, SocketController } from "socket-controllers";
import type { Socket } from "socket.io";
import { Service } from "typedi";
import { CardRepository } from "../repository/card";
import { UserRepository } from "../repository/user";
import type { ICard } from "../types/card";

@SocketController()
@Service()
export class CardsController {

    @OnMessage('card:global')
    @EmitOnSuccess('card:global')
    global(@ConnectedSocket() socket: Socket, @MessageBody() card: ICard) {
        CardRepository.store(card).onEmpty();
        return CardRepository.get();
    }

    @OnMessage('card:user-count')
    @EmitOnSuccess('card:user-count')
    shareUserCardCount(@ConnectedSocket() socket: Socket, @MessageBody() quantity: number) {
        const findUser = UserRepository.findById(socket.id)?.get();
        socket.emit('users:all');
        return findUser?.cards;
    }

}