// server.js
const express = require('express');

const app = express();
app.use(express.json());

app.post('/jwt/custom-jwt-userinfo', (req, res) => {
    console.log("received request")
    res.json({
        sub: "",
        firstName: "Kliendi",
        lastName: "Teenindaja",
        idCode: "EE30303039914",
        displayName: "Oleks Koleks",
        login: "EE30303039914",
        authorities: ["ROLE_ADMINISTRATOR"],
        JWTCreated: 1753726640000,
        JWTExpirationTimestamp: 1805566640000,
        iss: "localhost",
        jti: "fb7fe5f8-42c5-4dcb-8e43-1d484af473bd"
    });
});

const PORT = process.env.PORT || 9085;
app.listen(PORT, () => {
    console.log(`Mock server listening on port ${PORT}`);
});
