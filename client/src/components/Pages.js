import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Pagination} from "react-bootstrap";
import {Context} from "../index";

const Pages = observer(() => {
    const {device} = useContext(Context);

    // Вычисляем количество страниц
    const pageCount = Math.ceil(device.totalCount / device.limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    // Выводим отладочные сообщения для проверки данных
    console.log("Total count:", device.totalCount);  // Общее количество товаров
    console.log("Limit:", device.limit);              // Количество товаров на странице
    console.log("Page count:", pageCount);            // Число страниц

    return (
        <Pagination className="mt-3">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={device.page === page}
                    onClick={() => device.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});
export default Pages;