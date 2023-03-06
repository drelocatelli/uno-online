import type { IEmit } from "../types/emit";
import type { IUser } from "../types/user";

export let users : IUser[] = [];

export class Users {
    remove({username} : IUser) : (IEmit | void) {
        const find = users.find(u => u.username !== username);
        if(find) {
            users = users.filter(u => u.username !== username);
            return {message: `Usuário removido: ${username}`, isError: false};
        } else {
            return {message: 'Usuário não encontrado', isError: true};
        }
    }

    add(user : IUser) : (IEmit | void) {
        const find = users.find(u => u.username == user.username); 
        if(typeof find == 'undefined') {
            users.push(user);
            return {message: `Usuário entrou: ${user.username}`, isError: false};
        } else {
            return {message: 'Usuário com esse nome já existe', isError: true};
        }

    }

}