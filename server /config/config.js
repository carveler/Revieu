const { env } = process;

const config = {
  env: env.NODE_ENV || 'development',
};

const devConfig = {
  db: env.MONGO_URI_DEV,
  access_jwt_key: env.ACCESS_JWT_KEY_DEV,
  refresh_jwt_key: env.REFRESH_JWT_KEY_DEV,
  frontendOrigin: env.FRONTEND_ORIGIN_DEV,
};

const prodConfig = {
  db: env.MONGO_URI_PROD,
  access_jwt_key: env.ACCESS_JWT_KEY_PROD,
  refresh_jwt_key: env.REFRESH_JWT_KEY_PROD,
  frontendOrigin: env.FRONTEND_ORIGIN_PROD,
};

const currentConfig = config.env === 'production' ? prodConfig : devConfig;
console.log('OUR ENVIROMENT SETUP IS:', config.env);
console.log(currentConfig);

module.exports = Object.assign({}, config, currentConfig);
