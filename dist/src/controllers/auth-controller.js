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
exports.AuthController = void 0;
const ReportarErroAoSistema_1 = require("../exceptions/ReportarErroAoSistema");
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    gerarToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, role } = req.body;
            try {
                const token = yield this.authService.lidaComGeracaoDoToken({ id, role });
                return res.status(201).json({
                    message: "Token gerado com sucesso.",
                    data: token
                });
            }
            catch (error) {
                if (error instanceof ReportarErroAoSistema_1.ReportarErrorAoSistema) {
                    return res.status(400).json({
                        error: error.message,
                        details: process.env.NODE_ENV === 'development' ? error.stack : ""
                    });
                }
                else {
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    }
}
exports.AuthController = AuthController;
