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
  // Nomeando a Collection e Nome da Collection para facilitar referência por variavel
  private collectionRef = collection(db, "acai");
  private collectionName = 'acai';

  // Metodo de Criação do Firebase
  async create(local: Local): Promise<string> {
    const docRef = await addDoc(this.collectionRef, local.toFirestore());
    return docRef.id;
  }

  //Busca Todos Locais com uma Query aplicada para ordenar por ultimo criado pelo campo createdAt
  async findAll(): Promise<Local[]> {
    const q = query(this.collectionRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnapshot) =>
      Local.fromFirestore(docSnapshot.id, docSnapshot.data())
    );
  }

  // Busca Especifica por Id do Local 
  async findById(id: string): Promise<Local | null> {
    const docRef = doc(db, "acai", id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      return null;
    }
    return Local.fromFirestore(snapshot.id, snapshot.data());
  }

  //Metodo para atualizar dados de um local
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

  //Metodo para Remover um local pelo id de referência
  async delete(id: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }
}
