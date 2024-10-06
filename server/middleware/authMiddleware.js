//декодируем токен и проверяем его валиндность
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    //методы только post,put,get,delete стальные пропускаем
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        //// Bearer asfasnfkajsfnjk так обычно выглядит токен, сначала его тип потом он через пробел
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        // раскодируем токен
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
};