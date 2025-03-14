import { Worker } from "./worker.model";

export interface Earning{
    totalAmount:number;
    createdAt:Date;
    workerId: string;
    worker?:Worker
}