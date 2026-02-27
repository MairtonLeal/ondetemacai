import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Local } from "../models/Local";
import type { ILocalRepository } from "./ILocalRepository";
import { db } from "../../core/firebase/firebaseConfig";


export class LocalRepositoryFirestore implements ILocalRepository {
  private collectionRef = collection(db, "acai");
  private collectionName = 'acai';

  async create(local: Local): Promise<string> {
    const docRef = await addDoc(this.collectionRef, local.toFirestore());
    return docRef.id;
  }

  async findAll(): Promise<Local[]> {
    const q = query(this.collectionRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnapshot) =>
      Local.fromFirestore(docSnapshot.id, docSnapshot.data())
    );
  }

  async findById(id: string): Promise<Local | null> {
    const docRef = doc(db, "acai", id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      return null;
    }
    return Local.fromFirestore(snapshot.id, snapshot.data());
  }


  async update(local: Local): Promise<void> {
    if (!local.id) throw new Error("Local precisa de ID para ser atualizado.");
    const docRef = doc(db, this.collectionName, local.id);
    await updateDoc(docRef, {
      nome: local.nome,
      bairro: local.bairro,
      endereco: local.endereco,
      updatedAt: local.updatedAt,
    });
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }
}
