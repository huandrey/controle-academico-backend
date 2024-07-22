import express, { Request, Response } from 'express'
import path from 'path'
import functions from 'firebase-functions'
import admin from 'firebase-admin'
import cors from 'cors'
const accessKey = require('../functions/access_key.json')

const app = express()
const port = 3000

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
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`)
})
