import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, addDoc,collection,doc,getDoc,getDocs  } from '@angular/fire/firestore';
import { Earning } from '../models/earning.model';

@Injectable({
  providedIn: 'root'
})
export class EarningService {

  constructor(private firestore:Firestore) { }

  private earningsCollection = collection(this.firestore, 'earnings');

  fetchDocumentReferenceData = async(docRef:DocumentReference<DocumentData>):Promise<any>=>{
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id:docSnap.id,...docSnap.data() } : null;
  }

  resolveDocumentReferences = async (earnings: Earning[]): Promise<Earning[]> => {
      const resolvedEarnings = await Promise.all(earnings.map(async (earning) => {
          const resolvedEarning = { ...earning };
          if (earning.workerRef) {
              const workerData = await this.fetchDocumentReferenceData(earning.workerRef);
              resolvedEarning.worker = workerData;
          }
          return resolvedEarning;
      }));
      return resolvedEarnings;
  };
  
  async addEarning(earning:Earning){
    earning.workerRef = doc(this.firestore,'workers',earning.workerId);
    const docRef = await addDoc(this.earningsCollection, earning);
    return {
      id:docRef.id,
      ...earning
    }
  }

  async getEarnings(): Promise<Earning[]> {
    try {
      const snapshot = await getDocs(this.earningsCollection);
      const earnings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as unknown as  Earning[];
      
      const resolvedEarnings = await this.resolveDocumentReferences(earnings);
      return resolvedEarnings;
    } catch (error) {
      console.error("Error fetching earnings:", error);
      return [];
    }
  }

}
