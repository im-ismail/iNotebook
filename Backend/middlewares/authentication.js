const jwt = require('jsonwebtoken');

const authentication = (req,res,next) => {
    try {
        const authToken = req.cookies.authToken || req.header('authToken');
        if (!authToken) {
            return res.status(401).send('Acces denied, authorization failed');
        }
        const verifiedToken = jwt.verify(authToken, process.env.SECRET_KEY);
        req.userId = verifiedToken.id;
        next();
    } catch (error) {
        res.status(500).send(error.message);
        console.log('auth' + error);
    };
};

module.exports = authentication;