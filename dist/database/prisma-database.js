"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaDatabase = void 0;
// src/database/PrismaDatabase.tsimport { PrismaClient } from'@prisma/client'
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
const prisma = new client_1.PrismaClient();
class PrismaDatabase {
    salvaDisciplinas(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const disciplinas = yield prisma.disciplina.createMany({ data });
                return disciplinas.count;
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientInitializationError) {
                    console.error('Erro ao inicializar o Prisma Client:', error.message);
                }
                else {
                    console.error('Erro desconhecido ao salvar disciplinas:', error);
                }
                throw error;
            }
        });
    }
    buscaPorUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findMany();
        });
    }
    adicionaTokenDeAutenticacao(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.user.update({
                where: {
                    id,
                },
                data: {
                    token
                }
            });
        });
    }
    buscaUsuarioPorEmail(email) {
        throw new Error('Method not implemented.');
    }
    atualizaAluno(id, data) {
        throw new Error('Method not implemented.');
    }
    deletaAluno(id) {
        throw new Error('Method not implemented.');
    }
    buscaAlunoPorId(id) {
        throw new Error('Method not implemented.');
    }
    buscaAlunoPorMatricula(matricula) {
        throw new Error('Method not implemented.');
    }
    buscaAlunoPorEmail(email) {
        throw new Error('Method not implemented.');
    }
    criaAluno(data) {
        const aluno = prisma.aluno.create({
            data: {
                nome: data.nome,
                matricula: data.matricula,
                codigo_do_setor: data.codigo_do_setor,
                nome_do_campus: data.nome_do_campus,
                nome_do_curso: data.nome_do_curso,
                nome_do_setor: data.nome_do_setor,
                turno_do_curso: data.turno_do_curso,
                user: {
                    connect: {
                        id: data.userId,
                    }
                },
                password: data.password,
            },
        });
        return aluno;
    }
    criaUsuario(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.user.create({ data: {
                    nome: data.nome,
                    role: data.role,
                } });
        });
    }
    buscaUsuarioPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.user.findUnique({ where: { id } });
        });
    }
    atualizaUsuario(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.user.update({ where: { id }, data });
        });
    }
    deletaUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.user.delete({ where: { id } });
        });
    }
    autenticaUsuario(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    validaToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
}
exports.PrismaDatabase = PrismaDatabase;
