import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.db.url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  mongoose.set("debug", config.db.debug);
  return connection.connection.db;
};


