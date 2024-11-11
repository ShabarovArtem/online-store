import {$authHost} from "./index"; // Используйте $authHost для авторизованных запросов

export const addRating = async (deviceId, rate) => {
    const { data } = await $authHost.post('api/rating/add', { deviceId, rate });
    return data;
};

export const deleteRating = async (deviceId) => {
    const { data } = await $authHost.delete('api/rating', { data: { deviceId } });
    return data;
};