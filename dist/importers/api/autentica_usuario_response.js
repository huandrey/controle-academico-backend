"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticaUsuarioResponse = void 0;
class AutenticaUsuarioResponse {
    constructor(token, usuario) {
        this.token = token;
        this.usuario = usuario;
    }
}
exports.AutenticaUsuarioResponse = AutenticaUsuarioResponse;
class Usuario {
    constructor(id, nome, matricula, email, vinculo) {
        this.id = id;
        this.nome = nome;
        this.matricula = matricula;
        this.email = email;
        this.vinculo = vinculo;
    }
}
