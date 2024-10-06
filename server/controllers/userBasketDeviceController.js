const { Basket, BasketDevice, Device } = require('../models/models');
const ApiError = require('../error/ApiError');

class UserBasketDeviceController {
    async addDeviceToBasket(req, res, next) {
        try {
            const { id } = req.user;
            const { deviceId } = req.body;

            // Проверяем, существует ли корзина для пользователя
            const basket = await Basket.findOne({ where: { userId: id } });
            if (!basket) {
                return next(ApiError.badRequest('Корзина не найдена для данного пользователя'));
            }

            // Ищем устройство по id
            const device = await Device.findOne({ where: { id: deviceId } });
            if (!device) {
                return next(ApiError.badRequest('Устройство не найдено'));
            }

            // Добавляем устройство в корзину пользователя
            const basketDevice = await BasketDevice.create({ basketId: basket.id, deviceId: device.id });

            return res.json(basketDevice);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Ошибка при добавлении устройства в корзину'));
        }
    }
}

module.exports = new UserBasketDeviceController();


