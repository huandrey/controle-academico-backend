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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const user_route_1 = require("./routes/user-route");
const disciplina_route_1 = require("./routes/disciplina-route");
const discente_route_1 = require("./routes/discente-route");
const auth_route_1 = require("./routes/auth-route");
const sistema_route_1 = require("./routes/sistema-route");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)({ origin: true }));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
function main() {
    return __awaiter(this, void 0, void 0, function* () { });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
app.use('/api/auth', auth_route_1.authRoutes);
app.use('/api/users', user_route_1.userRoutes);
app.use('/api/discentes', discente_route_1.discenteRoutes);
app.use('/api/disciplinas', disciplina_route_1.disciplinaRoutes);
app.use('/api', sistema_route_1.sistemaRoutes);
app.get('/', (req, res) => {
    res.send('Bem-vindo a API do Controle Acadêmico!');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});
