const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const logger = require("../helper/logger");

logger.level = "info";
// Create an absolute path to the configuration file
const configPath = path.join(__dirname, "..", "config", "aws-config.json");

// Load the configuration from the JSON file
const awsConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));

logger.info("AWS Config Loaded", awsConfig);

// Apply the configuration to the AWS SDK
AWS.config.update(awsConfig);

module.exports = { awsConfig };
