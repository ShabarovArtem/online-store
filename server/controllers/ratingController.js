const { Device, Rating } = require('../models/models');
const ApiError = require('../error/ApiError');

class RatingController {
    // Добавление или обновление рейтинга
    async addRating(req, res, next) {
        try {
            const { id } = req.user; // ID пользователя из токена
            const { deviceId, rate } = req.body;

            // Проверяем существует ли устройство по id
            const device = await Device.findOne({ where: { id: deviceId } });
            if (!device) {
                return next(ApiError.badRequest('Устройство не найдено'));
            }

            // Проверка на допустимый рейтинг (1 - 5)
            if (rate < 1 || rate > 5) {
                return next(ApiError.badRequest('Рейтинг должен быть от 1 до 5'));
            }

            // Проверяем, ставил ли пользователь уже рейтинг данному устройству
            const existingRating = await Rating.findOne({
                where: { userId: id, deviceId: deviceId }
            });

            if (existingRating) {
                // Если рейтинг уже существует, обновляем его
                existingRating.rate = rate;
                await existingRating.save();

                return res.json(existingRating);
            } else {
                // Если рейтинга нет, создаем новый
                const rating = await Rating.create({ rate: rate, userId: id, deviceId: device.id });
                return res.json(rating);
            }
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Ошибка при добавлении рейтинга'));
        }
    }

    // Удаление рейтинга
    async deleteRating(req, res, next) {
        try {
            const { id } = req.user; // ID пользователя из токена
            const { deviceId } = req.body;

            // Проверяем существует ли устройство по id
            const device = await Device.findOne({ where: { id: deviceId } });
            if (!device) {
                return next(ApiError.badRequest('Устройство не найдено'));
            }

            // Ищем рейтинг для удаления
            const rating = await Rating.findOne({
                where: { userId: id, deviceId: deviceId }
            });

            if (!rating) {
                return next(ApiError.badRequest('Рейтинг не найден'));
            }

            // Удаляем рейтинг
            await rating.destroy();

            return res.json({ message: 'Рейтинг успешно удален' });
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Ошибка при удалении рейтинга'));
        }
    }
}

module.exports = new RatingController();



