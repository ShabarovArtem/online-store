const uuid = require('uuid')
const ApiError = require('../error/ApiError');
const path = require("path");
const fs = require('fs');
const {Device, DeviceInfo} = require('../models/models')

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)

    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }

    async delete(req, res, next) {
        try {
            const { deviceId } = req.body;

            const device = await Device.findOne({ where: { id: deviceId } });
            if (!device) {
                return next(ApiError.badRequest('Устройство не найдено'));
            }

            const filePath = path.resolve(__dirname, '..', 'static', device.img);

            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Ошибка при удалении файла:', err);
                    } else {
                        console.log('Файл успешно удален:', device.img);
                    }
                });
            } else {
                console.log('Файл для удаления не найден:', device.img);
            }

            await device.destroy();

            return res.json({ message: 'Устройство и связанные файлы удалены' });
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Ошибка при удалении устройства'));
        }
    }

}

module.exports = new DeviceController()