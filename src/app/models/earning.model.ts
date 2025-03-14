import { DocumentData, DocumentReference } from "firebase/firestore";
import { Worker } from "./worker.model";

export interface Earning{
    totalAmount:string;
    creationDate:any;
    workerId: string;
    workerRef:DocumentReference<DocumentData>;
    worker?:Worker
}