import axios from 'axios'; // Импортируем axios для выполнения HTTP-запросов

// Создаём экземпляр axios с базовым URL, который берётся из переменной окружения REACT_APP_HOST
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// Создаём второй экземпляр axios с таким же базовым URL для авторизованных запросов
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// Интерсептор для добавления токена авторизации в заголовок запроса
// Он получает объект конфигурации запроса и добавляет к нему заголовок авторизации,
// в котором `Bearer` токен извлекается из localStorage
/*Интерсептор работает так, что перед каждым запросом через $authHost он вызывает authInterceptor, который добавляет токен к запросу.
Это избавляет от необходимости вручную добавлять токен каждый раз, когда вы хотите выполнить авторизованный запрос.*/
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
};

// Применяем интерсептор ко всем запросам, выполненным через $authHost.
// Это означает, что каждый запрос, отправляемый с $authHost, будет содержать токен авторизации.
$authHost.interceptors.request.use(authInterceptor);

// Экспортируем созданные экземпляры для использования в других частях приложения.
export {
    $host,      // Экземпляр для обычных (неавторизованных) запросов
    $authHost   // Экземпляр для авторизованных запросов
};