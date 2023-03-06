import { UserRepository } from "../repository/user";
import type { IEmit } from "../types/emit";
import type { IUser } from "../types/user";

export class Users {
    remove({id} : {id: string}) : (IEmit | void) {
        const find = UserRepository.findById(id)?.get();
        if(find != undefined) {
            UserRepository.findById(find.id)?.remove();
            return {message: `Usuário removido: ${find.id} - ${find.username}`, isError: false};
        }
    }

    add(user : IUser) : (IEmit | void) {
        if(UserRepository.findById(user.id)?.get() != undefined) {
            return {message: 'Você não pode utilizar duas contas', isError: true};
        }
        
        if(UserRepository.findByUserName(user.username)?.get() == undefined) {
            UserRepository.add(user)
            return {message: `Usuário entrou: ${user.username}`, isError: false};
        } else {
            return {message: 'Usuário com esse nome já existe', isError: true};
        }
    }

}