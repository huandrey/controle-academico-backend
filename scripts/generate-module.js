const fs = require('fs');
const path = require('path');

// Função que cria um arquivo e escreve um template básico nele
function createFile(directory, filename, content) {
    const dirPath = path.join(__dirname, '../src', directory); // Caminho base ajustado para 'src'
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = path.join(dirPath, filename);
    fs.writeFileSync(filePath, content);
    console.log(`Created: ${filePath}`);
}

// Template básico para os arquivos
const templates = {
    controller: (name) => `
import { Request, Response } from 'express'
import { ${name}DTO } from "../dtos/${name.toLowerCase()}-dto"
import { I${name}Service } from '../services/${name.toLowerCase()}-service'

export interface Post${name}Request extends Request {
  body: ${name}DTO
}

export class ${name}Controller {
  private ${name.toLowerCase()}Service: I${name}Service

  constructor(${name.toLowerCase()}Service: I${name}Service) {
    this.${name.toLowerCase()}Service = ${name.toLowerCase()}Service
  }

}
`,
    service: (name) => `
import { I${name}Repository } from'../repositories/${name.toLowerCase()}-repository'
import { ${name}DTO } from '../dtos/${name.toLowerCase()}-dto'
import { ${name} } from '@prisma/client'

export interface I${name}Service {}

export class ${name}Service implements I${name}Service {
  private ${name.toLowerCase()}Repository: I${name}Repository

  constructor(${name.toLowerCase()}Repository: I${name}Repository) {
    this.${name.toLowerCase()}Repository = ${name.toLowerCase()}Repository
  }

}
`,
    repository: (name) => `
// ${name} Repository
export interface I${name}Repository {}

export class ${name}Repository implements I${name}Repository {
  // Implement repository methods here
}
`,
    route: (name) => `
import { Router } from 'express'
import { ${name}Controller } from '../controllers/${name.toLowerCase()}-controller'

const ${name.toLowerCase()}Controller = new ${name}Controller()
const router = Router()

// Define your routes here

export default router
`,
    dto: (name) => `
// ${name} DTO
export class ${name}DTO {
  // Define properties and methods for DTO
}
`,
};

// Recupera o nome do módulo da linha de comando
const moduleName = process.argv[2];
if (!moduleName) {
    console.error('Please provide a module name.');
    process.exit(1);
}

// Converte o nome do módulo para PascalCase
const pascalCaseName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

// Cria os arquivos dentro de 'src'
createFile('controllers', `${moduleName}-controller.ts`, templates.controller(pascalCaseName));
createFile('services', `${moduleName}-service.ts`, templates.service(pascalCaseName));
createFile('repositories', `${moduleName}-repository.ts`, templates.repository(pascalCaseName));
createFile('routes', `${moduleName}-route.ts`, templates.route(pascalCaseName));
createFile('dtos', `${moduleName}-dto.ts`, templates.dto(pascalCaseName));
