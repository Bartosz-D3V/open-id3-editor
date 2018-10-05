const buildConfig = env => {
  if (env === 'dev' || env === 'test' || env === 'prod') {
    return require('./webpack.conf.' + env + '.js');
  } else {
    throw new ReferenceError(
      'Wrong webpack build parameter. Possible choices: `dev`, `test`, or `prod`.'
    );
  }
};

module.exports = buildConfig;
