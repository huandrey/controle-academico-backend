// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../src/app';
// import sinon from 'sinon';
// import { SistemaService } from '../../src/services/sistema-service';

// chai.use(chaiHttp);
// const { expect } = chai;

// describe('Vaga Routes', () => {
//     let sistema: sinon.SinonStubbedInstance<VagaService>;

//     beforeEach(() => {
//         vagaServiceStub = sinon.createStubInstance(VagaService);
//     });

//     afterEach(() => {
//         sinon.restore();
//     });

//     it('should create a new vaga', async () => {
//         const vagaData = { id: 'string', numero: 'A1', tipo: 'carro', disponibilidade: true, estacionamentoId: '1' };
//         vagaServiceStub.createVaga.resolves(vagaData);

//         const res = await chai.request(app)
//             .post('/vagas')
//             .send(vagaData);

//         expect(res).to.have.status(201);
//         expect(res.body).to.deep.equal(vagaData);
//     });

//     it('should get a vaga by id', async () => {
//         const vaga = { id: '1', numero: 'A1', tipo: 'carro', disponibilidade: true, estacionamentoId: '1' };
//         vagaServiceStub.getVagaById.resolves(vaga);

//         const res = await chai.request(app)
//             .get('/vagas/1');

//         expect(res).to.have.status(200);
//         expect(res.body).to.deep.equal(vaga);
//     });

//     it('should update a vaga by id', async () => {
//         const vaga = { id: '1', numero: 'A1', tipo: 'carro', disponibilidade: false, estacionamentoId: '1' };
//         vagaServiceStub.updateVaga.resolves(vaga);

//         const res = await chai.request(app)
//             .put('/vagas/1')
//             .send({ disponibilidade: false });

//         expect(res).to.have.status(200);
//         expect(res.body).to.deep.equal(vaga);
//     });

//     it('should delete a vaga by id', async () => {
//         vagaServiceStub.deleteVaga.resolves();

//         const res = await chai.request(app)
//             .delete('/vagas/1');

//         expect(res).to.have.status(204);
//     });

//     it('should list all vagas', async () => {
//         const vagas = [
//             { id: '1', numero: 'A1', tipo: 'carro', disponibilidade: true, estacionamentoId: '1' },
//             { id: '2', numero: 'A2', tipo: 'moto', disponibilidade: false, estacionamentoId: '1' },
//         ];
//         vagaServiceStub.listVagas.resolves(vagas);

//         const res = await chai.request(app)
//             .get('/vagas');

//         expect(res).to.have.status(200);
//         expect(res.body).to.deep.equal(vagas);
//     });
// });
