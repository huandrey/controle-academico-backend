import express, { Request, Response } from 'express';
import path from 'path';
import axios from 'axios';
import puppeteer from 'puppeteer';

const app = express()
const port = 3000

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
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`)
})
