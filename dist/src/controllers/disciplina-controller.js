//   constructor(private userService: IUserService) {}
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class DisciplinaController {
    constructor(disciplinaService) {
        this.disciplinaService = disciplinaService;
    }
    criaDisciplina(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(201).json({ message: "Aluno criado com sucesso!" });
        });
    }
    atualizaDisciplina(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    deletaDisciplina(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    importaDisciplinas(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
//   toString() {
//     return 'UserController'
//   }
// }
