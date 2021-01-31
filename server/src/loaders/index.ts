import expressLoader from './express';
import dbLoader from './mongoose'

export default async ({ expressApp }) => {

  await dbLoader();
  console.info(`✌️ DB loaded `);

  await expressLoader({ app: expressApp });
  console.info(`✌️ Express loaded `);

  console.info('✌️ Loaders completed');
};
