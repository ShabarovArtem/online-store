import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        //нижнее подчеркивание, значит переменные нельзя изменять (соглашение)
        this._isAuth = true
        this._user = {}
        //будет следить за изменениями переменных
        //при их изменении будут перерендериватся
        makeAutoObservable(this)
    }
//функции изменяющие состояния
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
//одноименные гетеры (чтобы получать переменные из состояния)
    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }
}