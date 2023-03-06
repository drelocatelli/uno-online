import fs from 'fs';
import type { IUser } from '../types/user';

export class UserRepository {
    static path = 'src/database/users.json';

    static add(user: IUser) : void {
        const fcontents = fs.readFileSync(this.path, 'utf-8');
        let data : IUser[] = JSON.parse(fcontents);
        data.push(user);
        fs.writeFileSync(this.path, JSON.stringify(data), 'utf-8');
    }

    static findAll() : IUser[] {
        const fcontents = fs.readFileSync(this.path, 'utf-8');
        return JSON.parse(fcontents);
    }

    static reset() : void {
        fs.writeFileSync(this.path, '[]', 'utf-8');
        console.log('all users data clean');
    }

    static count() : number {
        return this.findAll().length;
    }

    static findById(id: string) : (IRepositoryFind<IUser> | void) {
        const users = JSON.parse(fs.readFileSync(this.path, 'utf-8')) as IUser[];
        const index =  users.findIndex(u => u.id == id);

        if(index >= 0) {
            return {
                remove: () => {
                    const newUsers = (index == 0) ? JSON.parse('[]') : users.splice(index, 1);
                    fs.writeFileSync(this.path, JSON.stringify(newUsers), 'utf-8');
                },
                get: () => users[index]
            }
        }
    } 

    static findByUserName(username: string) : (IRepositoryFind<IUser> | void) {
        const users = JSON.parse(fs.readFileSync(this.path, 'utf-8')) as IUser[];
        const index =  users.findIndex(u => u.username == username);

        if(index >= 0) {
            return {
                remove: () => {
                    const newUsers = users.splice(index, 1);
                    fs.writeFileSync(this.path, JSON.stringify(newUsers), 'utf-8');
                },
                get: () => users[index]
            }
        }
    } 

}

interface IRepositoryFind<T> {
    remove: () => void;
    get: () => T;
}