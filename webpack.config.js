const buildConfig = env => {
  if (env === 'dev' || env === 'prod') {
    return require(`./webpack.config.${env}.js`);
  } else {
    throw new ReferenceError('Wrong webpack build parameter. Possible choices: `dev` or `prod`.');
  }
};

module.exports = buildConfig;
