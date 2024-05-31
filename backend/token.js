require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretToken = process.env.SECRET_ACCESS_TOKEN;

async function generateAccessToken(user) {
    return await jwt.sign(user, secretToken, { expiresIn: "20m" });
}

async function decodeAccessToken(authorizationHeader) {
    if (!authorizationHeader) {
        console.log("Authorization header is missing");
        return null;
    }
    try {
        // Ensure proper splitting of the 'Bearer <token>' string
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            console.log("Token is missing in the authorization header");
            return null;
        }
        const decodedToken = await jwt.verify(token, secretToken);
        // console.log(decodedToken);
        return decodedToken;
    } catch (err) {
        console.log("Error occurred", err);
        return null;
    }
}

module.exports = { generateAccessToken, decodeAccessToken };
