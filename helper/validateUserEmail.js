async function validateUserEmailWithRegex(email) {
  if (!email) return false;
  if (email.length > 254) {
    throw new Error("Email address too long");
  }
  const regex = /\S+@\S+\.\S+/;
  const isValidEmail = regex.test(email);
  return isValidEmail;
}

//function to find first 100 prime numbers
function findPrimeNumbers() {
  let primeNumbers = [];
  let counter = 0;
  let number = 2;
  while (counter < 100) {
    if (isPrime(number)) {
      primeNumbers.push(number);
      counter++;
    }
    number++;
  }
  return primeNumbers;
}
