const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

function run() {
  const result = dotenv.config();
  const env = result.parsed;

  function callback(err) {
    if (err) throw err;
  }

  const envFilePath = path.resolve(__dirname, '../.env');
  const fastlaneEnvFilePath = path.resolve(
    __dirname,
    `../android/fastlane/.env.${env.BRAND_ID.replace('com.company.', '')}`,
  );

  fs.copyFile(envFilePath, fastlaneEnvFilePath, callback);
}

run();
