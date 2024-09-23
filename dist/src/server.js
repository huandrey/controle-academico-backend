var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import path from 'path';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { userRoutes } from './routes/user-route';
import { disciplinaRoutes } from './routes/disciplina-route';
import { discenteRoutes } from './routes/discente-route';
import { authRoutes } from './routes/auth-route';
import { sistemaRoutes } from './routes/sistema-route';
const prisma = new PrismaClient();
const app = express();
const port = 3000;
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
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
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/discentes', discenteRoutes);
app.use('/api/disciplinas', disciplinaRoutes);
app.use('/api', sistemaRoutes);
app.get('/', (req, res) => {
    res.send('Bem-vindo a API do Controle Acadêmico!');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});
