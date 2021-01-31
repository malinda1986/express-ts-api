import { Service, Container } from "typedi";
import HobbyService from "../../hobby/services/HobbyService";
import UserRepository from "../../models/User";
import { IUserDTO } from "../../../lib/dto";

@Service()
export default class UserService {
  private readonly user: any;
  private readonly hobby: any;

  constructor() {
    this.user = UserRepository;
    this.hobby = Container.get(HobbyService);
  }
  public async create(user: IUserDTO): Promise<IUserDTO> {
    return await this.user.add(user);
  }
  public async deleteUser(id: string): Promise<any> {
    const resp = await this.user.removeUser(id);
    if (resp) {
     return await this.hobby.deleteHobbiesByUser(id);
    }
    return false;
  }
  public async updateUser(id: string, data: any): Promise<any> {
    return await this.user.updateUser(id, data);
  }
  public async query(data: any): Promise<Array<IUserDTO>> {
    return await this.user.filter(data);
  }
}
