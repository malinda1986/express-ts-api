import { Service } from "typedi";
import HobbyRepository from "../../models/Hobby";
import { IHobbyDTO } from "../../../lib/dto";

@Service()
export default class HobbyService {
  private hobby: any;

  constructor() {
    this.hobby = HobbyRepository;
  }

  public async create(hobby: IHobbyDTO): Promise<IHobbyDTO> {
    return await this.hobby.add(hobby);
  }
  public async deleteHobby(id: string): Promise<any> {
    return await this.hobby.removeHobby(id);
  }
  public async deleteHobbiesByUser(id: string): Promise<any> {
    return await this.hobby.removeHobbiesByUser(id);
  }
  public async updateHobby(id: string, hobby: IHobbyDTO): Promise<any> {
    return await this.hobby.updateHobby(id, hobby);
  }
  public async query(data: any): Promise<Array<IHobbyDTO>> {
    return await this.hobby.filter(data);
  }
}
