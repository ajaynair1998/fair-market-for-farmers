const fs = require("fs");
const path = require("path");
const mongoDbClass = require("../../dbActions/index");

// using the json web token library
const jwt = require("jsonwebtoken");

// for debug
// let signedJwt='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTE3YjdjYTYzMmFlMzY5MWY1MmFlNjUiLCJpYXQiOjE2MjkxMTczOTIwOTAsImV4cCI6MTYyOTExNzM5MjA5MX0.sEQFmdEMKKEt317estKXnvX_XX9lNOBi5NROc_QGZAj6mS9KIzx0ryzePTgOeFTP9AXh0NtS3n7yEaZf1gdZm8c2QFQ1btI8ZvQYu1KR33RpGvH5P5FZpljZQxyeP4B_Bco5v7ePzsUDiWmfAuzl7z6CwNCEqL5zQa4sCTEhWLScUZZ5ao5bWCqDHUDKoEsJsOSif1GqWLIzx3uK_KZANisUAKlkom6nK-MRwh2RW2-I-rtwg6QeTntVcoklSU3us7w6y_iVx58aX7Fns-jFEIem_5cLwxmqzrvL_U39QzpHvoNWdJlUJAiYeseKDDG6cbkmpqTf5wYhR0RtZN2Dl6eKNZvUfkoeEvKCvdgGHrq51oDTdqmzPbYu24FyICVX-L5phMc0R46gPhoN9Jz_ZV62tXym8PFCg_iursfiPnc3nSCCeSiztMJ95SpKTxLbAEyDIz-CUhQCgo0KoGburOF7dyBZO0XP7RjViCKSFncza_bX3LxoyixEEQ1tO4MktnmMQQcgSHnpyQytxPfe63GaI8GlBis2b9Ku4vTr8ooSLRFvh5qCqg9I5Jjzs5KSHHnyeie5OX64JnUjz0LYDbrmjx4q6d2EuAAqY1NZ58hmVm9Gk9tN37vFubvglHtvdWtHv5sxrbqJqjWRQmtbJCF_nhLBEoatwbvu7X72ifE'

// main function which takes in the token and verifies and returns the userName
async function verifyAndRetrieveUser(token) {
  // importing the public key to verify the authenticity of token
  const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
  const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");

  // initialise the MongoDb class
  let mongoDbOperations = new mongoDbClass();

  // main function which verifies
  let isValid = jwt.verify(
    token,
    PUB_KEY,
    { algorithms: "RS256" },
    (err, payload) => {
      if (err) {
        return [false, err];
        // return response
      } else {
        return [true, payload.sub];
      }

      // return response
    }
  );

  // if the jwt is valid then query the db and get the userName
  if (!isValid[0]) return false;
  let userName = await mongoDbOperations.checkByObjectIdAndReturn(isValid[1]);
  return userName.userName;
}

module.exports = verifyAndRetrieveUser;
