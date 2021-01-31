export default interface IUserService {
  create(user: any): Promise<any>;
  query(params: any): Promise<any>;
  updateUser(id: string, data: any): Promise<any>;
  deleteUser(id: string): Promise<any>;
}
