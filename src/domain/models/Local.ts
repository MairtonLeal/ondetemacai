import { Timestamp } from "firebase/firestore";

// Definindo as propriedades da Interface
export interface ILocalProps {
  id?: string;
  nome: string;
  endereco: string;
  bairro: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Model que impomos as regras necessárias e comportamentos
export class Local {
  public id?: string
  public nome: string;
  public endereco: string;
  public bairro: string;
  public createdAt: Timestamp;
  public updatedAt: Timestamp;

  // Encapsulamento = atribui os valores as propriedades estabelecidas e validas
  constructor(props: ILocalProps) {
    this.validate(props);
    this.id = props.id;
    this.nome = props.nome;
    this.endereco = props.endereco;
    this.bairro = props.bairro;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
 // Regra de negocio de definicao para campos
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

 // Comportamento de transformar para o firestore espera enviando dos campos
  public toFirestore() {
    return {
      nome: this.nome,
      endereco: this.endereco,
      bairro: this.bairro,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Transforma os dados brutos do banco que está recebendo em um objeto
  public static fromFirestore(id: string, data: any): Local {
    return new Local({
      id,
      nome: data.nome,
      endereco: data.endereco,
      bairro: data.bairro,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
