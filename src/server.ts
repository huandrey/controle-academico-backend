<<<<<<< HEAD
import express, { Request, Response } from 'express';
import path from 'path';
import axios from 'axios';
import puppeteer from 'puppeteer';
=======
import express, { Request, Response } from 'express'
import path from 'path'
import functions from 'firebase-functions'
import admin from 'firebase-admin'
import cors from 'cors'
const accessKey = require('../functions/access_key.json')
>>>>>>> 10713675d4f1a727738797a929f0eab01c9648ae

const app = express()
const port = 3000

<<<<<<< HEAD
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.post('/auth', async (req: Request, res: Response) => {
  const url = 'https://pre.ufcg.edu.br:8443/ControleAcademicoOnline/Controlador'

  const { matricula, senha } = req.body;

  if (matricula === undefined || senha === undefined) {
    res.status(400).send("A autenticação falhou, preencha os dados corretamente.");
  }

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "cookie": "JSESSIONID=206FB793E3EDD45F125E7E653DF7F409",
  }

  try {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    const controleAcademico = await page.goto('https://pre.ufcg.edu.br:8443/ControleAcademicoOnline/Controlador?command=AlunoTurmasListar');
    const content = await page.content();
    // const input = await page.waitForSelector('#login')
    // console.log(input);
    const input = await page.waitForSelector('#login');
    console.log(input);
    const myLocalValue = 'Adenosine triphosphate';
    await page.$eval('#login', (el: any, value) => el!.value = value, myLocalValue);

    res.send(content);

    await browser.close();


    // const inputs = '.form-control';
    // const inputsSelected = await page.waitForSelector(inputs);
    // console.log(inputsSelected)

    // const response = await axios.post(url, `login=${matricula}&senha=${senha}&command=AlunoLogin`, { headers });
    // console.log(response);
    // res.send(response.data)

    // res.send('ók')
  } catch (err) {
    console.log(err);
    res.status(400).send('Aconteceu um erro inesperado :/')
=======
app.use(cors({ origin: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))


admin.initializeApp({
  credential: admin.credential.cert(accessKey),
  databaseURL: "https://projetotestefirebase-568fd.firebaseio.com"
})

const db = admin.firestore()

app.get('/', (request: Request, response: Response) => {
  response.send('Hello World!')
})

app.get('/users/:id', async (request: Request, response: Response) => {
  try {
    const document = db.collection('users').doc(request.params.id);
    let user = await document.get();

    if (!user.data()) {
      return response.status(404).send({
        message: 'Usuário não encontrado.'
      })
    }

    return response.status(200).json({
      data: user.data(),
      message: 'Operação realizada com sucesso!'
    })
  } catch (error) {
    return response.status(500).send(error);
  }
})

app.post('/users', async (request: Request, response: Response) => {
  try {
    const { matricula, senha } = request.body;

    if (!matricula || !senha) return response.status(400).send({
      data: [],
      message: 'Operação não permitida! Forneça os dados de matricula e senha corretamente.'
    })

    const doc = db.collection('users').doc('/' + matricula + '/')
    let user = await doc.get();

    if (user.data()) {
      return response.status(400).send({
        data: [],
        message: 'Operação não permitida! Usuário já cadastrado.'
      })
    }

    await db.collection('users').doc('/' + matricula + '/').create({ matricula, name: 'John Doe' });

    return response.status(201).send();
  } catch (error) {
    return response.status(500).send(error);
  }
})

app.put('/users', async (request: Request, response: Response) => {
  try {
    const { matricula, name } = request.body;
    const doc = db.collection('users').doc('/' + matricula + '/')
    const user = await doc.get();

    if (!user.data()) {
      return response.status(404).send({
        message: 'Usuário não encontrado.'
      })
    }

    await doc.update({ name });

    return response.status(201).send();
  } catch (error) {
    return response.status(500).send(error);
  }
})

app.delete('/users/:id', async (request: Request, response: Response) => {
  try {
    const document = db.collection('users').doc('/' + request.params.id + '/');
    await document.delete();

    return response.status(201).send();
  } catch (error) {
    return response.status(500).send(error);
>>>>>>> 10713675d4f1a727738797a929f0eab01c9648ae
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`)
})
