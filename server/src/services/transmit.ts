import type { Socket } from "socket.io";

export default function transmit(socket: Socket, key: string, value: any) {
    socket.broadcast.emit(key, value);
    socket.emit(key, value);
}