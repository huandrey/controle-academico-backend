import { Request, Response } from 'express';
import { IUserService } from '../services/user-service';

export class UserController {
  constructor(private userService: IUserService) {}

  async importUserData(req: Request, res: Response) {
    const { login, senha, vinculo } = req.body;
    try {
      const data = await this.userService.importUserData(login, senha, vinculo);
      res.status(200).json(data);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  toString() {
    return 'UserController';
  }
}
