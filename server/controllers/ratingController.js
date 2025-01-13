const { Device, Rating } = require('../models/models');
const ApiError = require('../error/ApiError');

class RatingController {
    async addRating(req, res, next) {
        try {
            const { id } = req.user;
            const { deviceId, rate } = req.body;

            const device = await Device.findOne({ where: { id: deviceId } });
            if (!device) {
                return next(ApiError.badRequest('Устройство не найдено'));
            }

            if (rate < 1 || rate > 5) {
                return next(ApiError.badRequest('Рейтинг должен быть от 1 до 5'));
            }

            const existingRating = await Rating.findOne({
                where: { userId: id, deviceId: deviceId }
            });

            if (existingRating) {
                existingRating.rate = rate;
                await existingRating.save();

                return res.json(existingRating);
            } else {
                const rating = await Rating.create({ rate: rate, userId: id, deviceId: device.id });
                return res.json(rating);
            }
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Ошибка при добавлении рейтинга'));
        }
    }

    async deleteRating(req, res, next) {
        try {
            const { id } = req.user;
            const { deviceId } = req.body;

            const device = await Device.findOne({ where: { id: deviceId } });
            if (!device) {
                return next(ApiError.badRequest('Устройство не найдено'));
            }

            const rating = await Rating.findOne({
                where: { userId: id, deviceId: deviceId }
            });

            if (!rating) {
                return next(ApiError.badRequest('Рейтинг не найден'));
            }

            await rating.destroy();

            return res.json({ message: 'Рейтинг успешно удален' });
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Ошибка при удалении рейтинга'));
        }
    }
}

module.exports = new RatingController();



