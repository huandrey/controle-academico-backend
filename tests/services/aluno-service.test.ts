import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { AlunoService } from '../../src/services/aluno-service'
import { IAlunoRepository } from '../../src/repositories/aluno-repository'
import { AlunoDTO } from '../../src/dtos/aluno-dto'
import { Aluno } from '@prisma/client'
import { ReportarErrorAoSistema } from '../../src/exceptions/ReportarErroAoSistema'

describe('AlunoService', () => {
  let alunoRepository: sinon.SinonStubbedInstance<IAlunoRepository>
  let alunoService: AlunoService

  beforeEach(() => {
    alunoRepository = {
      criaAluno: sinon.stub(),
      buscaAlunoPorId: sinon.stub(),
      buscaAlunoPorMatricula: sinon.stub(),
      atualizaAluno: sinon.stub(),
      buscaAlunoPorEmail: sinon.stub(),
      deletaAluno: sinon.stub(),
    }
    alunoService = new AlunoService(alunoRepository)
  })

  describe('lidaComCriacaoDoAluno', () => {
    it('deve criar um aluno com dados válidos', async () => {
      const alunoData: AlunoDTO = {
        nome: 'Teste', matricula: '12345', userId: 1,
        codigo_do_setor: 0,
        nome_do_campus: '',
        nome_do_curso: '',
        nome_do_setor: '',
        turno_do_curso: '',
        password: ''
      }
      const alunoCriado: Aluno = {
        id: 1, ...alunoData,
        livroId: null,
        createdAt: new Date()
      }
      alunoRepository.criaAluno.resolves(alunoCriado)

      const result = await alunoService.lidaComCriacaoDoAluno(alunoData)

      expect(alunoRepository.criaAluno.calledOnce).to.be.true
      expect(result).to.deep.equal(alunoCriado)
    })

    it('deve lançar um erro se os dados forem insuficientes', async () => {
      const alunoData: AlunoDTO = {
        nome: '', 
        matricula: '', 
        userId: 1,
        codigo_do_setor: 0,
        nome_do_campus: '',
        nome_do_curso: '',
        nome_do_setor: '',
        turno_do_curso: '',
        password: ''
      }

      await expect(alunoService.lidaComCriacaoDoAluno(alunoData)).to.be.equal(ReportarErrorAoSistema, 'Dados insuficientes para criar o usuário.')
    })
  })

  describe('lidaComBuscaDoAlunoPorId', () => {
    it('deve buscar um aluno por ID válido', async () => {
      const aluno: Aluno = {
        id: 1, nome: 'Teste', matricula: '12345', userId: 1,
        nome_do_curso: '',
        turno_do_curso: '',
        nome_do_campus: '',
        codigo_do_setor: 0,
        nome_do_setor: '',
        password: '',
        livroId: null,
        createdAt: new Date()
      }
      alunoRepository.buscaAlunoPorId.resolves(aluno)

      const result = await alunoService.lidaComBuscaDoAlunoPorId(1)

      expect(alunoRepository.buscaAlunoPorId.calledOnceWith(1)).to.be.true
      expect(result).to.deep.equal(aluno)
    })

    it('deve lançar um erro se o ID não for informado', async () => {
      await expect(alunoService.lidaComBuscaDoAlunoPorId(0)).to.be.equal(ReportarErrorAoSistema, 'ID do usuário não informado.')
    })

    it('deve lançar um erro se o aluno não for encontrado', async () => {
      alunoRepository.buscaAlunoPorId.resolves(null)

      await expect(alunoService.lidaComBuscaDoAlunoPorId(1)).to.be.equal(Error, 'User not found')
    })
  })

  describe('lidaComBuscaDoAlunoPorMatricula', () => {
    it('deve buscar um aluno por matrícula válida', async () => {
      const aluno: Aluno = {
        id: 1, nome: 'Teste', matricula: '12345', userId: 1,
        nome_do_curso: '',
        turno_do_curso: '',
        nome_do_campus: '',
        codigo_do_setor: 0,
        nome_do_setor: '',
        password: '',
        livroId: null,
        createdAt: new Date()
      }
      alunoRepository.buscaAlunoPorMatricula.resolves(aluno)

      const result = await alunoService.lidaComBuscaDoAlunoPorMatricula('12345')

      expect(alunoRepository.buscaAlunoPorMatricula.calledOnceWith('12345')).to.be.true
      expect(result).to.deep.equal(aluno)
    })

    it('deve lançar um erro se a matrícula não for informada', async () => {
      await expect(alunoService.lidaComBuscaDoAlunoPorMatricula('')).to.be.equal(ReportarErrorAoSistema, 'Matricula do usuário não informada.')
    })
  })

  describe('lidaComRemocaoDoAluno', () => {
    it('deve remover o aluno com ID válido', async () => {
      alunoRepository.deletaAluno.resolves()

      await alunoService.lidaComRemocaoDoAluno(1)

      expect(alunoRepository.deletaAluno.calledOnceWith(1)).to.be.true
    })

    it('deve lançar um erro se o ID não for informado', async () => {
      await expect(alunoService.lidaComRemocaoDoAluno(0)).to.be.equal(ReportarErrorAoSistema, 'ID do usuário não informado.')
    })
  })
})
