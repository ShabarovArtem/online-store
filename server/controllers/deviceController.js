const uuid = require('uuid')
const ApiError = require('../error/ApiError');
const path = require("path");
const {Device, DeviceInfo} = require('../models/models')

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            //npm i express-fileupload для того чтобы получить картинку из файла
            const {img} = req.files
            //uuid.v4() генерация случайных id
            let fileName = uuid.v4() + ".jpg"
            //img.mv помещение файлов в папку static
            //path.resolve адаптирует путь к операционной системе
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            //если есть информация в таблице DeviceInfo
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
        //фильтрации исходя из бренда и типа
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
        //из параметров
        //в роутере router.get('/:id', deviceController.getOne)
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                //чтобы подгрузить массив характеристик
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }
}

module.exports = new DeviceController()