const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const envFile = require('envfile');

function run() {
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }

  const env = result.parsed;
  const envFilePath = path.resolve(__dirname, '../.env');

  const envConfig = {
    ...env,
  };

  fs.writeFileSync(envFilePath, envFile.stringify(envConfig));
}

run();
