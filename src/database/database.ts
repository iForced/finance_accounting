import Dexie from "dexie";
import {now} from "../store/inputsReducer";

export interface ITransaction {
    id: string
    type: 'income' | 'outcome'
    value: number
    addDate: string
}

class MoneysDB extends Dexie {
    transactions!: Dexie.Table<ITransaction, string>;

    constructor() {
        super('MoneyManager')
        this.version(1).stores({
            transactions: 'id, type, value, addDate'
        })
    }
    getData() {
        return this.transactions.where('addDate').equals(now).toArray()
    }
}

export const db = new MoneysDB()

