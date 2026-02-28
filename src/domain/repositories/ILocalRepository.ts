import { Local } from "../models/Local";

//Protocolos ou Contrato com responsabilidade do que pode ser executado ou feito.
export interface ILocalRepository {
  create(local: Local): Promise<string>;
  findAll(): Promise<Local[]>;
  findById(id: string): Promise<Local | null>;
  update(local: Local): Promise<void>;
  delete(id: string): Promise<void>;
}