import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs} from '@angular/fire/firestore';
import { Worker } from '../models/worker.model';


@Injectable({
  providedIn: 'root'
})
export class WorkerService {


  constructor(private firestore:Firestore) { }

  private workersCollection = collection(this.firestore,'workers');

  async addWorker(worker:Worker){
    const docRef = await addDoc(this.workersCollection,worker);
    return {
      id:docRef.id,
      ...worker
    }
  }

 async getWorkers(): Promise<any[]> {
    const snapshot = await getDocs(this.workersCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id, 
      ...doc.data(),
    }));
  }  
}
