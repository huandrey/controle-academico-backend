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
exports.UserController = void 0;
const ReportarErroAoSistema_1 = require("../exceptions/ReportarErroAoSistema");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    criaUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, role } = req.body;
                const user = yield this.userService.lidaComCriacaoDoUsuario({ nome, role });
                res.status(201).json(user);
            }
            catch (error) {
                if (error instanceof ReportarErroAoSistema_1.ReportarErrorAoSistema) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    }
    atualizaUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10);
                const updates = req.body;
                const updatedUser = yield this.userService.lidaComAtualizacaoDoUsuario(userId, updates);
                if (updatedUser) {
                    res.status(200).json(updatedUser);
                }
                else {
                    res.status(404).json({ error: 'User not found' });
                }
            }
            catch (error) {
                if (error instanceof ReportarErroAoSistema_1.ReportarErrorAoSistema) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    }
    deletaUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10);
                yield this.userService.lidaComRemocaoDoUsuario(userId);
                res.status(204).send(); // No Content
            }
            catch (error) {
                if (error instanceof ReportarErroAoSistema_1.ReportarErrorAoSistema) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    }
    buscaUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10);
                const usuarioEncontrado = yield this.userService.lidaComBuscaDoUsuarioPorId(userId);
                if (!usuarioEncontrado) {
                    res.status(200).json({
                        message: 'Usuário não encontrado',
                        data: []
                    });
                }
                res.status(200).json(usuarioEncontrado);
            }
            catch (error) {
                if (error instanceof ReportarErroAoSistema_1.ReportarErrorAoSistema) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    }
    buscaUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuariosEncontrados = yield this.userService.lidaComBuscaDosUsuarios();
                res.status(200).json({
                    message: "Usuários encontrados",
                    data: usuariosEncontrados
                });
            }
            catch (error) {
                if (error instanceof ReportarErroAoSistema_1.ReportarErrorAoSistema) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    }
}
exports.UserController = UserController;
