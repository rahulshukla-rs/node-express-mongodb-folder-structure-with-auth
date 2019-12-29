const SERVER_PORT = process.env.PORT || 3000;

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/testApp?retryWrites=true";
const MONGO_PORT = process.env.MONGO_PORT || 27017;

const JWT_KEY = process.env.JWT_KEY || "testApp";

const JWT_EXPIRES = process.env.JWT_EXPIRES || '365d';



module.exports = {
  SERVER_PORT: SERVER_PORT,
  mongodb: {
    MONGO_URL: MONGO_URL,
    MONGO_PORT: MONGO_PORT
  },
  JWT_KEY: JWT_KEY,
  JWT_EXPIRES: JWT_EXPIRES
};
