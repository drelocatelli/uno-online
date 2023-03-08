import fs from 'fs';
import type { ICard } from '../types/card';

export class CardRepository {
    static path = 'src/database/card.json';

    static get() : ICard {
        return JSON.parse(fs.readFileSync(this.path, 'utf-8'));
    }

    static store(card: ICard) : IStore {
        return {
            onEmpty: () => {
                if(Object.keys(this.get()).length === 0) {
                    fs.writeFileSync(this.path, JSON.stringify(card));
                }
            },
            replace: () => {
                fs.writeFileSync(this.path, JSON.stringify(card));
            }
        };
    }
 
    static reset() {
        fs.writeFileSync(this.path, '{}', 'utf-8');
        console.log('all card data clean');
    }
    
}

interface IStore {
    onEmpty: () => void,
    replace: () => void
}