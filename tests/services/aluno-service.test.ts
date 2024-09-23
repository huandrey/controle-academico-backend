import { expect } from 'chai';
import sinon from 'sinon';
import { AlunoService } from '../../src/services/aluno-service';
import { IAlunoRepository } from '../../src/repositories/aluno-repository';
import { AlunoDTO } from '../../src/dtos/aluno-dto';
import { Aluno } from '@prisma/client';
import { ReportarErrorAoSistema } from '../../src/exceptions/ReportarErroAoSistema';

describe('AlunoService', () => {
  let alunoRepositoryStub: sinon.SinonStubbedInstance<IAlunoRepository>;
  let alunoService: AlunoService;

  beforeEach(() => {
    alunoRepositoryStub = {
      criaAluno: sinon.stub(),
      buscaAlunoPorId: sinon.stub(),
      buscaAlunoPorMatricula: sinon.stub(),
      atualizaAluno: sinon.stub(),
      buscaAlunoPorEmail: sinon.stub(),
      deletaAluno: sinon.stub(),
    };
    alunoService = new AlunoService(alunoRepositoryStub);
  });

  describe('lidaComCriacaoDoAluno', () => {
    it('deve criar um aluno com dados válidos', async () => {
      const alunoValido: AlunoDTO = {
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

      const alunoCriadoMock: Aluno = {
        id: 1,
        ...alunoValido,
        livroId: null,
        createdAt: new Date()
      };

      alunoRepositoryStub.criaAluno.resolves(alunoCriadoMock);

      const resultado = await alunoService.lidaComCriacaoDoAluno(alunoValido);

      expect(alunoRepositoryStub.criaAluno.calledOnce).to.be.true;
      expect(resultado).to.deep.equal(alunoCriadoMock);
    });

    it('deve lançar um erro se os dados forem insuficientes', async () => {
      const dadosInvalidos: AlunoDTO = {
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

      await expect(alunoService.lidaComCriacaoDoAluno(dadosInvalidos)).to.be.Throw(ReportarErrorAoSistema, 'Dados insuficientes para criar o usuário.');
    });
  });

  describe('lidaComBuscaDoAlunoPorId', () => {
    it('deve buscar um aluno por ID válido', async () => {
      const alunoMock: Aluno = {
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

      const resultado = await alunoService.lidaComBuscaDoAlunoPorId(1);

      expect(alunoRepositoryStub.buscaAlunoPorId.calledOnceWith(1)).to.be.true;
      expect(resultado).to.deep.equal(alunoMock);
    });

    it('deve lançar um erro se o ID não for informado', async () => {
      await expect(alunoService.lidaComBuscaDoAlunoPorId(0)).to.be.Throw(ReportarErrorAoSistema, 'ID do usuário não informado.');
    });

    it('deve lançar um erro se o aluno não for encontrado', async () => {
      alunoRepositoryStub.buscaAlunoPorId.resolves(null);

      await expect(alunoService.lidaComBuscaDoAlunoPorId(1)).to.be.Throw(Error, 'User not found');
    });
  });

  describe('lidaComBuscaDoAlunoPorMatricula', () => {
    it('deve buscar um aluno por matrícula válida', async () => {
      const alunoMock: Aluno = {
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

      const resultado = await alunoService.lidaComBuscaDoAlunoPorMatricula('2022100123');

      expect(alunoRepositoryStub.buscaAlunoPorMatricula.calledOnceWith('2022100123')).to.be.true;
      expect(resultado).to.deep.equal(alunoMock);
    });

    it('deve lançar um erro se a matrícula não for informada', async () => {
      await expect(alunoService.lidaComBuscaDoAlunoPorMatricula('')).to.be.Throw(ReportarErrorAoSistema, 'Matricula do usuário não informada.');
    });
  });

  describe('lidaComRemocaoDoAluno', () => {
    it('deve remover o aluno com ID válido', async () => {
      alunoRepositoryStub.deletaAluno.resolves();

      await alunoService.lidaComRemocaoDoAluno(1);

      expect(alunoRepositoryStub.deletaAluno.calledOnceWith(1)).to.be.true;
    });

    it('deve lançar um erro se o ID não for informado', async () => {
      await expect(alunoService.lidaComRemocaoDoAluno(0)).to.be.Throw(ReportarErrorAoSistema, 'ID do usuário não informado.');
    });
  });
});
