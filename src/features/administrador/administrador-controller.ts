import { AdministradorService } from "./administrador-service"

export class AdministradorController {
  private administadorService: AdministradorService

  constructor(administradorService: AdministradorService) {
    this.administadorService = administradorService
  }
}
