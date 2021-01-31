import mongoose from 'mongoose'
import configs from '../../../config'
import UserRepository from "../User";
const mongoUrl = configs.db.url;

beforeAll(async () => {
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.Promise = Promise
    //remove added docs
  })
  
afterEach(async () => {
// remove added docs
})

afterAll(async () => {
  await mongoose.connection.close()
})
  

describe('User model tests', () => {
  it('can create a user', async () => {
    const resp = await UserRepository.create({name: "malinda"})
    expect(resp.name).toMatch("malinda")
  })
})
