const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const envFile = require('envfile');

function formatToEnvVariable(brandConfig) {
  return Object.entries(brandConfig).reduce((acc, curr) => {
    const [key, value] = curr;
    const [, brandPropertyName] = key.split('.');
    const envVariableKey = `BRAND_${brandPropertyName.toUpperCase()}`;

    return {
      ...acc,
      [envVariableKey]: value,
    };
  }, {});
}

function run() {
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }

  const env = result.parsed;
  const envFilePath = path.resolve(__dirname, '../.env');
  const versionPropertiesFile = fs.readFileSync('version.properties');
  const envConfig = {
    ...env,
    ...formatToEnvVariable(dotenv.parse(versionPropertiesFile)),
  };

  fs.writeFileSync(envFilePath, envFile.stringify(envConfig));
}

run();
