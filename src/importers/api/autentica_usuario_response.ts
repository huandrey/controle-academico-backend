export class AutenticaUsuarioResponse {
  public token: string;
  public usuario: Usuario;

  constructor(token: string, usuario: Usuario) {
    this.token = token;
    this.usuario = usuario;
  }
}

class Usuario {
  public id: number;
  public nome: string;
  public matricula: string;
  public email: string;
  public vinculo: string;

  constructor(id: number, nome: string, matricula: string, email: string, vinculo: string) {
    this.id = id;
    this.nome = nome;
    this.matricula = matricula;
    this.email = email;
    this.vinculo = vinculo;
  }
}
