import { makeAutoObservable } from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [];
        this._brands = [];
        this._devices = [];
        this._selectedTypes = []; // Массив выбранных типов
        this._selectedBrands = []; // Массив выбранных брендов
        this._page = 1;
        this._totalCount = 0;
        this._limit = 3;
        makeAutoObservable(this);
    }

    setTypes(types) {
        this._types = types;
    }

    setBrands(brands) {
        this._brands = brands;
    }

    setDevices(devices) {
        this._devices = devices;
    }

    setSelectedTypes(types) {
        this._selectedTypes = types; // Устанавливаем массив выбранных типов
    }

    setSelectedBrands(brands) {
        this._selectedBrands = brands; // Устанавливаем массив выбранных брендов
    }

    setPage(page) {
        this._page = page;
    }

    setTotalCount(count) {
        this._totalCount = count;
    }

    get types() {
        return this._types;
    }

    get brands() {
        return this._brands;
    }

    get devices() {
        return this._devices;
    }

    get selectedTypes() {
        return this._selectedTypes; // Возвращаем массив выбранных типов
    }

    get selectedBrands() {
        return this._selectedBrands; // Возвращаем массив выбранных брендов
    }

    get totalCount() {
        return this._totalCount;
    }

    get page() {
        return this._page;
    }

    get limit() {
        return this._limit;
    }
}
