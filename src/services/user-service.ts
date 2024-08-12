import { Disciplina, UFCGImporter } from "../importers/implementation/ufcg-importer";
import { IUserRepository, UserRepository } from "../repositories/user-repository";

export interface IUserService {
  importUserData(login: string, senha: string, vinculo: string): Promise<Disciplina[]>;
}

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async importUserData(login: string, senha: string, vinculo: string): Promise<Disciplina[]> {
    const importer = new UFCGImporter();
    const disciplinas = await importer.importDisciplinas(login, senha, vinculo);
    console.log(`importUserData: ${disciplinas}`);

    // Salvar disciplinas no banco de dados
    await this.userRepository.saveDisciplinas(disciplinas);

    return disciplinas;
  }
}
