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
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const aluno_service_1 = require("../../src/services/aluno-service");
const ReportarErroAoSistema_1 = require("../../src/exceptions/ReportarErroAoSistema");
describe('AlunoService', () => {
    let alunoRepositoryStub;
    let alunoService;
    beforeEach(() => {
        alunoRepositoryStub = {
            criaAluno: sinon_1.default.stub(),
            buscaAlunoPorId: sinon_1.default.stub(),
            buscaAlunoPorMatricula: sinon_1.default.stub(),
            atualizaAluno: sinon_1.default.stub(),
            buscaAlunoPorEmail: sinon_1.default.stub(),
            deletaAluno: sinon_1.default.stub(),
        };
        alunoService = new aluno_service_1.AlunoService(alunoRepositoryStub);
    });
    describe('lidaComCriacaoDoAluno', () => {
        it('deve criar um aluno com dados válidos', () => __awaiter(void 0, void 0, void 0, function* () {
            const alunoValido = {
                nome: 'João Silva',
                matricula: '2022100123',
                userId: 1,
                codigo_do_setor: 101,
                nome_do_campus: 'Universidade Federal de Campina Grande',
                nome_do_curso: 'Ciência da Computação',
                nome_do_setor: 'Departamento de Computação',
                turno_do_curso: 'Integral',
                password: 'senhaSegura123'
            };
            const alunoCriadoMock = Object.assign(Object.assign({ id: 1 }, alunoValido), { livroId: null, createdAt: new Date() });
            alunoRepositoryStub.criaAluno.resolves(alunoCriadoMock);
            const resultado = yield alunoService.lidaComCriacaoDoAluno(alunoValido);
            (0, chai_1.expect)(alunoRepositoryStub.criaAluno.calledOnce).to.be.true;
            (0, chai_1.expect)(resultado).to.deep.equal(alunoCriadoMock);
        }));
        it('deve lançar um erro se os dados forem insuficientes', () => __awaiter(void 0, void 0, void 0, function* () {
            const dadosInvalidos = {
                nome: '',
                matricula: '',
                userId: 1,
                codigo_do_setor: 101,
                nome_do_campus: 'Universidade Federal de Campina Grande',
                nome_do_curso: 'Ciência da Computação',
                nome_do_setor: 'Departamento de Computação',
                turno_do_curso: 'Integral',
                password: 'senhaSegura123'
            };
            yield (0, chai_1.expect)(alunoService.lidaComCriacaoDoAluno(dadosInvalidos)).to.be.Throw(ReportarErroAoSistema_1.ReportarErrorAoSistema, 'Dados insuficientes para criar o usuário.');
        }));
    });
    describe('lidaComBuscaDoAlunoPorId', () => {
        it('deve buscar um aluno por ID válido', () => __awaiter(void 0, void 0, void 0, function* () {
            const alunoMock = {
                id: 1,
                nome: 'João Silva',
                matricula: '2022100123',
                userId: 1,
                nome_do_curso: 'Ciência da Computação',
                turno_do_curso: 'Integral',
                nome_do_campus: 'Universidade Federal de Campina Grande',
                codigo_do_setor: 101,
                nome_do_setor: 'Departamento de Computação',
                password: 'senhaSegura123',
                livroId: null,
                createdAt: new Date()
            };
            alunoRepositoryStub.buscaAlunoPorId.resolves(alunoMock);
            const resultado = yield alunoService.lidaComBuscaDoAlunoPorId(1);
            (0, chai_1.expect)(alunoRepositoryStub.buscaAlunoPorId.calledOnceWith(1)).to.be.true;
            (0, chai_1.expect)(resultado).to.deep.equal(alunoMock);
        }));
        it('deve lançar um erro se o ID não for informado', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, chai_1.expect)(alunoService.lidaComBuscaDoAlunoPorId(0)).to.be.Throw(ReportarErroAoSistema_1.ReportarErrorAoSistema, 'ID do usuário não informado.');
        }));
        it('deve lançar um erro se o aluno não for encontrado', () => __awaiter(void 0, void 0, void 0, function* () {
            alunoRepositoryStub.buscaAlunoPorId.resolves(null);
            yield (0, chai_1.expect)(alunoService.lidaComBuscaDoAlunoPorId(1)).to.be.Throw(Error, 'User not found');
        }));
    });
    describe('lidaComBuscaDoAlunoPorMatricula', () => {
        it('deve buscar um aluno por matrícula válida', () => __awaiter(void 0, void 0, void 0, function* () {
            const alunoMock = {
                id: 1,
                nome: 'João Silva',
                matricula: '2022100123',
                userId: 1,
                nome_do_curso: 'Ciência da Computação',
                turno_do_curso: 'Integral',
                nome_do_campus: 'Universidade Federal de Campina Grande',
                codigo_do_setor: 101,
                nome_do_setor: 'Departamento de Computação',
                password: 'senhaSegura123',
                livroId: null,
                createdAt: new Date()
            };
            alunoRepositoryStub.buscaAlunoPorMatricula.resolves(alunoMock);
            const resultado = yield alunoService.lidaComBuscaDoAlunoPorMatricula('2022100123');
            (0, chai_1.expect)(alunoRepositoryStub.buscaAlunoPorMatricula.calledOnceWith('2022100123')).to.be.true;
            (0, chai_1.expect)(resultado).to.deep.equal(alunoMock);
        }));
        it('deve lançar um erro se a matrícula não for informada', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, chai_1.expect)(alunoService.lidaComBuscaDoAlunoPorMatricula('')).to.be.Throw(ReportarErroAoSistema_1.ReportarErrorAoSistema, 'Matricula do usuário não informada.');
        }));
    });
    describe('lidaComRemocaoDoAluno', () => {
        it('deve remover o aluno com ID válido', () => __awaiter(void 0, void 0, void 0, function* () {
            alunoRepositoryStub.deletaAluno.resolves();
            yield alunoService.lidaComRemocaoDoAluno(1);
            (0, chai_1.expect)(alunoRepositoryStub.deletaAluno.calledOnceWith(1)).to.be.true;
        }));
        it('deve lançar um erro se o ID não for informado', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, chai_1.expect)(alunoService.lidaComRemocaoDoAluno(0)).to.be.Throw(ReportarErroAoSistema_1.ReportarErrorAoSistema, 'ID do usuário não informado.');
        }));
    });
});
