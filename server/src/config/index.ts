
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || "9006";
process.env.API_VERSION = process.env.API_VERSION || "v1";

export default {
  port: parseInt(process.env.PORT, 10),
  api_version: `${process.env.API_VERSION}` || 'v1',
  db: {
    url: process.env.DB_URL || 'mongodb+srv://test123:qwerty123@cluster0.0oepk.mongodb.net/cluster0?retryWrites=true&w=majority',
    debug: true
  }
};
