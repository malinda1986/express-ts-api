export default interface IUserService {
  create(user: any): Promise<any>;
  query(params: any): Promise<any>;
  updateHobby(id: string, data: any): Promise<any>;
  deleteHobby(id: string): Promise<any>;
  deleteHobbiesByUser(id: string): Promise<any>;
}
