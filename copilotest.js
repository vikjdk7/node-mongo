//function to validate email

require("dotenv").config();

const validateemail = (email) => {
  if (!email) return false;
  if (email.length > 254) {
    throw new Error("Email address too long");
  }
  const regex = /\S+@\S+\.\S+/;
  const isValidEmail = regex.test(email);
  return isValidEmail;
};
