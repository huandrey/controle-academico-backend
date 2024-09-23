var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class AuthRepository {
    constructor(orm) {
        this.orm = orm;
    }
    // async validateUserCredentials(email: string, password: string): Promise<Use | null> {
    //   const user = await this.orm.user.findUnique({ where: { email } })
    //   if (user && user.password === password) {  // Adicione hash/salt em produçãoreturn user
    //   }
    //   return null
    // }
    adicionaTokenDeAutenticacao(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.orm.adicionaTokenDeAutenticacao(userId, token);
        });
    }
}
