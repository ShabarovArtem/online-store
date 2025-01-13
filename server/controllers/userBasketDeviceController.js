const { Basket, BasketDevice, Device } = require('../models/models');
const ApiError = require('../error/ApiError');

class UserBasketDeviceController {
    async addDeviceToBasket(req, res, next) {
        try {
            const { id } = req.user;
            const { deviceId } = req.body;

            const basket = await Basket.findOne({ where: { userId: id } });
            if (!basket) {
                return next(ApiError.badRequest('Корзина не найдена для данного пользователя'));
            }

            const device = await Device.findOne({ where: { id: deviceId } });
            if (!device) {
                return next(ApiError.badRequest('Устройство не найдено'));
            }

            const basketDevice = await BasketDevice.create({ basketId: basket.id, deviceId: device.id });

            return res.json(basketDevice);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Ошибка при добавлении устройства в корзину'));
        }
    }
    async getAll(req, res, next) {
        try {
            const { id } = req.user;
            const basket = await Basket.findOne({ where: { userId: id } });
            if (!basket) {
                return next(ApiError.badRequest('Корзина не найдена для данного пользователя'));
            }

            const basketDevices = await BasketDevice.findAll({
                where: { basketId: basket.id },
                include: [{ model: Device }]
            });

            return res.json(basketDevices);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Ошибка при получении устройств в корзине'));
        }
    }
}

module.exports = new UserBasketDeviceController();


