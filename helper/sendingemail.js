const { awsConfig } = require("../config/aws-config");
const AWS = require("aws-sdk");
console.log("------awsconfig------", awsConfig);
const logger = require("../helper/logger");

logger.level = "info";

//create AWS SES service object
const ses = new AWS.SES({ apiVersion: "2010-12-01" });

//email parameters
const params = {
  Destination: {
    ToAddresses: ["vikjdk7@gmail.com"],
  },
  Message: {
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
.responsive {
  width: 100%;
  max-width: 1200px;
  height: auto;
}
.block {
  display: block;
  width: 100%;
  border: none;
  background-color: #04AA6D;
  color: white;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}

.block:hover {
  background-color: #ddd;
  color: black;
}
.message{
background-color: white;
  color: black;
  font-size: 10vw; 
  font-weight: bold;
  margin: 0 auto;
  padding: 10px;
  width: 50%;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
}
</style>
</head>
<body>
<p class="message"> Welcome to Sportify </p>

<img src="https://img.freepik.com/free-vector/server-room-rack-blockchain-technology-token-api-access-data-center_39422-442.jpg?w=1380&t=st=1691610444~exp=1691611044~hmac=87a9b30b6ca11a1a1390cd50791ebb32f929aabbd3028517facad3eba6c9bb0b" alt="Nature" class="responsive" width="1200" height="1100">
<button class="block">Click to See Info</button>
<br>
</body>
</html>
`,
      },
      Text: { Data: "Welcome to Sportify" },
    },
    Subject: { Data: "Welcome to Sportify" },
  },
  Source: "vikjre7@gmail.com",
};

//send email
ses.sendEmail(params, (err, data) => {
  if (err) {
    logger.error("Error:", err);
  } else {
    logger.info("Email sent:", data);
  }
});
