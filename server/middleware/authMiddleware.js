//декодируем токен и проверяем его валиндность
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log('Decoded token:', decoded);
        req.user = decoded;
        next();
    } catch (e) {
        console.error(e);
        return res.status(401).json({ message: "Не авторизован" });
    }
};