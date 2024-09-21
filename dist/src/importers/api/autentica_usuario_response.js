export class AutenticaUsuarioResponse {
    constructor(token, usuario) {
        this.token = token;
        this.usuario = usuario;
    }
}
class Usuario {
    constructor(id, nome, matricula, email, vinculo) {
        this.id = id;
        this.nome = nome;
        this.matricula = matricula;
        this.email = email;
        this.vinculo = vinculo;
    }
}
