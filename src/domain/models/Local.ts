import { Timestamp } from "firebase/firestore";

export interface ILocalProps {
  id?: string;
  nome: string;
  endereco: string;
  bairro: string;
  // licenciado: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export class Local {
  public id?: string
  public nome: string;
  public endereco: string;
  public bairro: string;
  // public licenciado: boolean;
  public createdAt: Timestamp;
  public updatedAt: Timestamp;

  constructor(props: ILocalProps) {
    this.validate(props);

    this.id = props.id;
    this.nome = props.nome;
    this.endereco = props.endereco;
    this.bairro = props.bairro;
    // this.licenciado = props.licenciado;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  private validate(props: ILocalProps) {
    if (!props.nome || props.nome.trim().length < 3) {
      throw new Error("Nome deve ter pelo menos 3 caracteres.");
    }

    if (!props.endereco) {
      throw new Error("Endereço é obrigatório.");
    }

    if (!props.bairro) {
      throw new Error("Bairro é obrigatório.");
    }
  }

  public toFirestore() {
    return {
      nome: this.nome,
      endereco: this.endereco,
      bairro: this.bairro,
      // licenciado: this.licenciado,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public static fromFirestore(id: string, data: any): Local {
    return new Local({
      id,
      nome: data.nome,
      endereco: data.endereco,
      bairro: data.bairro,
      // licenciado: data.licenciado,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
